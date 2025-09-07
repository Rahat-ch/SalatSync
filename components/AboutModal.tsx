'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <Card className="relative z-10 mx-4 w-full max-w-2xl p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-elegant mb-2 text-3xl font-bold text-gray-900">About SalatSync</h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-green-600"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 text-gray-700">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                <span className="text-2xl font-bold text-white">R</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Rahat</h3>
              <p className="mb-4 text-sm text-gray-600">
                Software Engineer & Developer Relations Engineer
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="mb-4 text-lg leading-relaxed">
                As a software engineer and developer relations engineer, I&apos;m passionate about
                building products that serve the Muslim community and make technology more
                accessible to our Ummah.
              </p>

              <p className="mb-4 text-base leading-relaxed">
                SalatSync was born from my own need to better integrate my faith into my daily
                workflow. As someone who works in tech, I found it challenging to maintain
                consistent prayer times while managing a busy schedule with meetings, coding
                sessions, and deadlines.
              </p>

              <p className="mb-4 text-base leading-relaxed">
                This tool represents more than just a calendar integration, it&apos;s about helping
                fellow Muslims in tech and beyond stay connected to their faith through the power of
                modern technology. Every feature is designed with the Muslim developer experience in
                mind.
              </p>

              <div className="rounded-r-lg border-l-4 border-green-500 bg-green-50 p-4">
                <p className="mb-2 font-medium text-green-800">My Mission:</p>
                <p className="text-sm text-green-700">
                  To bridge the gap between technology and faith, creating tools that help Muslims
                  maintain their spiritual practices while embracing the digital world.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-4 text-center">
              <Button
                onClick={onClose}
                className="bg-green-600 px-8 py-2 text-white hover:bg-green-700"
              >
                Get Started with SalatSync
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
