// pages/api/claude.js
import { ClaudeService } from "@/app/services/claude.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, history } = body;

    if (!question) {
      return NextResponse.json({ error: "คำถามไม่ถูกต้อง" }, { status: 400 });
    }

    const claudeService = new ClaudeService();
    const answer = await claudeService.getResponse(question, history);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการเรียก API" },
      { status: 500 }
    );
  }
}
