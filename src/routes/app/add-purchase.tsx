import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAddPurchase } from '@/hooks/use-add-purchase.ts'
import type { FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X, Check, ArrowLeft } from 'lucide-react'
import { useUserData } from '@/hooks/use-user-data.ts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@clerk/react'

export const Route = createFileRoute('/app/add-purchase')({
  component: AddPurchase,
})

function AddPurchase() {
  const { t } = useTranslation()

  const { getUserData } = useUserData()
  const { data: user } = getUserData

  const { userId } = useAuth()

  const {
    items,
    paidBy,
    setPaidBy,
    purchaseDate,
    setPurchaseDate,
    spaceId,
    setSpaceId,
    note,
    setNote,
    updateItem,
    addItem,
    removeItem,
    totalAmount,
    isValid,
  } = useAddPurchase()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isValid) return

    const purchaseData = {
      items: items,
      paidBy: paidBy,
      purchaseDate: purchaseDate,
      spaceId: spaceId,
      note: note,
      totalAmount: totalAmount,
    }

    console.log(purchaseData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-[13px] leading-none font-medium text-muted-foreground hover:text-foreground uppercase"
        >
          <ArrowLeft className="size-3.5 shrink-0" />
          <span>{t('addPurchase.back')}</span>
        </Link>

        <h1 className="text-2xl font-medium">{t('nav.addPurchase')}</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('addPurchase.items.title')}</CardTitle>
          <span className="text-xs text-muted-foreground">
            {t('addPurchase.items.currencyInfo')}
          </span>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-[2fr_1fr_1fr_2.25rem] gap-4 mb-2">
            <Label>{t('addPurchase.items.product')}</Label>
            <Label>{t('addPurchase.items.quantity')}</Label>
            <Label>{t('addPurchase.items.amount')}</Label>
            <div />
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_1fr_1fr_2.25rem] items-end gap-4"
            >
              <div>
                <Label htmlFor={`product-${item.id}`} className="sr-only">
                  {t('addPurchase.items.product')}
                </Label>
                <Input
                  id={`product-${item.id}`}
                  placeholder={t('addPurchase.items.productPlaceholder')}
                  value={item.productName}
                  onChange={(e) =>
                    updateItem(item.id, 'productName', e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`quantity-${item.id}`} className="sr-only">
                  {t('addPurchase.items.quantity')}
                </Label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  step="1"
                  placeholder="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(item.id, 'quantity', e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`amount-${item.id}`} className="sr-only">
                  {t('addPurchase.items.amount')}
                </Label>
                <Input
                  id={`amount-${item.id}`}
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={item.amount}
                  onChange={(e) =>
                    updateItem(item.id, 'amount', e.target.value)
                  }
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                aria-label={t('addPurchase.items.remove')}
              >
                <X />
              </Button>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus />
              {t('addPurchase.items.add')}
            </Button>

            <div className="text-sm">
              {t('addPurchase.items.total')}:{' '}
              <span className="text-lg font-semibold">
                {totalAmount.toFixed(2)} €
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('addPurchase.details.title')}</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="paid-by">{t('addPurchase.details.paidBy')}</Label>

            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger id="paid-by" className="w-full">
                <SelectValue
                  placeholder={t('addPurchase.details.paidByPlaceholder')}
                >
                  {paidBy === userId && user?.username
                    ? `${user.username} (${t('addPurchase.details.you')})`
                    : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {userId && user?.username && (
                  <SelectItem value={userId}>
                    {user.username} ({t('addPurchase.details.you')})
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase-date">
              {t('addPurchase.details.purchaseDate')}
            </Label>
            <Input
              id="purchase-date"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="space">{t('addPurchase.details.space')}</Label>

            <Select value={spaceId} onValueChange={setSpaceId}>
              <SelectTrigger id="space" className="w-full">
                <SelectValue
                  placeholder={t('addPurchase.details.spacePlaceholder')}
                >
                  {spaceId && user?.room
                    ? t('nav.room', { room: user.room })
                    : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {user?.room && (
                  <SelectItem value={user.room}>
                    {t('nav.room', { room: user.room })}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="note">{t('addPurchase.details.note')}</Label>
            <Input
              id="note"
              placeholder={t('addPurchase.details.notePlaceholder')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/app">{t('addPurchase.button.cancel')}</Link>
        </Button>

        <Button type="submit" disabled={!isValid}>
          <Check />
          {t('addPurchase.button.save')} · {totalAmount.toFixed(2)} €
        </Button>
      </div>
    </form>
  )
}
