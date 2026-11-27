import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImagePlus, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type PhotoCardProps = {
  image: File | null
  onImageChange: (image: File | null) => void
}

/** Optional product image with a preview. */
export function PhotoCard({ image, onImageChange }: PhotoCardProps) {
  const { t } = useTranslation()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Temporary local URL so <img> can show the chosen file;
  // freed again when the image changes or the card unmounts
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(image)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [image])

  return (
    <Card className="bg-transparent py-0 ring-0 sm:bg-card sm:py-(--card-spacing) sm:ring-1">
      <CardHeader className="px-0 sm:px-(--card-spacing)">
        <CardTitle>{t('createProduct.photo.title')}</CardTitle>
      </CardHeader>

      <CardContent className="px-0 sm:px-(--card-spacing)">
        {previewUrl ? (
          <div className="space-y-2">
            {/* Same full-width box as the upload area, image shown whole (not cropped) */}
            <div className="relative flex h-48 items-center justify-center border bg-muted/40">
              <img
                src={previewUrl}
                alt={t('createProduct.photo.alt')}
                className="max-h-full max-w-full object-contain"
              />

              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => onImageChange(null)}
                aria-label={t('createProduct.photo.remove')}
                className="absolute top-2 right-2 bg-background"
              >
                <X />
              </Button>
            </div>

            <p className="truncate text-xs text-muted-foreground">
              {image?.name}
            </p>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 border border-dashed p-4 text-muted-foreground hover:bg-muted/50 has-focus-visible:ring-1 has-focus-visible:ring-ring/50">
            <ImagePlus className="size-5 shrink-0" />
            <span>
              <span className="block text-xs font-medium text-foreground">
                {t('createProduct.photo.optional')}
              </span>
              <span className="block text-xs">
                {t('createProduct.photo.upload')}
              </span>
            </span>

            {/* sr-only (not hidden) so it's still reachable with the keyboard */}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                onImageChange(e.target.files?.[0] ?? null)
                // Clear so picking the same file again (after removing it) still fires onChange
                e.target.value = ''
              }}
            />
          </label>
        )}
      </CardContent>
    </Card>
  )
}
