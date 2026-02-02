import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Dev subdomain or localhost → serve vibe-drive content
  const isDevDomain = hostname.startsWith('dev.') || hostname.startsWith('localhost');
  
  // If on dev domain and hitting root paths, rewrite to /dev
  if (isDevDomain && !pathname.startsWith('/dev') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    return NextResponse.rewrite(new URL(`/dev${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
