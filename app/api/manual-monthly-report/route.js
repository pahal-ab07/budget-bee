import { generateMonthlyReports } from '@/lib/inngest/functions';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Directly call the function to generate reports
    await generateMonthlyReports.fn({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error triggering monthly report:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 