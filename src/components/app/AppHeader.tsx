import { Button } from '#/components/ui/button.tsx'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { CircleHelp } from 'lucide-react'

import { Header } from '#/components/Header'

export function AppHeader() {
  return (
    <Header actions={
      <Button variant="ghost">
        <CircleHelp />
        <span className="hidden sm:inline">Pagalba</span>
      </Button>
    }>
      <SidebarTrigger />
      <div className="flex items-baseline gap-1.5 text-sm">
        <span className="font-medium">Kambarys 204</span>
        <span className="text-muted-foreground text-xs">
          • Didlaukio g. 59
        </span>
      </div>
    </Header>
  )
}
