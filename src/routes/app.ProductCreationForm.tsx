import { createFileRoute } from '@tanstack/react-router'
import ProductCreationForm from '#/components/app/ProductCreationForm'

export const Route = createFileRoute('/app/ProductCreationForm')({
  component: ProductCreationForm,
})
