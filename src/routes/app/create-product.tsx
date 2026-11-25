import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { PRODUCT_STATUSES, useProducts } from '@/hooks/use-new-product'
import type { ProductStatus } from '@/hooks/use-new-product'

export const Route = createFileRoute('/app/create-product')({
  component: CreateProduct,
})

export default function CreateProduct() {
  const { t } = useTranslation()
  const { createProduct } = useProducts()

  const [name, setName] = useState('')
  const [isCountable, setIsCountable] = useState(true)
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [addToRoom, setAddToRoom] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [status, setStatus] = useState<ProductStatus>('FULL')

  useEffect(() => {
    if (!photo) {
      setPreview('')
      return
    }

    const url = URL.createObjectURL(photo)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [photo])

  const resetForm = () => {
    setName('')
    setIsCountable(true)
    setPhoto(null)
    setAddToRoom(false)
    setQuantity('1')
    setStatus('FULL')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createProduct.mutate(
      {
        name: name.trim(),
        type: isCountable ? 'QUANTITY' : 'STATUS',
        status: addToRoom && !isCountable ? status : null,
        amount: addToRoom && isCountable ? Number(quantity) : null,
        photo,
      },
      { onSuccess: resetForm },
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">{t('productForm.title')}</h2>
        <p className="text-muted-foreground mt-2">
          {t('productForm.description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-lg font-medium">
            {t('productForm.mainInformation')}
          </h3>

          <div className="space-y-2">
            <label htmlFor="product-name">{t('productForm.name')} *</label>
            <input
              id="product-name"
              className="w-full rounded-md border p-3"
              type="text"
              placeholder={t('productForm.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <p>{t('productForm.countingQuestion')} *</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 ${
                  isCountable ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <input
                  type="radio"
                  name="counting-method"
                  checked={isCountable}
                  onChange={() => setIsCountable(true)}
                />
                <span>
                  <strong className="block">
                    {t('productForm.countable')}
                  </strong>
                  <small className="text-muted-foreground">
                    {t('productForm.countableDescription')}
                  </small>
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 ${
                  !isCountable ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <input
                  type="radio"
                  name="counting-method"
                  checked={!isCountable}
                  onChange={() => setIsCountable(false)}
                />
                <span>
                  <strong className="block">
                    {t('productForm.notCountable')}
                  </strong>
                  <small className="text-muted-foreground">
                    {t('productForm.notCountableDescription')}
                  </small>
                </span>
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-medium">{t('productForm.photo')}</h3>

          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
            {preview ? (
              <img
                src={preview}
                alt={t('productForm.photoAlt')}
                className="max-h-48 rounded-md object-contain"
              />
            ) : (
              <>
                <span className="text-3xl">＋</span>
                <strong>{t('productForm.photoOptional')}</strong>
                <small>{t('productForm.uploadPhoto')}</small>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              disabled
              hidden
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            />
          </label>

          {photo && (
            <button
              type="button"
              className="text-sm text-destructive"
              onClick={() => setPhoto(null)}
            >
              {t('productForm.removePhoto')}
            </button>
          )}
        </section>

        <section className="rounded-xl border p-4 space-y-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={addToRoom}
              onChange={(e) => setAddToRoom(e.target.checked)}
            />
            <span>{t('productForm.addToRoom')}</span>
          </label>

          {addToRoom && (
            <div className="space-y-2 border-t pt-4">
              {isCountable ? (
                <>
                  <label htmlFor="product-quantity">
                    {t('productForm.quantity')} *
                  </label>
                  <input
                    id="product-quantity"
                    type="number"
                    min={1}
                    className="w-full rounded-md border p-3 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    onWheel={(e) => e.currentTarget.blur()}
                    required
                  />
                </>
              ) : (
                <>
                  <label htmlFor="product-status">
                    {t('productForm.status')} *
                  </label>
                  <select
                    id="product-status"
                    className="w-full rounded-md border p-3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus)}
                  >
                    {PRODUCT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {t(`productForm.statusOptions.${s}`)}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <small className="text-muted-foreground">
                {t('productForm.quantityHint')}
              </small>
            </div>
          )}
        </section>

        {createProduct.isError && (
          <p className="text-sm text-destructive">
            {t('productForm.submitError')}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-md border px-5 py-2"
            onClick={resetForm}
          >
            {t('productForm.cancel')}
          </button>

          <button
            type="submit"
            disabled={createProduct.isPending}
            className="rounded-md bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
          >
            {t('productForm.create')}
          </button>
        </div>

        <small className="text-muted-foreground">
          {t('productForm.requiredFields')}
        </small>
      </form>
    </div>
  )
}
