import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('请求路径:', request.nextUrl.pathname)

  return NextResponse.next()
}

export const config = {
  matchMedia: '/home'
}