'use client';

import { useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            scope: 'openid email profile https://www.googleapis.com/auth/calendar',
          },
        },
      });

      if (error) {
        console.error('Error signing in:', error.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <Card className="islamic-border w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="from-primary to-primary-light mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r">
            <span className="text-4xl text-white">☪</span>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to SalatSync</CardTitle>
          <CardDescription className="text-base">
            Sign in to sync your prayer times with Google Calendar and never miss a prayer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="h-12 w-full text-base"
            size="lg"
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <Icons.google className="mr-2 h-5 w-5" />
                Continue with Google
              </>
            )}
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            By signing in, you agree to sync your prayer times with your Google Calendar
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
