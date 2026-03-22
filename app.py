import os
import sqlite3
import hmac
import hashlib
import jwt
import json
import time
import tempfile
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

# Импорт из бота
import sys
sys.path.insert(0, '/root/KeN4kk_AI/long_response_site')
from bot1 import (
    get_balance, update_balance, register_or_update_user,
    get_text_model, set_text_model, get_language, set_language,
    get_tts_voice, set_tts_voice, get_internet_search_enabled, set_internet_search_enabled,
    get_mode, set_mode, ask_aitunnel, generate_aitunnel_image, generate_video, generate_tts_genapi,
    get_history, clear_history, log_query, get_free_quota_left,
    get_media_base_price, get_profit_multiplier, PRICES, DEFAULT_IMAGE_SIZE, IMAGE_SIZES,
    VIDEO_DURATIONS, AVAILABLE_MODELS, MODEL_PRICES, AVAILABLE_TTS_VOICES, DEFAULT_TTS_VOICE,
    get_text, LANGUAGES, cursor, conn, db_lock, is_admin, ADMIN_IDS,
    get_referral_count, generate_referral_link, get_referrals_list,
    get_voice_enabled, set_voice_enabled, get_free_tts_quota_left, use_free_tts_quota,
    TOKEN as TELEGRAM_TOKEN
)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', 'supersecretkey123')
CORS(app, origins=["http://localhost:3000", "https://ken4kk-app.ru", "http://ken4kk-app.ru"])

# JWT
JWT_SECRET = os.environ.get('JWT_SECRET', 'jwtsecret123')
JWT_ALGORITHM = 'HS256'

def create_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get('user_id')
    except:
        return None

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'Missing token'}), 401
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({'error': 'Invalid token format'}), 401
        user_id = decode_token(parts[1])
        if not user_id:
            return jsonify({'error': 'Invalid or expired token'}), 401
        return f(user_id, *args, **kwargs)
    return decorated

# ---------- Эндпоинт авторизации ----------
@app.route('/api/auth/telegram', methods=['POST'])
def auth_telegram():
    data = request.json
    # Проверка hash (как в боте)
    token = TELEGRAM_TOKEN.encode('utf-8')
    data_check_list = []
    for key, value in data.items():
        if key != 'hash' and value is not None:
            data_check_list.append(f"{key}={value}")
    data_check_list.sort()
    data_check_string = "\n".join(data_check_list)
    secret_key = hmac.new(token, b"WebAppData", hashlib.sha256).digest()
    computed_hash = hmac.new(secret_key, data_check_string.encode('utf-8'), hashlib.sha256).hexdigest()
    if computed_hash != data.get('hash'):
        return jsonify({'error': 'Invalid hash'}), 400

    # Регистрируем пользователя (создаём фиктивный message)
    class FakeMessage:
        from_user = type('obj', (object,), {
            'id': data['id'],
            'username': data.get('username'),
            'first_name': data.get('first_name')
        })()
    register_or_update_user(FakeMessage)

    # Выдаём JWT
    jwt_token = create_token(data['id'])
    return jsonify({'access_token': jwt_token, 'user_id': data['id']})

# ---------- Профиль пользователя ----------
@app.route('/api/user/me', methods=['GET'])
@login_required
def get_user_profile(user_id):
    with db_lock:
        cursor.execute("SELECT username, first_name, balance, language, text_model, tts_voice, voice_enabled, internet_search_enabled, mode, is_admin FROM users WHERE user_id=?", (user_id,))
        row = cursor.fetchone()
    if not row:
        return jsonify({'error': 'User not found'}), 404
    username, first_name, balance, lang, text_model, tts_voice, voice_enabled, internet_search_enabled, mode, is_admin = row
    return jsonify({
        'user_id': user_id,
        'username': username,
        'first_name': first_name,
        'balance': balance / 100,
        'free_quota_left': get_free_quota_left(user_id),
        'free_tts_left': get_free_tts_quota_left(user_id),
        'language': lang,
        'text_model': text_model,
        'tts_voice': tts_voice,
        'voice_enabled': bool(voice_enabled),
        'internet_search_enabled': bool(internet_search_enabled),
        'mode': mode,
        'is_admin': bool(is_admin)
    })

# ---------- Чат ----------
@app.route('/api/chat', methods=['POST'])
@login_required
def chat(user_id):
    data = request.json
    text = data.get('text', '')
    image = data.get('image')  # base64 или URL
    video = data.get('video')
    # Если нужно обработать медиа – пока опустим
    answer = ask_aitunnel(user_id, text, None, None)
    if not answer:
        answer = get_text(user_id, 'empty_response')
    log_query(user_id, text, answer)
    return jsonify({'response': answer})

# ---------- История ----------
@app.route('/api/history', methods=['GET'])
@login_required
def history(user_id):
    rows = get_history(user_id)
    items = [{'role': role, 'content': content} for role, content in rows]
    return jsonify(items)

@app.route('/api/history/clear', methods=['POST'])
@login_required
def clear_history_endpoint(user_id):
    clear_history(user_id)
    return jsonify({'status': 'ok'})

# ---------- Генерация изображения ----------
@app.route('/api/generate-image', methods=['POST'])
@login_required
def generate_image(user_id):
    data = request.json
    prompt = data.get('prompt')
    size = data.get('size', DEFAULT_IMAGE_SIZE)
    if not prompt:
        return jsonify({'error': 'No prompt'}), 400
    price = int(get_media_base_price('generate') * get_profit_multiplier() * 100)
    if get_balance(user_id) < price:
        return jsonify({'error': get_text(user_id, 'insufficient_funds', balance=get_balance(user_id)/100, price=price/100)}), 402
    result = generate_aitunnel_image(prompt, size)
    if not result:
        return jsonify({'error': get_text(user_id, 'image_failed')}), 500
    filename = f"img_{user_id}_{int(time.time())}.png"
    filepath = os.path.join('/tmp', filename)
    with open(filepath, 'wb') as f:
        f.write(result)
    update_balance(user_id, -price, reason=f"Генерация изображения: {prompt[:50]}")
    return jsonify({'url': f'/tmp/{filename}'})

# ---------- Генерация видео ----------
@app.route('/api/generate-video', methods=['POST'])
@login_required
def generate_video_endpoint(user_id):
    data = request.json
    prompt = data.get('prompt')
    duration = data.get('duration', 6)
    image_url = data.get('image_url')
    if not prompt:
        return jsonify({'error': 'No prompt'}), 400
    if duration not in VIDEO_DURATIONS:
        return jsonify({'error': 'Invalid duration'}), 400
    price = int(duration * get_media_base_price('video_per_second') * get_profit_multiplier() * 100)
    if get_balance(user_id) < price:
        return jsonify({'error': get_text(user_id, 'insufficient_funds', balance=get_balance(user_id)/100, price=price/100)}), 402
    image_bytes = None
    if image_url:
        try:
            r = requests.get(image_url, timeout=10)
            if r.status_code == 200:
                image_bytes = r.content
        except:
            pass
    result = generate_video(prompt, duration, image_bytes)
    if not result:
        return jsonify({'error': get_text(user_id, 'video_failed')}), 500
    filename = f"vid_{user_id}_{int(time.time())}.mp4"
    filepath = os.path.join('/tmp', filename)
    with open(filepath, 'wb') as f:
        f.write(result)
    update_balance(user_id, -price, reason=f"Генерация видео: {prompt[:50]}")
    return jsonify({'url': f'/tmp/{filename}'})

# ---------- TTS ----------
@app.route('/api/tts', methods=['POST'])
@login_required
def tts_endpoint(user_id):
    data = request.json
    text = data.get('text')
    voice = data.get('voice', DEFAULT_TTS_VOICE)
    if not text:
        return jsonify({'error': 'No text'}), 400
    free_used = False
    if get_free_tts_quota_left(user_id) > 0:
        use_free_tts_quota(user_id)
        price = 0
        free_used = True
    else:
        base_price = get_media_base_price('tts_per_1000_chars')
        char_count = len(text)
        price = int((char_count / 1000) * base_price * get_profit_multiplier() * 100)
        price = max(price, 1)
        if get_balance(user_id) < price:
            return jsonify({'error': get_text(user_id, 'insufficient_funds', balance=get_balance(user_id)/100, price=price/100)}), 402
    audio = generate_tts_genapi(text, voice)
    if not audio:
        return jsonify({'error': get_text(user_id, 'tts_failed')}), 500
    filename = f"tts_{user_id}_{int(time.time())}.mp3"
    filepath = os.path.join('/tmp', filename)
    with open(filepath, 'wb') as f:
        f.write(audio)
    if not free_used:
        update_balance(user_id, -price, reason=f"TTS: {text[:50]}")
    return jsonify({'url': f'/tmp/{filename}'})

# ---------- Настройки ----------
@app.route('/api/settings/language', methods=['POST'])
@login_required
def set_language_endpoint(user_id):
    lang = request.json.get('lang')
    if lang not in LANGUAGES:
        return jsonify({'error': 'Invalid language'}), 400
    set_language(user_id, lang)
    return jsonify({'status': 'ok'})

@app.route('/api/settings/model', methods=['POST'])
@login_required
def set_model_endpoint(user_id):
    model_id = request.json.get('model')
    if model_id not in MODEL_PRICES:
        return jsonify({'error': 'Invalid model'}), 400
    set_text_model(user_id, model_id)
    return jsonify({'status': 'ok'})

@app.route('/api/settings/internet_search', methods=['POST'])
@login_required
def set_internet_search_endpoint(user_id):
    enabled = request.json.get('enabled', False)
    set_internet_search_enabled(user_id, enabled)
    return jsonify({'status': 'ok'})

@app.route('/api/settings/voice_enabled', methods=['POST'])
@login_required
def set_voice_enabled_endpoint(user_id):
    enabled = request.json.get('enabled', False)
    set_voice_enabled(user_id, enabled)
    return jsonify({'status': 'ok'})

@app.route('/api/settings/tts_voice', methods=['POST'])
@login_required
def set_tts_voice_endpoint(user_id):
    voice = request.json.get('voice')
    if voice not in AVAILABLE_TTS_VOICES:
        return jsonify({'error': 'Invalid voice'}), 400
    set_tts_voice(user_id, voice)
    return jsonify({'status': 'ok'})

@app.route('/api/settings/mode', methods=['POST'])
@login_required
def set_mode_endpoint(user_id):
    mode = request.json.get('mode')
    if mode not in ['normal', 'adult']:
        return jsonify({'error': 'Invalid mode'}), 400
    set_mode(user_id, mode)
    return jsonify({'status': 'ok'})

# ---------- Реферальная система ----------
@app.route('/api/referral', methods=['GET'])
@login_required
def referral_info(user_id):
    total_invited = get_referral_count(user_id, 'pending') + get_referral_count(user_id, 'approved') + get_referral_count(user_id, 'rejected')
    pending = get_referral_count(user_id, 'pending')
    remaining = max(0, 5 - pending)
    referral_link = generate_referral_link(user_id)
    return jsonify({
        'total_invited': total_invited,
        'pending': pending,
        'remaining_to_gift': remaining,
        'referral_link': referral_link
    })

@app.route('/api/referral/request', methods=['POST'])
@login_required
def request_referral_gift(user_id):
    pending = get_referral_count(user_id, 'pending')
    if pending == 0:
        return jsonify({'error': 'No new referrals'}), 400
    referrals = get_referrals_list(user_id, 'pending')
    if not referrals:
        return jsonify({'error': 'No referrals data'}), 400
    # Отправляем уведомление админам (как в боте)
    from bot1 import bot, types
    admin_msg = f"📨 <b>Заявка на подарок от пользователя</b>\n\n"
    admin_msg += f"👤 Пользователь: @{bot.get_chat(user_id).username or 'нет'} (ID: {user_id})\n"
    admin_msg += f"📊 Количество приглашённых: {len(referrals)}\n\n"
    admin_msg += "<b>Список приглашённых:</b>\n"
    for ref_id, username, first_name, joined in referrals:
        admin_msg += f"• ID: <code>{ref_id}</code> @{username or 'нет'} {first_name or ''} (с {joined[:10]})\n"
    admin_msg += f"\nВыберите действие:"
    markup = types.InlineKeyboardMarkup(row_width=2)
    markup.add(
        types.InlineKeyboardButton("✅ Одобрить", callback_data=f"approve_gift_{user_id}"),
        types.InlineKeyboardButton("❌ Отклонить", callback_data=f"reject_gift_{user_id}")
    )
    for admin_id in ADMIN_IDS:
        try:
            bot.send_message(admin_id, admin_msg, parse_mode="HTML", reply_markup=markup)
        except:
            pass
    return jsonify({'status': 'ok'})

# ---------- Статика для временных файлов ----------
@app.route('/tmp/<filename>')
def serve_temp(filename):
    filepath = os.path.join('/tmp', filename)
    if not os.path.exists(filepath):
        return "Not found", 404
    return send_file(filepath)

# ---------- Запуск ----------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
