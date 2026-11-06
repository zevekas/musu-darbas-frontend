import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@clerk/react'
import { AppHeader } from '#/components/AppHeader'
import { AppFooter } from '#/components/AppFooter'

export const Route = createFileRoute('/app')({ component: AppLayout })

function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <Navigate to="/" />

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  )
}
