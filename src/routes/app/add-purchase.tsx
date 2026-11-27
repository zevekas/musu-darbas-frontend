import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAddPurchasePage } from '#/hooks/app/use-add-purchase-page'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ArrowLeft } from 'lucide-react'
import { useRoomMembers } from '#/hooks/use-room-members-TEMP'
import { useCreatePurchase } from '#/hooks/use-purchases-TEMP'
import { useProducts } from '#/hooks/use-products-TEMP'
import { PurchaseDetailsCard } from '#/components/app/addPurchase/PurchaseDetailsCard'
import { PurchaseItemsCard } from '#/components/app/addPurchase/PurchaseItemsCard'

export const Route = createFileRoute('/app/add-purchase')({
  component: AddPurchase,
})

function AddPurchase() {
  const { t } = useTranslation()

  const members = useRoomMembers()
  const products = useProducts()
  const createPurchase = useCreatePurchase()

  const currentUser = members.data?.find((member) => member.isCurrentUser)

  const {
    items,
    paidBy,
    setPaidBy,
    purchaseDate,
    setPurchaseDate,
    maxPurchaseDate,
    note,
    setNote,
    updateItem,
    addItem,
    removeItem,
    totalAmount,
    isValid,
    toRequest,
    reset,
  } = useAddPurchasePage(currentUser?.userId)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isValid || createPurchase.isPending) return

    createPurchase.mutate(toRequest(), { onSuccess: reset })
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

      <PurchaseItemsCard
        items={items}
        products={products.data}
        productsLoading={products.isPending}
        productsError={products.isError}
        totalAmount={totalAmount}
        onUpdateItem={updateItem}
        onAddItem={addItem}
        onRemoveItem={removeItem}
      />

      <PurchaseDetailsCard
        members={members.data}
        membersLoading={members.isPending}
        membersError={members.isError}
        paidBy={paidBy}
        onPaidByChange={setPaidBy}
        purchaseDate={purchaseDate}
        maxPurchaseDate={maxPurchaseDate}
        onPurchaseDateChange={setPurchaseDate}
        note={note}
        onNoteChange={setNote}
      />

      {createPurchase.isError && (
        <p role="alert" className="text-sm text-destructive">
          {t('addPurchase.errors.saveFailed')}
        </p>
      )}

      {/* isSuccess resets as soon as the next mutate() starts */}
      {createPurchase.isSuccess && (
        <p role="status" className="text-sm text-green-600">
          {t('addPurchase.saved')}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/app">{t('addPurchase.button.cancel')}</Link>
        </Button>

        <Button
          type="submit"
          disabled={!isValid || createPurchase.isPending}
          className="w-full sm:w-auto"
        >
          <Check />
          {createPurchase.isPending
            ? t('addPurchase.button.saving')
            : `${t('addPurchase.button.save')} · ${totalAmount.toFixed(2)} €`}
        </Button>
      </div>
    </form>
  )
}
