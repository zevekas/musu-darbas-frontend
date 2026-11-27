import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ProductType } from '#/hooks/use-products'

type ProductInfoCardProps = {
  name: string
  onNameChange: (name: string) => void
  type: ProductType
  onTypeChange: (type: ProductType) => void
}

const TYPE_OPTIONS = [
  {
    value: 'QUANTITY',
    title: 'createProduct.info.countable',
    description: 'createProduct.info.countableDescription',
  },
  {
    value: 'STATUS',
    title: 'createProduct.info.notCountable',
    description: 'createProduct.info.notCountableDescription',
  },
] as const

export function ProductInfoCard({
  name,
  onNameChange,
  type,
  onTypeChange,
}: ProductInfoCardProps) {
  const { t } = useTranslation()

  return (
    <Card className="bg-transparent py-0 ring-0 sm:bg-card sm:py-(--card-spacing) sm:ring-1">
      <CardHeader className="px-0 sm:px-(--card-spacing)">
        <CardTitle>{t('createProduct.info.title')}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-0 sm:px-(--card-spacing)">
        <div className="space-y-2">
          <Label htmlFor="product-name">{t('createProduct.info.name')} *</Label>
          <Input
            id="product-name"
            placeholder={t('createProduct.info.namePlaceholder')}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-medium">
            {t('createProduct.info.countingQuestion')} *
          </legend>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TYPE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 border border-input p-3 transition-colors has-checked:border-primary has-checked:bg-primary/10 has-focus-visible:ring-1 has-focus-visible:ring-ring/50"
              >
                <input
                  type="radio"
                  name="product-type"
                  value={option.value}
                  checked={type === option.value}
                  onChange={() => onTypeChange(option.value)}
                  className="mt-0.5 accent-primary"
                />
                <span className="space-y-0.5">
                  <span className="block text-xs font-medium">
                    {t(option.title)}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t(option.description)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </CardContent>
    </Card>
  )
}
