import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.redirect(
    new URL('/downloads/CHEP_WORDPRESS_THEME_AND_PLUGINS_SUITE.zip', url.origin)
  );
}
