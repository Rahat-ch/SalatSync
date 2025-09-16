import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(
      new URL(`/dashboard?calendar_error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // Verify state parameter
  if (state !== 'calendar-sync') {
    console.error('Invalid state parameter:', state);
    return NextResponse.redirect(new URL('/dashboard?calendar_error=invalid_state', request.url));
  }

  if (!code) {
    console.error('No authorization code received');
    return NextResponse.redirect(new URL('/dashboard?calendar_error=no_code', request.url));
  }

  try {
    const redirectUri = `${request.nextUrl.origin}/auth/google/callback`;

    // Log for debugging
    console.log('Token exchange attempt:', {
      origin: request.nextUrl.origin,
      redirectUri,
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.slice(0, 20) + '...',
      hasSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      code: code?.slice(0, 20) + '...',
    });

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorData,
        redirectUri,
      });
      return NextResponse.redirect(
        new URL('/dashboard?calendar_error=token_exchange_failed', request.url)
      );
    }

    const tokens = await tokenResponse.json();

    // Calculate expiration time
    const expiresAt = Date.now() + tokens.expires_in * 1000;

    // Create a secure way to pass tokens to the client
    // In production, you might want to store these in a secure cookie or database
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: expiresAt,
      scope: tokens.scope,
    };

    // Encode token data as URL parameter (in production, use secure storage)
    const encodedTokens = encodeURIComponent(JSON.stringify(tokenData));

    return NextResponse.redirect(
      new URL(`/dashboard?calendar_success=${encodedTokens}`, request.url)
    );
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(new URL('/dashboard?calendar_error=server_error', request.url));
  }
}
