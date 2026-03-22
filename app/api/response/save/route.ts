import { NextRequest, NextResponse } from "next/server"
import Database from "better-sqlite3"
import { randomUUID } from "crypto"

// Path to the SQLite database
const DB_PATH = process.env.DATABASE_PATH || "/root/KeN4kk_AI/bot_data.db"

// Secret key for API authentication
const API_SECRET = process.env.BOT_API_SECRET || "your-secret-key-here"

export async function POST(request: NextRequest) {
  try {
    // Verify API secret
    const authHeader = request.headers.get("Authorization")
    if (authHeader !== `Bearer ${API_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content, model, user_id, username } = body

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    // Generate unique ID
    const id = randomUUID().split("-")[0] // Short ID like "a1b2c3d4"

    // Connect to SQLite database
    const db = new Database(DB_PATH)

    // Create table if not exists
    db.exec(`
      CREATE TABLE IF NOT EXISTS long_responses (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        model TEXT,
        user_id INTEGER,
        username TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert the response
    const stmt = db.prepare(`
      INSERT INTO long_responses (id, content, model, user_id, username)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(id, content, model || "AI", user_id || null, username || null)

    db.close()

    // Return the URL to the response
    const baseUrl = process.env.SITE_URL || "https://ken4kk-app.ru"
    const responseUrl = `${baseUrl}/response/${id}`

    return NextResponse.json({
      success: true,
      id,
      url: responseUrl,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
