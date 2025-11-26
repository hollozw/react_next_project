import { NextResponse } from "next/server";

export function middleware(request: any) {

  return NextResponse.next();
}
