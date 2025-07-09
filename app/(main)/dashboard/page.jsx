import { getCurrentBudget } from '@/actions/budget';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import BudgetProgress from './_components/budget-progress';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import React, { Suspense } from 'react';
import { AccountCard } from './_components/account-card';
import DashboardOverview from './_components/transaction-overview';
import { useState } from 'react';
import { toast } from 'sonner';

async function DashboardPage() {
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

  const accounts = await getUserAccounts();

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Manual Monthly Report Trigger */}
      <button
        onClick={handleManualReport}
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 mb-4"
      >
        {loading ? 'Triggering Report...' : 'Send Monthly Report to My Email'}
      </button>
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview */}
      <Suspense fallback={"Loading Overview..."}>
            <DashboardOverview 
            accounts={accounts}
            transactions={transactions || []}/>
      </Suspense>


      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
          return <AccountCard key={account.id} account={account} />;
        })}
      </div>
    </div>
  );
}

export default DashboardPage;