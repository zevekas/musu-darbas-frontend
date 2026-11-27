import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PRODUCT_STATUSES } from '#/hooks/use-products-TEMP'
import type { ProductStatus, ProductType } from '#/hooks/use-products-TEMP'

type AddToRoomCardProps = {
  addToRoom: boolean
  onAddToRoomChange: (value: boolean) => void
  type: ProductType
  quantity: string
  onQuantityChange: (value: string) => void
  status: ProductStatus
  onStatusChange: (value: ProductStatus) => void
}

export function AddToRoomCard({
  addToRoom,
  onAddToRoomChange,
  type,
  quantity,
  onQuantityChange,
  status,
  onStatusChange,
}: AddToRoomCardProps) {
  const { t } = useTranslation()

  return (
    <Card className="bg-transparent py-0 ring-0 sm:bg-card sm:py-(--card-spacing) sm:ring-1">
      <CardContent className="space-y-4 px-0 sm:px-(--card-spacing)">
        <label className="flex cursor-pointer items-center gap-3 text-xs font-medium">
          <input
            type="checkbox"
            checked={addToRoom}
            onChange={(e) => onAddToRoomChange(e.target.checked)}
            className="size-4 accent-primary"
          />
          {t('createProduct.room.addToRoom')}
        </label>

        {addToRoom && (
          <div className="space-y-2 border-t pt-4">
            {type === 'QUANTITY' ? (
              <>
                <Label htmlFor="product-quantity">
                  {t('createProduct.room.quantity')} *
                </Label>
                <Input
                  id="product-quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => onQuantityChange(e.target.value)}
                />
              </>
            ) : (
              <>
                <Label htmlFor="product-status">
                  {t('createProduct.room.status')} *
                </Label>
                <Select
                  value={status}
                  onValueChange={(value) =>
                    onStatusChange(value as ProductStatus)
                  }
                >
                  <SelectTrigger id="product-status" className="w-full">
                    <SelectValue>
                      {t(`createProduct.statusOptions.${status}`)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {t(`createProduct.statusOptions.${s}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}

            <p className="text-xs text-muted-foreground">
              {t('createProduct.room.hint')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
