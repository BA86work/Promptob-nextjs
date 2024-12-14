"use client";

import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Settings,
  Bot,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="font-semibold text-lg sm:text-xl">AI Chatbot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Customer Service with AI
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            Automate customer interactions across multiple platforms with our intelligent chatbot solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multi-Platform Support</h3>
                <p className="text-gray-600">
                  Seamlessly integrate with Facebook, LINE, and Instagram
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <Bot className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analytics</h3>
                <p className="text-gray-600">
                  Get insights from customer conversations and improve marketing
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <Settings className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
                <p className="text-gray-600">
                  Quick setup and seamless integration with your existing systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">24/7 Customer Support</h3>
                <p className="text-gray-600">
                  Our AI chatbot handles customer inquiries around the clock, ensuring your customers always get immediate responses.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-xl p-8">
                {/* Placeholder for illustration */}
                <div className="aspect-video bg-gray-200 rounded-lg" />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2 order-2 md:order-1 bg-gray-100 rounded-xl p-8">
                {/* Placeholder for illustration */}
                <div className="aspect-video bg-gray-200 rounded-lg" />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-4">Smart Marketing Insights</h3>
                <p className="text-gray-600">
                  Turn conversations into valuable marketing data with our advanced analytics and keyword extraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of businesses already using our platform
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">AI Chatbot</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            © 2023 AI Chatbot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
