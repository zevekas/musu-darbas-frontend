import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@clerk/react'
import { AppHeader } from '#/components/AppHeader'
import { AppFooter } from '#/components/AppFooter'
import AppSidebar from '#/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '#/components/ui/sidebar'

export const Route = createFileRoute('/app')({ component: AppLayout })

function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <Navigate to="/" />

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
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
  )
}
