import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  // Parse cookies from the request headers
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.token;

  // Check if the user is authenticated by checking for the presence of a token
  const isAuthenticated = Boolean(token);

  if (isAuthenticated) {
    // Allow the request to proceed if the user is authenticated
    return NextResponse.next();
  } else {
    // Redirect the user to the login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Specify routes where the middleware should be applied
export const config = {
  matcher: ['/movies/:path*', '/'], // Apply middleware to these routes
};
