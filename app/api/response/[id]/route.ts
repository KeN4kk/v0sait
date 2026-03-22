import { NextRequest, NextResponse } from "next/server"
import Database from "better-sqlite3"
import path from "path"

// Path to the SQLite database
const DB_PATH = process.env.DATABASE_PATH || "/root/KeN4kk_AI/bot_data.db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Connect to SQLite database
    const db = new Database(DB_PATH, { readonly: true })
    
    // Query the response by ID
    const response = db.prepare(`
      SELECT id, content, model, created_at, user_id, username 
      FROM long_responses 
      WHERE id = ?
    `).get(id) as {
      id: string
      content: string
      model: string
      created_at: string
      user_id: number
      username: string
    } | undefined
    
    db.close()
    
    if (!response) {
      return NextResponse.json(
        { error: "Response not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
