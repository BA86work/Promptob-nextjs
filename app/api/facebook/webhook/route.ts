// pages/api/chat.ts

import { NextResponse } from "next/server";
import axios from "axios";
import { Anthropic } from "@anthropic-ai/sdk";
import { CLAUDE_SYSTEM_PROMPT } from "@/app/config/ai-config";

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ตัวแปรสำหรับจัดการ rate limiting และประวัติการสนทนา
const requestCounts = new Map<string, { count: number; timestamp: number }>();
const conversationHistory = new Map<
  string,
  Array<{ role: "user" | "assistant"; content: string }>
>();

// ฟังก์ชันสำหรับ rate limiting
function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(userId);

  if (!userRequests) {
    requestCounts.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (now - userRequests.timestamp > 60000) {
    requestCounts.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (userRequests.count >= 20) {
    return false;
  }

  userRequests.count++;
  return true;
}

// เพิ่ม interface ด้านบนของไฟล์
interface MessageAttachment {
  type: string;
  payload: {
    url?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

interface WebhookEvent {
  sender: {
    id: string;
  };
  message: {
    text: string;
    attachments?: MessageAttachment[];
  };
}

// ฟังก์ชันตรวจสอบความถูกต้องของ webhook event
function validateWebhookEvent(event: WebhookEvent): boolean {
  if (!event?.sender?.id || !event?.message?.text) {
    return false;
  }

  if (event.message.text.length > 2000) {
    return false;
  }

  if (event.message.attachments) {
    return false;
  }

  return true;
}

// ฟังก์ชันส่งข้อความไปยัง Facebook
async function sendMessageToFacebook(senderId: string, message: string) {
  const retries = 3;
  for (let i = 0; i < retries; i++) {
    try {
      await axios.post(
        `https://graph.facebook.com/v18.0/me/messages`,
        {
          recipient: { id: senderId },
          message: { text: message },
        },
        {
          headers: { Authorization: `Bearer ${PAGE_ACCESS_TOKEN}` },
          timeout: 5000,
        }
      );
      return true;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// ฟังก์ชันบันทึก error
function logError(error: Error, context: string) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
  };
  console.error(JSON.stringify(errorInfo));
}

// GET endpoint สำหรับการยืนยัน webhook
export async function GET(request: Request) {
  if (!VERIFY_TOKEN || !PAGE_ACCESS_TOKEN || !ANTHROPIC_API_KEY) {
    console.error("Missing environment variables");
    return new Response("Server Configuration Error", { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

// แยกฟังก์ชันสำหรับจัดการข้อความ
async function handleMessage(event: WebhookEvent, history: Array<{ role: "user" | "assistant"; content: string }>) {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY! });
  
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 800,
    temperature: 0.6,
    system: CLAUDE_SYSTEM_PROMPT,
    messages: history,
  });

  return message.content[0].type === "text" 
    ? message.content[0].text 
    : "ขออภัยค่ะ ไม่สามารถประมวลผลคำตอบได้";
}

// ปรับปรุง POST handler
export async function POST(request: Request) {
  try {
    if (!VERIFY_TOKEN || !PAGE_ACCESS_TOKEN || !ANTHROPIC_API_KEY) {
      throw new Error("Missing required tokens");
    }

    const body = await request.json();
    if (body.object !== "page") return NextResponse.json({ status: "ok" });

    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        if (!validateWebhookEvent(event)) continue;

        const senderId = event.sender.id;
        if (!checkRateLimit(senderId)) {
          await sendMessageToFacebook(senderId, "ขออภัยค่ะ คุณส่งข้อความถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง");
          continue;
        }

        const history = conversationHistory.get(senderId) || [];
        conversationHistory.set(senderId, history);
        
        history.push({ role: "user", content: event.message.text });

        try {
          const reply = await handleMessage(event, history);
          history.push({ role: "assistant", content: reply });
          if (history.length > 10) history.splice(0, 2);
          await sendMessageToFacebook(senderId, reply);
        } catch (error) {
          logError(error instanceof Error ? error : new Error(String(error)), "claude_processing");
          await sendMessageToFacebook(senderId, "ขออภัยค่ะ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหมอีกครั้ง");
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), "webhook_processing");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
