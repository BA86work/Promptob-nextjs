// app/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  // Placeholder settings
  const [settings, setSettings] = useState({
    // General Settings
    botName: "AI Assistant",
    language: "th",
    timezone: "Asia/Bangkok",

    // Response Settings
    responseTime: "instant",
    useAI: true,
    fallbackMessage: "ขออภัย ฉันไม่เข้าใจคำถามของคุณ กรุณาถามใหม่อีกครั้ง",

    // Platform Settings
    facebook: {
      enabled: true,
      pageId: "",
      accessToken: "",
    },
    line: {
      enabled: true,
      channelId: "",
      channelSecret: "",
    },
    instagram: {
      enabled: true,
      accountId: "",
      accessToken: "",
    },

    // Notification Settings
    emailNotifications: true,
    emailAddress: "",
    dailyReport: true,
    weeklyReport: true,
  });

  const handleSave = async () => {
    setLoading(true);
    // TODO: Implement settings save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <span className="font-semibold text-lg sm:text-xl">Settings</span>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* General Settings */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6">
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Bot Name
                  </label>
                  <Input
                    value={settings.botName}
                    onChange={(e) =>
                      setSettings({ ...settings, botName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) =>
                      setSettings({ ...settings, language: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="th">Thai</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Response Settings */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6">
            <h2 className="text-lg font-semibold mb-4">Response Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Use AI</p>
                  <p className="text-sm text-gray-500">
                    Enable AI-powered responses
                  </p>
                </div>
                <Switch
                  checked={settings.useAI}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, useAI: checked })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Fallback Message
                </label>
                <Textarea
                  value={settings.fallbackMessage}
                  onChange={(e) =>
                    setSettings({ ...settings, fallbackMessage: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6">
            <h2 className="text-lg font-semibold mb-4">Platform Settings</h2>
            <div className="space-y-6">
              {/* Facebook */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Facebook</p>
                    <p className="text-sm text-gray-500">
                      Messenger integration settings
                    </p>
                  </div>
                  <Switch
                    checked={settings.facebook.enabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        facebook: { ...settings.facebook, enabled: checked },
                      })
                    }
                  />
                </div>
                {settings.facebook.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Page ID
                      </label>
                      <Input
                        value={settings.facebook.pageId}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            facebook: {
                              ...settings.facebook,
                              pageId: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Access Token
                      </label>
                      <Input
                        type="password"
                        value={settings.facebook.accessToken}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            facebook: {
                              ...settings.facebook,
                              accessToken: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* LINE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">LINE</p>
                    <p className="text-sm text-gray-500">
                      Official Account settings
                    </p>
                  </div>
                  <Switch
                    checked={settings.line.enabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        line: { ...settings.line, enabled: checked },
                      })
                    }
                  />
                </div>
                {settings.line.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Channel ID
                      </label>
                      <Input
                        value={settings.line.channelId}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            line: {
                              ...settings.line,
                              channelId: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Channel Secret
                      </label>
                      <Input
                        type="password"
                        value={settings.line.channelSecret}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            line: {
                              ...settings.line,
                              channelSecret: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Instagram */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Instagram</p>
                    <p className="text-sm text-gray-500">
                      Direct Message settings
                    </p>
                  </div>
                  <Switch
                    checked={settings.instagram.enabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        instagram: { ...settings.instagram, enabled: checked },
                      })
                    }
                  />
                </div>
                {settings.instagram.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Account ID
                      </label>
                      <Input
                        value={settings.instagram.accountId}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            instagram: {
                              ...settings.instagram,
                              accountId: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Access Token
                      </label>
                      <Input
                        type="password"
                        value={settings.instagram.accessToken}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            instagram: {
                              ...settings.instagram,
                              accessToken: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              {settings.emailNotifications && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={settings.emailAddress}
                      onChange={(e) =>
                        setSettings({ ...settings, emailAddress: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Daily Report
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive daily activity summary
                      </p>
                    </div>
                    <Switch
                      checked={settings.dailyReport}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, dailyReport: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Weekly Report
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive weekly analytics report
                      </p>
                    </div>
                    <Switch
                      checked={settings.weeklyReport}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, weeklyReport: checked })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}