import { SidebarTrigger } from '#/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { useUserData } from '#/hooks/use-user-data'

import { Header } from '#/components/Header'

export function AppHeader() {
  const { t } = useTranslation()

  const { getUserData } = useUserData()
  const { data, isPending, isError } = getUserData

  return (
    <Header showDashboardLink={false}>
      <SidebarTrigger />
      {/* Mobile: room above a one-line dorm. sm and up: side by side */}
      <div className="flex min-w-0 flex-col text-sm sm:flex-row sm:items-baseline sm:gap-1.5">
        {!isPending && !isError && (
          <>
            <span className="truncate font-medium">
              {t('nav.room', { room: data.room })}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              <span className="hidden sm:inline">• </span>
              {data.dorm}
            </span>
          </>
        )}
      </div>
    </Header>
  )
}
