import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@clerk/react'
import { useUserData } from '#/hooks/use-user-data.ts'
import { UserDataForm } from '#/components/app/UserDataForm.tsx'
import { useState } from 'react'
import { AppHeader } from '#/components/AppHeader'
import { AppFooter } from '#/components/AppFooter'
import AppSidebar from '#/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '#/components/ui/sidebar'

export const Route = createFileRoute('/app')({ component: AppLayout })

function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  const { getUserData, saveUserData } = useUserData()
  const [error, setError] = useState<string | null>(null)

  const { data, isPending, isError } = getUserData

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <Navigate to="/" />

  if (isPending) return <div>Loading user data...</div>
  if (isError) return <div>An error occurred</div>

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <Header />
      {!data.username ? (
        <UserDataForm
          submitting={saveUserData.isPending}
          error={error}
          onSubmit={(values) => {
            setError(null)
            saveUserData.mutate(
              {
                username: values.username,
                dorm: values.dormId,
                room: values.roomNumber,
              },
              {
                onError: () => setError('Could not save'),
              },
            )
          }}
        />
      ) : (
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
      )}
      <Footer />
    </div>
  )
}
