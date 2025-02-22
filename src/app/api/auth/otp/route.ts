import { NextResponse } from 'next/server';

// In a real app, use a proper database. This is just for demo purposes
const otpStore = new Map<string, { otp: string; timestamp: number }>();

export async function POST(request: Request) {
  // Parse the JSON body once
  const { phone, action, otp } = await request.json();

  if (action === 'generate') {
    // Generate a 6-digit OTP
    const generatedOtp = "111111"; //Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with timestamp (expires in 5 minutes)
    otpStore.set(phone, {
      otp: generatedOtp,
      timestamp: Date.now() + 5 * 60 * 1000,
    });

    // In production, send OTP via SMS service
    console.log(`OTP for ${phone}: ${generatedOtp}`);

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  }

  if (action === 'verify') {
    const storedData = otpStore.get(phone);

    if (!storedData) {
      return NextResponse.json({ success: false, message: 'OTP expired or not found' }, { status: 400 });
    }

    if (Date.now() > storedData.timestamp) {
      otpStore.delete(phone);
      return NextResponse.json({ success: false, message: 'OTP expired' }, { status: 400 });
    }

    if (storedData.otp !== otp) {
      return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
    }

    // Clear the OTP after successful verification
    otpStore.delete(phone);

    return NextResponse.json({ success: true, message: 'OTP verified successfully' });
  }

  return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
