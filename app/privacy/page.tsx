import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Privacy Policy - SalatSync',
  description: 'SalatSync Privacy Policy - How we handle your personal information and data.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="SalatSync Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h1 className="font-elegant text-2xl font-bold">SalatSync</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="nav-link">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="font-elegant mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>

          <p className="mb-8 text-gray-600">
            <strong>Effective Date:</strong>{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="leading-relaxed text-gray-700">
              Welcome to SalatSync (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are
              committed to protecting your privacy and handling your personal information
              responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our SalatSync application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">2. Information We Collect</h2>

            <h3 className="mb-3 text-xl font-medium text-gray-800">2.1 Personal Information</h3>
            <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700">
              <li>Google account information (name, email address) when you sign in</li>
              <li>Location data to calculate accurate prayer times for your area</li>
              <li>Prayer time preferences and calculation method settings</li>
              <li>Calendar sync preferences and settings</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium text-gray-800">2.2 Google Calendar Data</h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              When you choose to sync with Google Calendar, we access your calendar to:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Create prayer time events and reminders</li>
              <li>Update existing prayer time events</li>
              <li>Delete outdated prayer time events</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              3. How We Use Your Information
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Calculate and display accurate prayer times for your location</li>
              <li>Sync prayer times with your Google Calendar</li>
              <li>Send prayer time reminders and notifications</li>
              <li>Customize the app experience based on your preferences</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              4. Information Sharing and Disclosure
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information only in the following circumstances:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>
                <strong>With your consent:</strong> When you explicitly authorize us to share
                specific information
              </li>
              <li>
                <strong>Service providers:</strong> With trusted third-party services that help us
                operate our app (Google Calendar API, Supabase for authentication)
              </li>
              <li>
                <strong>Legal compliance:</strong> When required by law or to protect our rights and
                safety
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">5. Data Security</h2>
            <p className="leading-relaxed text-gray-700">
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction. This includes encryption of data in transit and at rest, secure
              authentication processes, and regular security assessments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">6. Data Retention</h2>
            <p className="leading-relaxed text-gray-700">
              We retain your personal information only as long as necessary to provide our services
              and fulfill the purposes outlined in this Privacy Policy. You can delete your account
              at any time, which will remove your personal data from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              7. Your Rights and Choices
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">You have the right to:</p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Access and review your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your account and associated data</li>
              <li>Withdraw consent for data processing</li>
              <li>Revoke Google Calendar access at any time</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">8. Third-Party Services</h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              SalatSync integrates with the following third-party services:
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>
                <strong>Google Calendar API:</strong> For calendar synchronization
              </li>
              <li>
                <strong>Google Authentication:</strong> For secure sign-in
              </li>
              <li>
                <strong>Supabase:</strong> For user authentication and data storage
              </li>
            </ul>
            <p className="leading-relaxed text-gray-700">
              These services have their own privacy policies, which we encourage you to review.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              9. Children&apos;s Privacy
            </h2>
            <p className="leading-relaxed text-gray-700">
              SalatSync is not intended for children under the age of 13. We do not knowingly
              collect personal information from children under 13. If we become aware that we have
              collected personal information from a child under 13, we will take steps to delete
              such information promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              10. International Data Transfers
            </h2>
            <p className="leading-relaxed text-gray-700">
              Your information may be transferred to and processed in countries other than your own.
              We ensure that such transfers are conducted in accordance with applicable data
              protection laws and with appropriate safeguards in place.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              11. Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the updated policy on our website and updating the
              &quot;Effective Date&quot; at the top of this policy. Your continued use of SalatSync
              after such changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center">
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">Return to SalatSync</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
