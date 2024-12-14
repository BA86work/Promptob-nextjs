import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_SETTINGS = [
  {
    key: "prompt_template",
    value: "คุณเป็น AI ผู้ช่วยที่เป็นมิตร ตอบคำถามด้วยภาษาไทยที่สุภาพและเป็นธรรมชาติ ให้ข้อมูลที่ถูกต้องและเป็นประโยชน์",
    description: "Template สำหรับ prompt ที่ส่งให้ AI"
  },
  {
    key: "max_history",
    value: "10",
    description: "จำนวนประวัติการสนทนาที่เก็บไว้ต่อผู้ใช้"
  },
  {
    key: "rate_limit",
    value: "20",
    description: "จำนวนข้อความสูงสุดที่อนุญาตให้ส่งต่อนาที"
  }
];

// ฟังก์ชันสำหรับตรวจสอบและสร้างการตั้งค่าเริ่มต้น
async function initializeDefaultSettings() {
  for (const setting of DEFAULT_SETTINGS) {
    const existingSetting = await prisma.setting.findUnique({
      where: { key: setting.key }
    });

    if (!existingSetting) {
      await prisma.setting.create({
        data: setting
      });
    }
  }
}

export async function GET() {
  try {
    // ตรวจสอบและสร้างการตั้งค่าเริ่มต้นถ้ายังไม่มี
    await initializeDefaultSettings();
    
    const settings = await prisma.setting.findMany({
      orderBy: {
        key: 'asc',
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value, description } = body;

    const updatedSetting = await prisma.setting.upsert({
      where: { key },
      update: {
        value,
        description,
        updatedAt: new Date(),
      },
      create: {
        key,
        value,
        description,
      },
    });

    return NextResponse.json(updatedSetting);
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    );
  }
} 