import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DatabaseService {
  // บันทึกประวัติแชท
  async saveChatHistory(userId: string, message: string, response: string) {
    // สร้างหรืออัพเดทข้อมูลผู้ใช้
    const user = await prisma.user.upsert({
      where: { facebookId: userId },
      update: { lastInteractionAt: new Date() },
      create: { facebookId: userId }
    });

    // บันทึกประวัติการสนทนา
    return prisma.chatHistory.create({
      data: {
        userId: user.facebookId,
        message,
        response
      }
    });
  }

  // ดึงประวัติการสนทนา
  async getChatHistory(userId: string, limit = 10) {
    return prisma.chatHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  // ดึงการตั้งค่าทั้งหมด
  async getAllSettings() {
    return prisma.setting.findMany();
  }

  // ดึงการตั้งค่าตาม key
  async getSetting(key: string) {
    return prisma.setting.findUnique({
      where: { key }
    });
  }

  // สร้างหรืออัพเดทการตั้งค่า
  async upsertSetting(key: string, value: string, description?: string) {
    return prisma.setting.upsert({
      where: { key },
      update: { 
        value,
        description: description || undefined
      },
      create: {
        key,
        value,
        description
      }
    });
  }

  // ลบการตั้งค่า
  async deleteSetting(key: string) {
    return prisma.setting.delete({
      where: { key }
    });
  }
} 