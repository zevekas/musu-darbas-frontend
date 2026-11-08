import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '#/components/AppHeader'
import { AppFooter } from '#/components/AppFooter'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <AppHeader />
      <AppFooter />
    </div>
  )
}
