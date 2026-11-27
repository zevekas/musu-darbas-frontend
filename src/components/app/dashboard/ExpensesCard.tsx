import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '#/lib/format'
import type { RoomExpenses } from '#/hooks/use-purchases'

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const

type ExpensesCardProps = {
  expenses: RoomExpenses | undefined
  expensesLoading: boolean
  expensesError: boolean
}

export function ExpensesCard({
  expenses,
  expensesLoading,
  expensesError,
}: ExpensesCardProps) {
  const { t, i18n } = useTranslation()

  return (
    <Card className="gap-0 p-5">
      {expensesLoading && <Skeleton className="h-28" />}
      {expensesError && (
        <p role="alert" className="text-sm text-destructive">
          {t('common.error')}
        </p>
      )}
      {expenses && (
        <>
          <div className="flex items-center justify-between text-sm">
            <h2>
              {t('dashboard.expenses.title', {
                month: t(`dashboard.months.${MONTHS[expenses.month - 1]}`),
              })}
            </h2>
          </div>
          <p className="mt-4 text-2xl font-semibold tabular-nums">
            {formatCurrency(expenses.total, i18n.language)}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
            <span className="text-muted-foreground">
              {t('dashboard.members.count', { count: expenses.memberCount })} ·{' '}
              {t('dashboard.expenses.equalSplit')}
            </span>
            <span className="font-semibold">
              {t('dashboard.expenses.perPerson', {
                amount: formatCurrency(expenses.perPerson, i18n.language),
              })}
            </span>
          </div>
        </>
      )}
    </Card>
  )
}
