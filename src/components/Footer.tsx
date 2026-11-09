import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <>
      <footer className="text-muted-foreground bg-background border-t px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span>© 2026 BarakOK</span>
          <div className="flex items-center gap-4">
            <Button variant="link">{t('nav.footer.privacyPolicy')}</Button>
            <Button variant="link">{t('nav.footer.termsAndConditions')}</Button>
          </div>
        </div>
      </footer>
    </>
  )
}
