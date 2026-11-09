import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/Header'
import { Footer } from '#/components/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Footer />
    </div>
  )
}
