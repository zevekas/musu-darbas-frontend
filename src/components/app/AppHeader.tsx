import { Button } from '#/components/ui/button.tsx'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { CircleHelp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Header } from '#/components/Header'

export function AppHeader() {
  const { t } = useTranslation()
  return (
    <Header
      actions={
        <Button variant="ghost">
          <CircleHelp />
          <span className="hidden sm:inline">{t('nav.header.help')}</span>
        </Button>
      }
    >
      <SidebarTrigger />
      <div className="flex items-baseline gap-1.5 text-sm">
        <span className="font-medium">{t('nav.room', { room: 204 })}</span>
        <span className="text-muted-foreground text-xs">• Didlaukio g. 59</span>
      </div>
    </Header>
  )
}
