import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (token && url.pathname === '/signin') {
    return NextResponse.redirect(`${url.origin}/`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin'],
};
