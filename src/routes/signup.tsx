import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/react'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
