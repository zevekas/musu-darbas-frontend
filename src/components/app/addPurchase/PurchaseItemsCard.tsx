import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PurchaseItemRow } from './PurchaseItemRow'
import type { ItemField, PurchaseItemDraft } from '#/hooks/use-add-purchase'
import type { Product } from '#/hooks/use-purchases-TEMP'

type PurchaseItemsCardProps = {
  items: PurchaseItemDraft[]
  products: Product[] | undefined
  productsLoading: boolean
  productsError: boolean
  totalAmount: number
  onUpdateItem: (id: number, field: ItemField, value: string) => void
  onAddItem: () => void
  onRemoveItem: (id: number) => void
}

export function PurchaseItemsCard({
  items,
  products = [],
  productsLoading,
  productsError,
  totalAmount,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: PurchaseItemsCardProps) {
  const { t } = useTranslation()

  function availableProducts(item: PurchaseItemDraft) {
    return products.filter(
      (product) =>
        product.id === item.roomProductId ||
        !items.some((other) => other.roomProductId === product.id),
    )
  }

  return (
    <Card className="bg-transparent py-0 ring-0 sm:bg-card sm:py-(--card-spacing) sm:ring-1">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-1 px-0 sm:px-(--card-spacing)">
        <CardTitle>{t('addPurchase.items.title')}</CardTitle>
        <span className="text-xs text-muted-foreground">
          {t('addPurchase.items.currencyInfo')}
        </span>
      </CardHeader>

      <CardContent className="space-y-3 px-0 sm:space-y-4 sm:px-(--card-spacing)">
        {/* Shown once for the whole list rather than under every row's dropdown */}
        {productsError && (
          <p role="alert" className="text-sm text-destructive">
            {t('addPurchase.errors.loadProducts')}
          </p>
        )}

        <div
          aria-hidden
          className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem] gap-4 sm:grid"
        >
          <Label>{t('addPurchase.items.product')}</Label>
          <Label>{t('addPurchase.items.quantity')}</Label>
          <Label>{t('addPurchase.items.amount')}</Label>
          <div />
        </div>

        {items.map((item) => (
          <PurchaseItemRow
            key={item.id}
            item={item}
            products={availableProducts(item)}
            productsLoading={productsLoading}
            canRemove={items.length > 1}
            onChange={(field, value) => onUpdateItem(item.id, field, value)}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onAddItem}
            className="w-full sm:w-auto"
          >
            <Plus />
            {t('addPurchase.items.add')}
          </Button>

          <div className="flex items-baseline justify-between gap-2 text-sm sm:justify-end">
            <span>{t('addPurchase.items.total')}:</span>
            <span className="text-lg font-semibold">
              {totalAmount.toFixed(2)} €
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
