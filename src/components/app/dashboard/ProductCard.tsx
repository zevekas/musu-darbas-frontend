import { useTranslation } from 'react-i18next'
import { Package } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '#/lib/format'
import type { ProductStatus } from '#/hooks/use-products'
import type { RoomProduct } from '#/hooks/use-room-products'

const STATUS_STYLE: Record<
  ProductStatus,
  { badge: string; fill: string; segments: number }
> = {
  FULL: {
    badge: 'bg-emerald-50 text-emerald-700',
    fill: 'bg-emerald-500',
    segments: 4,
  },
  HALF: { badge: 'bg-sky-50 text-sky-700', fill: 'bg-sky-500', segments: 2 },
  QUARTER: {
    badge: 'bg-amber-50 text-amber-700',
    fill: 'bg-amber-500',
    segments: 1,
  },
  EMPTY: { badge: 'bg-red-50 text-red-700', fill: 'bg-red-500', segments: 0 },
}

const TINTS = [
  'bg-indigo-50',
  'bg-amber-50',
  'bg-emerald-50',
  'bg-rose-50',
  'bg-violet-50',
]
const tintFor = (name: string) =>
  TINTS[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % TINTS.length]

type ProductCardProps = {
  product: RoomProduct
  onUpdate?: (product: RoomProduct) => void
}

/**
 * Mobile: a compact row (icon, name, stock), the whole row opens the update.
 * sm and up: a card with the stock below the name and an update footer.
 */
export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const { t, i18n } = useTranslation()
  const style = STATUS_STYLE[product.status]
  const statusLabel = t(`dashboard.status.${product.status}`)
  const updatedLabel = t('dashboard.stock.updated', {
    time: formatRelativeTime(product.updatedAt, i18n.language),
  })

  const stockValue =
    product.type === 'QUANTITY' ? (
      <span className="text-lg leading-none font-semibold tabular-nums sm:text-2xl">
        {product.amount ?? 0}
      </span>
    ) : (
      <div
        role="img"
        aria-label={statusLabel}
        className="flex w-16 gap-1 sm:w-auto sm:max-w-24 sm:min-w-0 sm:flex-1 sm:pb-1.5"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full sm:h-2',
              i < style.segments ? style.fill : 'bg-muted',
            )}
          />
        ))}
      </div>
    )

  const statusBadge = (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap sm:px-2.5 sm:py-1',
        style.badge,
      )}
    >
      {statusLabel}
    </span>
  )

  return (
    <Card className="relative gap-0 p-3 transition-colors max-sm:has-[button:hover]:bg-muted/50 sm:p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:size-11',
            tintFor(product.name),
          )}
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt=""
              className="size-6 object-contain sm:size-7"
            />
          ) : (
            <Package className="size-5 text-muted-foreground" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{product.name}</h3>
          <p className="truncate text-xs text-muted-foreground sm:hidden">
            {updatedLabel}
          </p>
        </div>

        {/* Mobile: stock on the right of the name */}
        <div className="flex shrink-0 flex-col items-end gap-1.5 sm:hidden">
          {stockValue}
          {statusBadge}
        </div>
      </div>

      {/* sm and up: stock below the name */}
      <div className="mt-5 hidden items-end justify-between gap-3 sm:flex">
        {stockValue}
        {statusBadge}
      </div>

      <div className="max-sm:contents sm:mt-4 sm:flex sm:items-center sm:justify-between sm:gap-2 sm:border-t sm:pt-3 sm:text-xs">
        <span className="hidden text-muted-foreground sm:inline">
          {updatedLabel}
        </span>
        {/* On mobile the button covers the whole card (stretched link) */}
        <button
          type="button"
          onClick={() => onUpdate?.(product)}
          aria-label={`${t('dashboard.stock.update')}: ${product.name}`}
          className="shrink-0 font-medium text-primary hover:underline focus-visible:outline-none max-sm:after:absolute max-sm:after:inset-0 max-sm:focus-visible:after:ring-2 max-sm:focus-visible:after:ring-ring/50"
        >
          <span className="max-sm:sr-only">{t('dashboard.stock.update')}</span>
        </button>
      </div>
    </Card>
  )
}
