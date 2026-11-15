import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import ProductCreationForm from '#/components/app/ProductCreationForm'

export const Route = createFileRoute('/app/')({
  validateSearch: (search: Record<string, unknown>) => ({
    view:
      search.view === 'add-purchase' ? ('add-purchase' as const) : undefined,
  }),
  component: DashboardPage,
})

function DashboardPage() {
  const { view } = Route.useSearch()
  const { t } = useTranslation()

  return (
    <div className="w-full">
      {view === 'add-purchase' ? (
        <>
          <Link
            to="/app"
            search={{}}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t('nav.overview')}
          </Link>
          <ProductCreationForm />
        </>
      ) : (
        <h2 className="text-2xl font-semibold">
          {t('dash.placeholderContent')}
        </h2>
      )}
    </div>
  )
}
