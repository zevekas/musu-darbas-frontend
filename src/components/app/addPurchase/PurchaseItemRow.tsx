import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ItemField, PurchaseItemDraft } from '#/hooks/use-add-purchase'
import type { Product } from '#/hooks/use-purchases-TEMP'

type PurchaseItemRowProps = {
  item: PurchaseItemDraft
  products: Product[]
  productsLoading: boolean
  canRemove: boolean
  onChange: (field: ItemField, value: string) => void
  onRemove: () => void
}

export function PurchaseItemRow({
  item,
  products,
  productsLoading,
  canRemove,
  onChange,
  onRemove,
}: PurchaseItemRowProps) {
  const { t } = useTranslation()

  const selectedName = products.find((p) => p.id === item.roomProductId)?.name

  return (
    <div className="grid grid-cols-2 gap-3 border p-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_2.25rem] sm:items-end sm:gap-4 sm:border-0 sm:p-0">
      <div className="col-span-2 space-y-1.5 sm:col-span-1 sm:space-y-0">
        <div className="flex items-center justify-between sm:block">
          <Label htmlFor={`product-${item.id}`} className="sm:sr-only">
            {t('addPurchase.items.product')}
          </Label>

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={onRemove}
            disabled={!canRemove}
            aria-label={t('addPurchase.items.remove')}
            className="text-muted-foreground sm:hidden"
          >
            <X />
          </Button>
        </div>

        <Select
          value={item.roomProductId}
          onValueChange={(value) => onChange('roomProductId', value)}
          disabled={productsLoading}
        >
          <SelectTrigger id={`product-${item.id}`} className="w-full">
            <SelectValue
              placeholder={
                productsLoading
                  ? t('common.loading')
                  : t('addPurchase.items.productPlaceholder')
              }
            >
              {selectedName}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 sm:space-y-0">
        <Label htmlFor={`quantity-${item.id}`} className="sm:sr-only">
          {t('addPurchase.items.quantity')}
        </Label>
        <Input
          id={`quantity-${item.id}`}
          type="number"
          inputMode="numeric"
          min="1"
          step="1"
          placeholder="0"
          value={item.quantity}
          onChange={(e) => onChange('quantity', e.target.value)}
        />
      </div>

      <div className="space-y-1.5 sm:space-y-0">
        <Label htmlFor={`line-total-${item.id}`} className="sm:sr-only">
          {t('addPurchase.items.amount')}
        </Label>
        <Input
          id={`line-total-${item.id}`}
          type="number"
          inputMode="decimal"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={item.lineTotal}
          onChange={(e) => onChange('lineTotal', e.target.value)}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={t('addPurchase.items.remove')}
        className="hidden sm:inline-flex"
      >
        <X />
      </Button>
    </div>
  )
}
