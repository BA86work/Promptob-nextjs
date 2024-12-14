'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CopyrightNotice = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าหลัก
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Title Section */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">ข้อกำหนดการใช้งานซอฟต์แวร์</h1>
            <p className="mt-2 text-gray-600">
              โปรดอ่านข้อกำหนดต่อไปนี้อย่างละเอียดก่อนการใช้งาน
            </p>
          </div>

          {/* Content Sections */}
          <div className="px-8 py-6 space-y-8">
            {/* Copyright Notice */}
            <div>
              <div className="flex items-center space-x-2 text-gray-900">
                <span className="text-xl">©</span>
                <h2 className="text-xl font-semibold">ลิขสิทธิ์</h2>
              </div>
              <div className="mt-3 pl-7">
                <p className="text-gray-600">
                  © 2024 <a href="https://firstchanom.com" className="text-blue-600 hover:text-blue-800 font-medium">firstchanom</a>
                  <span className="block mt-2">
                    สงวนลิขสิทธิ์ตามกฎหมาย ห้ามทำซ้ำหรือเผยแพร่ก่อนได้รับอนุญาต
                  </span>
                </p>
              </div>
            </div>

            {/* Terms */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">เงื่อนไขการใช้งาน</h2>
              <div className="space-y-4 pl-4">
                <div className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-3">1.</span>
                  <p className="text-gray-600">
                    ห้ามทำซ้ำ ดัดแปลง หรือเผยแพร่ซอฟต์แวร์นี้ไม่ว่าส่วนใดส่วนหนึ่ง
                    โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-3">2.</span>
                  <p className="text-gray-600">
                    ห้ามจำหน่าย ให้เช่า หรือทำการค้าในเชิงพาณิชย์จากซอฟต์แวร์นี้
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-3">3.</span>
                  <p className="text-gray-600">
                    ห้ามนำซอฟต์แวร์ไปใช้เพื่อวัตถุประสงค์ที่ผิดกฎหมาย
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-semibold mr-3">4.</span>
                  <p className="text-gray-600">
                    การใช้งานซอฟต์แวร์นี้ถือว่าผู้ใช้ได้ยอมรับเงื่อนไขข้างต้นแล้ว
                  </p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">คำเตือน</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    การละเมิดข้อกำหนดเหล่านี้ถือเป็นการละเมิดลิขสิทธิ์ ซึ่งมีความผิดตามกฎหมาย
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-4 bg-gray-50">
            <p className="text-sm text-center text-gray-500">
              สงวนลิขสิทธิ์ © 2024 firstchanom. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightNotice;