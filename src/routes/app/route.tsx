import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@clerk/react'
import { Header } from '#/components/header.tsx'
import { Footer } from '@/components/footer.tsx'

export const Route = createFileRoute('/app')({ component: AppLayout })

function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <Navigate to="/" />

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
