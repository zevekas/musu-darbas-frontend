import { useTranslation } from 'react-i18next'
import { RefreshCw, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency, formatRelativeTime } from '#/lib/format'
import type { ActivityItem } from '#/hooks/use-room-activity'
import type { ProductStatus } from '#/hooks/use-products'

type ActivityFeedProps = {
  activity: ActivityItem[] | undefined
  activityLoading: boolean
  activityError: boolean
}

export function ActivityFeed({
  activity,
  activityLoading,
  activityError,
}: ActivityFeedProps) {
  const { t, i18n } = useTranslation()

  const value = (v: number | ProductStatus) =>
    typeof v === 'number' ? String(v) : t(`dashboard.status.${v}`)

  return (
    <section aria-labelledby="activity-title">
      <div className="flex items-baseline justify-between">
        <h2 id="activity-title" className="text-lg font-semibold">
          {t('dashboard.activity.title')}
        </h2>
      </div>

      <Card className="mt-4 gap-0 divide-y p-0">
        {activityLoading &&
          Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="m-4 h-12" />
          ))}
        {activityError && (
          <p role="alert" className="p-5 text-sm text-destructive">
            {t('common.error')}
          </p>
        )}
        {activity?.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">
            {t('dashboard.activity.empty')}
          </p>
        )}
        {activity?.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              {item.kind === 'PURCHASE' ? (
                <ShoppingBag
                  className="size-5 text-muted-foreground"
                  aria-hidden
                />
              ) : (
                <RefreshCw
                  className="size-5 text-muted-foreground"
                  aria-hidden
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">
                {item.kind === 'STOCK_UPDATE'
                  ? t('dashboard.activity.stockUpdated', {
                      user: item.username,
                      product: item.productName,
                      from: value(item.from),
                      to: value(item.to),
                    })
                  : t('dashboard.activity.purchase', {
                      user: item.username,
                      description: item.description,
                    })}
              </p>
              {item.kind === 'PURCHASE' && (
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.activity.perPerson', {
                    amount: formatCurrency(item.perPerson, i18n.language),
                  })}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium">
                {item.kind === 'PURCHASE'
                  ? formatCurrency(item.total, i18n.language)
                  : t('dashboard.activity.stockOnly')}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(item.createdAt, i18n.language)}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </section>
  )
}
