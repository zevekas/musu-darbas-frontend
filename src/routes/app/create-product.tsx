import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

export interface Product {
  id: string
  name: string
  isCountable: boolean
  unit: string
  photo: File | null
}

interface ProductCreationProps {
  onCreate?: (product: Product) => void
}

export const Route = createFileRoute('/app/create-product')({
  component: CreateProduct,
})
export default function CreateProduct({ onCreate }: ProductCreationProps) {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [isCountable, setIsCountable] = useState(true)
  const [unit, setUnit] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState('')

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
    setUnit('')
    setPhoto(null)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || (isCountable && !unit.trim())) return

    const product: Product = {
      id: crypto.randomUUID(),
      name: name.trim(),
      isCountable,
      unit: isCountable ? unit.trim() : '',
      photo,
    }

    onCreate?.(product)
    resetForm()
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

          {isCountable && (
            <div className="space-y-2">
              <label htmlFor="product-unit">{t('productForm.unit')} *</label>
              <input
                id="product-unit"
                className="w-full rounded-md border p-3"
                type="text"
                placeholder={t('productForm.unitPlaceholder')}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
              />
            </div>
          )}
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
            className="rounded-md bg-primary px-5 py-2 text-primary-foreground"
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
