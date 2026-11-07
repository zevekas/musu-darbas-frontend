import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/react'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}
