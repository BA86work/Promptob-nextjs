import { NextResponse } from "next/server";
import { ClaudeService } from "@/app/services/claude.service";
import { DatabaseService } from "@/app/services/database.service";

const verifyToken = process.env.VERIFY_TOKEN;
const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ฟังก์ชันสำหรับ log error
function logError(error: Error, context: string) {
  console.error(
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        context,
        message: error.message,
        stack: error.stack,
      },
      null,
      2
    )
  );
}

export async function GET(request: Request) {
  try {
    if (!verifyToken || !pageAccessToken || !ANTHROPIC_API_KEY) {
      throw new Error("Missing required environment variables");
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("Webhook verification:", { mode, token, challenge });

    if (mode === "subscribe" && token === verifyToken) {
      return new NextResponse(challenge, { status: 200 });
    }
    return new NextResponse("Forbidden", { status: 403 });
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error(String(error)),
      "webhook_verification"
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function sendMessageToFacebook(recipientId: string, text: string) {
  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_type: "RESPONSE",
        recipient: { id: recipientId },
        message: { text },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Facebook API Error: ${JSON.stringify(errorData)}`);
    }

    return response.json();
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error(String(error)),
      "facebook_send_message"
    );
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyToken || !pageAccessToken || !ANTHROPIC_API_KEY) {
      throw new Error("Missing required environment variables");
    }

    const body = await request.json();
    console.log("Received webhook event:", JSON.stringify(body, null, 2));

    if (body.object !== "page") {
      return new NextResponse("Not Found", { status: 404 });
    }

    const db = new DatabaseService();
    const claudeService = new ClaudeService();

    for (const entry of body.entry) {
      if (!entry.messaging || !Array.isArray(entry.messaging)) {
        console.warn("Invalid entry format:", entry);
        continue;
      }

      for (const event of entry.messaging) {
        // ตรวจสอบว่าเป็น event ที่มีข้อความหรือไม่
        if (event.message?.text) {
          const senderId = event.sender.id;
          const messageText = event.message.text;

          try {
            console.log("Processing message:", { senderId, messageText });

            const responseText = await claudeService.getResponse(messageText);
            console.log("Claude response:", responseText);

            await db.saveChatHistory(senderId, messageText, responseText);
            await sendMessageToFacebook(senderId, responseText);
          } catch (error) {
            logError(
              error instanceof Error ? error : new Error(String(error)),
              "message_processing"
            );

            try {
              await sendMessageToFacebook(
                senderId,
                "ขออภัยค่ะ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง"
              );
            } catch (sendError) {
              logError(
                sendError instanceof Error
                  ? sendError
                  : new Error(String(sendError)),
                "error_notification_send"
              );
            }
          }
        }
        // จัดการ delivery event
        else if (event.delivery) {
          console.log("Message delivered:", event.delivery);
        }
        // จัดการ read event
        else if (event.read) {
          console.log("Message read:", event.read);
        }
        // event ประเภทอื่นๆ
        else {
          console.log("Received other event type:", event);
        }
      }
    }

    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    logError(
      error instanceof Error ? error : new Error(String(error)),
      "webhook_processing"
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
