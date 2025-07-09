'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function ManualReportTrigger() {
  const [loading, setLoading] = useState(false);

  const handleManualReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/manual-monthly-report', { method: 'POST' });
      if (res.ok) {
        toast.success('Monthly report triggered! Check your email soon.');
      } else {
        toast.error('Failed to trigger monthly report.');
      }
    } catch (e) {
      toast.error('Error triggering monthly report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleManualReport}
      disabled={loading}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 mb-4"
    >
      {loading ? 'Triggering Report...' : 'Send Monthly Report to My Email'}
    </button>
  );
} 