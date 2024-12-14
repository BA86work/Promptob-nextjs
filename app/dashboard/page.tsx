"use client";

import { Button } from "@/components/ui/button";
import {
  Settings,
  Bot,
  Facebook,
  Instagram,
  Users,
  MessageSquare,
  TrendingUp,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"platforms" | "analytics" | "logs">("platforms");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const renderPlatforms = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Facebook Integration */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Facebook className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Facebook</h3>
              <p className="text-sm text-gray-600">Connect Messenger</p>
            </div>
          </div>
          <Button className="w-full mt-4">Connect Facebook</Button>
        </div>

        {/* LINE Integration */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Image src="/line-logo.png" alt="LINE" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">LINE</h3>
              <p className="text-sm text-gray-600">Connect Official Account</p>
            </div>
          </div>
          <Button className="w-full mt-4">Connect LINE</Button>
        </div>

        {/* Instagram Integration */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
              <Instagram className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Instagram</h3>
              <p className="text-sm text-gray-600">Connect Direct Messages</p>
            </div>
          </div>
          <Button className="w-full mt-4">Connect Instagram</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-lg font-semibold">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Messages Today</p>
              <p className="text-lg font-semibold">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Bot className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">AI Responses</p>
              <p className="text-lg font-semibold">567</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-lg font-semibold">98%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Marketing Keywords */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6">
        <h3 className="text-lg font-semibold mb-4">Top Marketing Keywords</h3>
        <div className="space-y-3">
          {[
            { keyword: "หญ้าเทียม", count: 45, percentage: 15 },
            { keyword: "ราคา", count: 38, percentage: 12 },
            { keyword: "ติดตั้ง", count: 30, percentage: 10 },
          ].map((item) => (
            <div key={item.keyword} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.keyword}</span>
                  <span className="text-sm text-gray-600">{item.count} mentions</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200/80 p-6">
          <h3 className="text-lg font-semibold mb-4">Response Times</h3>
          <div className="aspect-square bg-gray-50 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200/80 p-6">
          <h3 className="text-lg font-semibold mb-4">User Satisfaction</h3>
          <div className="aspect-square bg-gray-50 rounded-lg" />
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      {/* Chat Logs */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
        <div className="space-y-4">
          {[
            {
              platform: "Facebook",
              user: "John Doe",
              message: "สนใจหญ้าเทียมค่ะ",
              time: "5 mins ago",
              icon: <Facebook className="h-4 w-4 text-blue-600" />,
            },
            {
              platform: "LINE",
              user: "Jane Smith",
              message: "ราคาเท่าไหร่ครับ",
              time: "10 mins ago",
              icon: <Image src="/line-logo.png" alt="LINE" width={16} height={16} />,
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                {log.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">{log.user}</p>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{log.message}</p>
                <p className="text-xs text-gray-500 mt-1">via {log.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-6">
        <h3 className="text-lg font-semibold mb-4">System Logs</h3>
        <div className="space-y-3">
          {[
            {
              event: "Platform Connected",
              details: "Facebook Messenger integration activated",
              time: "1 hour ago",
            },
            {
              event: "Settings Updated",
              details: "Chat response templates modified",
              time: "2 hours ago",
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">{log.event}</p>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
                <p className="text-sm text-gray-600">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="font-semibold text-lg sm:text-xl">AI Chatbot</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 flex space-x-4 border-t">
          <button
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "platforms"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("platforms")}
          >
            Platforms
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "analytics"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "logs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("logs")}
          >
            Logs
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {activeTab === "platforms" && renderPlatforms()}
        {activeTab === "analytics" && renderAnalytics()}
        {activeTab === "logs" && renderLogs()}
      </main>
    </div>
  );
} 