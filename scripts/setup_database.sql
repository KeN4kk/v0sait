-- Создание таблицы для длинных ответов
-- Запустите этот скрипт в SQLite: sqlite3 /root/KeN4kk_AI/bot_data.db < setup_database.sql

CREATE TABLE IF NOT EXISTS long_responses (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    model TEXT,
    user_id INTEGER,
    username TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по user_id
CREATE INDEX IF NOT EXISTS idx_long_responses_user_id ON long_responses(user_id);

-- Индекс для сортировки по дате
CREATE INDEX IF NOT EXISTS idx_long_responses_created_at ON long_responses(created_at);

-- Автоудаление старых записей (опционально, раскомментируйте если нужно)
-- DELETE FROM long_responses WHERE created_at < datetime('now', '-30 days');
