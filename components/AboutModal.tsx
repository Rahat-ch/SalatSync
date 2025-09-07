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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <Card className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto p-4 shadow-2xl sm:p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 sm:top-4 sm:right-4"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-elegant mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              About SalatSync
            </h2>
            <div className="mx-auto h-1 w-16 rounded-full bg-green-600"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 text-gray-700 sm:space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 sm:mb-4 sm:h-20 sm:w-20">
                <span className="text-xl font-bold text-white sm:text-2xl">R</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">Rahat</h3>
              <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
                Software Engineer & Developer Relations Engineer
              </p>
            </div>

            <div className="prose prose-gray prose-sm sm:prose-base max-w-none">
              <p className="mb-3 text-base leading-relaxed sm:mb-4 sm:text-lg">
                As a software engineer and developer relations engineer, I&apos;m passionate about
                building products that serve the Muslim community and make technology more
                accessible to our Ummah.
              </p>

              <p className="mb-3 text-sm leading-relaxed sm:mb-4 sm:text-base">
                SalatSync was born from my own need to better integrate my faith into my daily
                workflow. As someone who works in tech, I found it challenging to maintain
                consistent prayer times while managing a busy schedule with meetings, coding
                sessions, and deadlines.
              </p>

              <p className="mb-3 text-sm leading-relaxed sm:mb-4 sm:text-base">
                This tool represents more than just a calendar integration, it&apos;s about helping
                fellow Muslims in tech and beyond stay connected to their faith through the power of
                modern technology. Every feature is designed with the Muslim developer experience in
                mind.
              </p>

              <div className="rounded-r-lg border-l-4 border-green-500 bg-green-50 p-3 sm:p-4">
                <p className="mb-2 text-sm font-medium text-green-800 sm:text-base">My Mission:</p>
                <p className="text-xs text-green-700 sm:text-sm">
                  To bridge the gap between technology and faith, creating tools that help Muslims
                  maintain their spiritual practices while embracing the digital world.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-3 text-center sm:pt-4">
              <Button
                onClick={onClose}
                className="w-full bg-green-600 px-6 py-2 text-sm text-white hover:bg-green-700 sm:w-auto sm:px-8 sm:text-base"
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
