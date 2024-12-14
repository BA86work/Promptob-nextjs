// สร้าง class สำหรับจัดการประวัติการสนทนา
export class ConversationHistory {
  private static instance: ConversationHistory;
  private history: Map<string, Array<{ role: string; content: string }>>;

  private constructor() {
    this.history = new Map();
  }

  public static getInstance(): ConversationHistory {
    if (!ConversationHistory.instance) {
      ConversationHistory.instance = new ConversationHistory();
    }
    return ConversationHistory.instance;
  }

  public getHistory(userId: string): Array<{ role: string; content: string }> {
    if (!this.history.has(userId)) {
      this.history.set(userId, []);
    }
    return this.history.get(userId)!;
  }

  public addMessage(userId: string, role: string, content: string) {
    const userHistory = this.getHistory(userId);
    userHistory.push({ role, content });
    
    // จำกัดจำนวนข้อความ
    if (userHistory.length > 10) {
      userHistory.splice(0, 2);
    }
  }
} 