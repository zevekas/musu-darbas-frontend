import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRoomProducts } from '#/hooks/use-room-products'
import { useRoomBalances } from '#/hooks/use-room-members'
import { useRoomExpenses } from '#/hooks/use-purchases'
import { useRoomActivity } from '#/hooks/use-room-activity'
import { useDashboardPage } from '#/hooks/app/use-dashboard-page'
import { StockSection } from '#/components/app/dashboard/StockSection'
import { ActivityFeed } from '#/components/app/dashboard/ActivityFeed'
import { MembersCard } from '#/components/app/dashboard/MembersCard'
import { ExpensesCard } from '#/components/app/dashboard/ExpensesCard'

export const Route = createFileRoute('/app/')({
  component: Dashboard,
})

function Dashboard() {
  const { t } = useTranslation()

  const products = useRoomProducts()
  const activity = useRoomActivity()
  const balances = useRoomBalances()
  const expenses = useRoomExpenses()

  const {
    query,
    setQuery,
    searching,
    showAll,
    toggleShowAll,
    canToggleShowAll,
    totalCount,
    runningOutCount,
    visibleProducts,
  } = useDashboardPage(products.data)

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 space-y-6">
      {/* Header */}
      {/* Mobile: full-width button under the title, like the other pages */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-2xl font-medium">{t('dashboard.title')}</h1>

        <Button size="lg" asChild className="w-full sm:w-auto">
          <Link to="/app/add-purchase">
            <Plus />
            {t('nav.addPurchase')}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-8">
          <StockSection
            products={visibleProducts}
            productsLoading={products.isPending}
            productsError={products.isError}
            totalCount={totalCount}
            runningOutCount={runningOutCount}
            query={query}
            onQueryChange={setQuery}
            searching={searching}
            showAll={showAll}
            canToggleShowAll={canToggleShowAll}
            onToggleShowAll={toggleShowAll}
          />

          <ActivityFeed
            activity={activity.data}
            activityLoading={activity.isPending}
            activityError={activity.isError}
          />
        </div>

        <aside className="min-w-0 space-y-6">
          <MembersCard
            members={balances.data}
            membersLoading={balances.isPending}
            membersError={balances.isError}
          />

          <ExpensesCard
            expenses={expenses.data}
            expensesLoading={expenses.isPending}
            expensesError={expenses.isError}
          />
        </aside>
      </div>
    </div>
  )
}
