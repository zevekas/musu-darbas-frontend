import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/header.tsx'
import { Footer } from '@/components/footer.tsx'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <Footer />
      </div>
    </>
  )
}
