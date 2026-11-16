import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import '../styles.css'
import { ClerkProvider } from '@clerk/react'
import { ApiProvider } from '@/api/api-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { clerkLocalizationLT } from '../lib/clerk/localization/lt'
import { clerkLocalizationEN } from '../lib/clerk/localization/en'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function RootComponent() {
  const { i18n } = useTranslation()

  return (
    <>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        localization={i18n.resolvedLanguage?.startsWith('en') ? clerkLocalizationEN : clerkLocalizationLT}
      >
        <ApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </ApiProvider>
      </ClerkProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
