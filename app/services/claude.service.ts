import { Anthropic } from "@anthropic-ai/sdk";
import { DatabaseService } from "./database.service";

export class ClaudeService {
  private client: Anthropic;
  private db: DatabaseService;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "",
    });
    this.db = new DatabaseService();
  }

  async getResponse(message: string, history?: Array<{ role: "user" | "assistant"; content: string }>) {
    // ดึง prompt template จาก database
    const promptSetting = await this.db.getSetting("prompt_template");
    const systemPrompt = promptSetting?.value || "ตอบกลับเป็นภาษาไทยเท่านั้น";

    const response = await this.client.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1100,
      temperature: 0.6,
      system: systemPrompt,
      messages: [
        ...(history || []),
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.content[0].type === "text" 
      ? response.content[0].text 
      : "ไม่สามารถประมวลผลข้อความได้";
  }
} 