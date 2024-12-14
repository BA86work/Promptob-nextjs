import { NextResponse } from 'next/server';

let currentPrompt = 'ตอบกลับเป็นภาษาไทยเท่านั้น';

export async function GET() {
  return NextResponse.json({ prompt: currentPrompt });
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    currentPrompt = prompt;
    return NextResponse.json({ success: true, prompt: currentPrompt });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
} 