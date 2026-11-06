import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppHeader } from '#/components/AppHeader'
import { AppFooter } from '#/components/AppFooter'
import AppSidebar from '#/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '#/components/ui/sidebar'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-h-svh">
            <AppHeader />
            <div className="flex-1 p-4">
              <Outlet />
            </div>
            <AppFooter />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </>
  )
}
