'use client';

import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  return (
    <Card className="islamic-border w-full max-w-md">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
        <CardDescription className="text-base">
          {errorDescription || 'An error occurred during authentication. Please try again.'}
        </CardDescription>
        {error && <p className="text-muted-foreground text-sm">Error code: {error}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <Link href="/auth/signin" className="block">
          <Button className="h-12 w-full text-base" size="lg">
            Try Again
          </Button>
        </Link>
        <Link href="/" className="block">
          <Button variant="outline" className="h-12 w-full text-base" size="lg">
            Go Home
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/so-white.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
