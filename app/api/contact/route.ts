import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, message: 'സന്ദേശം ലഭിച്ചു. നന്ദി!' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'പിശക് സംഭവിച്ചു.' }, { status: 500 });
  }
}
