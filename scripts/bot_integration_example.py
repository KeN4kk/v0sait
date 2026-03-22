"""
Пример интеграции с Telegram ботом для отправки длинных ответов на сайт.
Добавьте этот код в ваш bot1.py
"""

import aiohttp
import os

# Конфигурация
SITE_URL = "https://ken4kk-app.ru"
API_SECRET = os.getenv("BOT_API_SECRET", "your-secret-key-here")  # Установите в .env
MAX_MESSAGE_LENGTH = 4000  # Максимальная длина сообщения в Telegram


async def save_long_response(content: str, model: str = "AI", user_id: int = None, username: str = None) -> str:
    """
    Сохраняет длинный ответ на сайт и возвращает URL.
    
    Args:
        content: Текст ответа
        model: Название AI модели
        user_id: ID пользователя Telegram
        username: Username пользователя
        
    Returns:
        URL страницы с ответом или None при ошибке
    """
    async with aiohttp.ClientSession() as session:
        try:
            async with session.post(
                f"{SITE_URL}/api/response/save",
                json={
                    "content": content,
                    "model": model,
                    "user_id": user_id,
                    "username": username,
                },
                headers={
                    "Authorization": f"Bearer {API_SECRET}",
                    "Content-Type": "application/json",
                },
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get("url")
                else:
                    print(f"Error saving response: {response.status}")
                    return None
        except Exception as e:
            print(f"Error connecting to site: {e}")
            return None


async def send_ai_response(message, ai_response: str, model: str = "AI"):
    """
    Отправляет ответ AI пользователю. Если ответ слишком длинный,
    сохраняет на сайт и отправляет ссылку.
    
    Args:
        message: Объект сообщения aiogram
        ai_response: Текст ответа от AI
        model: Название используемой модели
    """
    user = message.from_user
    
    if len(ai_response) <= MAX_MESSAGE_LENGTH:
        # Ответ короткий - отправляем напрямую
        await message.reply(ai_response, parse_mode="Markdown")
    else:
        # Ответ слишком длинный - сохраняем на сайт
        url = await save_long_response(
            content=ai_response,
            model=model,
            user_id=user.id,
            username=user.username,
        )
        
        if url:
            # Отправляем ссылку на полный ответ
            preview_text = ai_response[:500] + "..." if len(ai_response) > 500 else ai_response
            
            reply_text = f"""
{preview_text}

━━━━━━━━━━━━━━━━━━━━━━

📄 *Ответ слишком длинный для Telegram*

🔗 [Читать полностью на сайте]({url})

_Там вы сможете скопировать текст и скачать его_
"""
            await message.reply(reply_text, parse_mode="Markdown", disable_web_page_preview=True)
        else:
            # Если не удалось сохранить - разбиваем на части
            chunks = [ai_response[i:i+MAX_MESSAGE_LENGTH] for i in range(0, len(ai_response), MAX_MESSAGE_LENGTH)]
            for i, chunk in enumerate(chunks):
                prefix = f"📄 Часть {i+1}/{len(chunks)}\n\n" if len(chunks) > 1 else ""
                await message.reply(prefix + chunk)


# ============================================
# Пример использования в вашем боте:
# ============================================

"""
# В вашем bot1.py:

from bot_integration import send_ai_response

@dp.message_handler()
async def handle_message(message: types.Message):
    # Получаем ответ от AI
    ai_response = await get_ai_response(message.text)
    
    # Отправляем с автоматической обработкой длинных ответов
    await send_ai_response(message, ai_response, model="GPT-4")
"""
