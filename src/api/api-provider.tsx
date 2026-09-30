import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import type { KyInstance } from 'ky'
import ky from 'ky'
import { useAuth } from '@clerk/react'

const ApiContext = createContext<KyInstance>(null!)

export function ApiProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  const api = useMemo(
    () =>
      ky.create({
        prefix: '/api',
        timeout: 30000,
        retry: { limit: 0 },
        hooks: {
          beforeRequest: [
            async (before) => {
              const token = await auth.getToken({ template: 'default' })
              if (token) {
                before.request.headers.set('Authorization', `Bearer ${token}`)
              }
            },
          ],
        },
      }),
    [auth],
  )

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext)
