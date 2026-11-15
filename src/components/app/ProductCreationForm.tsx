import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

export interface Product {
  id: string
  name: string
  category: string
  unit: string
  photo: File | null
}

interface ProductCreationProps {
  onCreate?: (product: Product) => void
}

export default function ProductCreationForm({
  onCreate,
}: ProductCreationProps) {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
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
    setCategory('')
    setUnit('')
    setPhoto(null)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !category || !unit.trim()) return

    const product: Product = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      unit: unit.trim(),
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
            <label htmlFor="product-category">
              {t('productForm.category')} *
            </label>
            <select
              id="product-category"
              className="w-full rounded-md border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">{t('productForm.selectCategory')}</option>
              <option value="Maistas">
                {t('productForm.categories.food')}
              </option>
              <option value="Gėrimai">
                {t('productForm.categories.drinks')}
              </option>
              <option value="Valymo priemonės">
                {t('productForm.categories.cleaning')}
              </option>
              <option value="Higiena">
                {t('productForm.categories.hygiene')}
              </option>
              <option value="Kita">{t('productForm.categories.other')}</option>
            </select>
          </div>

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
