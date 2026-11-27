import type { FormEvent } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateProduct } from '#/hooks/use-products-TEMP'
import { useCreateProductPage } from '#/hooks/app/use-create-product-page'
import { ProductInfoCard } from '#/components/app/createProduct/ProductInfoCard'
import { PhotoCard } from '#/components/app/createProduct/PhotoCard'
import { AddToRoomCard } from '#/components/app/createProduct/AddToRoomCard'

export const Route = createFileRoute('/app/create-product')({
  component: CreateProduct,
})

function CreateProduct() {
  const { t } = useTranslation()
  const createProduct = useCreateProduct()

  const {
    name,
    setName,
    type,
    setType,
    addToRoom,
    setAddToRoom,
    quantity,
    setQuantity,
    status,
    setStatus,
    image,
    setImage,
    isValid,
    toRequest,
    reset,
  } = useCreateProductPage()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isValid || createProduct.isPending) return

    createProduct.mutate(toRequest(), { onSuccess: reset })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Link
          to="/app/add-purchase"
          className="inline-flex items-center gap-2 text-[13px] leading-none font-medium text-muted-foreground hover:text-foreground uppercase"
        >
          <ArrowLeft className="size-3.5 shrink-0" />
          <span>{t('createProduct.back')}</span>
        </Link>

        <h1 className="text-2xl font-medium">{t('createProduct.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('createProduct.description')}
        </p>
      </div>

      <ProductInfoCard
        name={name}
        onNameChange={setName}
        type={type}
        onTypeChange={setType}
      />

      <PhotoCard image={image} onImageChange={setImage} />

      <AddToRoomCard
        addToRoom={addToRoom}
        onAddToRoomChange={setAddToRoom}
        type={type}
        quantity={quantity}
        onQuantityChange={setQuantity}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Result messages */}
      {createProduct.isError && (
        <p role="alert" className="text-sm text-destructive">
          {t('createProduct.errors.createFailed')}
        </p>
      )}

      {createProduct.isSuccess && (
        <p role="status" className="text-sm text-green-600">
          {t('createProduct.created', { name: createProduct.data.name })}
        </p>
      )}

      {/* Mobile: full-width buttons, Create on top. Desktop: Cancel left, Create right. */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/app/add-purchase">{t('createProduct.button.cancel')}</Link>
        </Button>

        <Button
          type="submit"
          disabled={!isValid || createProduct.isPending}
          className="w-full sm:w-auto"
        >
          <Check />
          {createProduct.isPending
            ? t('createProduct.button.creating')
            : t('createProduct.button.create')}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {t('createProduct.requiredFields')}
      </p>
    </form>
  )
}
