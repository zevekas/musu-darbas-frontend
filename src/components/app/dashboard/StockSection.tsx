import { useTranslation } from 'react-i18next'
import { CircleAlert, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCard } from './ProductCard'
import { TOP_PRODUCTS_COUNT } from '#/hooks/app/use-dashboard-page'
import type { RoomProduct } from '#/hooks/use-room-products'

type StockSectionProps = {
  products: RoomProduct[]
  productsLoading: boolean
  productsError: boolean
  totalCount: number
  runningOutCount: number
  query: string
  onQueryChange: (query: string) => void
  searching: boolean
  showAll: boolean
  canToggleShowAll: boolean
  onToggleShowAll: () => void
}

export function StockSection({
  products,
  productsLoading,
  productsError,
  totalCount,
  runningOutCount,
  query,
  onQueryChange,
  searching,
  showAll,
  canToggleShowAll,
  onToggleShowAll,
}: StockSectionProps) {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="stock-title">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="flex items-baseline gap-3">
          <h2 id="stock-title" className="text-lg font-semibold">
            {t('dashboard.stock.title')}
          </h2>
          <span className="text-sm text-muted-foreground">
            {t('dashboard.stock.itemCount', { count: totalCount })}
          </span>
        </div>

        {runningOutCount > 0 && (
          <span className="flex items-center gap-1.5 text-sm text-amber-600">
            <CircleAlert className="size-4" aria-hidden />
            {t('dashboard.stock.runningOut', { count: runningOutCount })}
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('dashboard.stock.searchPlaceholder')}
            aria-label={t('dashboard.stock.searchPlaceholder')}
            className="h-10 pl-10"
          />
        </div>

        {canToggleShowAll && (
          <Button
            type="button"
            variant="outline"
            className="h-10 shrink-0"
            aria-pressed={showAll}
            onClick={onToggleShowAll}
          >
            {showAll
              ? t('dashboard.stock.showLess')
              : t('dashboard.stock.showAll')}
          </Button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))] sm:gap-4">
        {productsLoading &&
          Array.from({ length: TOP_PRODUCTS_COUNT }, (_, i) => (
            <Skeleton key={i} className="h-16 sm:h-44" />
          ))}

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {productsError && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {t('common.error')}
        </p>
      )}

      {!productsLoading && !productsError && products.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          {searching
            ? t('dashboard.stock.noResults')
            : t('dashboard.stock.empty')}
        </p>
      )}
    </section>
  )
}
