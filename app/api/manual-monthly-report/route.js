import { inngest } from '@/lib/inngest/client';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Send an event to trigger the monthly report function
    await inngest.send({
      name: 'report.monthly.manual',
      data: {
        triggeredBy: 'manual',
        timestamp: Date.now(),
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error triggering monthly report:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 