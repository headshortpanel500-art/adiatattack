import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');
  const userRole = request.cookies.get('userRole')?.value;
  const { pathname } = request.nextUrl;

  // ১. অলরেডি লগইন থাকলে লগইন পেজে যেতে দিবে না
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL(userRole === '' ? '/admin' : '/dashboard', request.url));
  }

  // ২. লগইন না থাকলে প্রোটেক্টেড পেজে যেতে দিবে না
  if (!isLoggedIn && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ৩. রোল প্রোটেকশন: ইউজার যদি এডমিন প্যানেলে ঢুকতে চায় তাকে ড্যাশবোর্ডে পাঠাও
  if (isLoggedIn && userRole === 'user' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ৪. এডমিন যদি ভুল করে ড্যাশবোর্ডে যায় তাকে এডমিন প্যানেলে পাঠাও
  if (isLoggedIn && userRole === 'admin' && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/'],
};