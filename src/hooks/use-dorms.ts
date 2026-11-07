import { useApi } from '@/api/api-provider.tsx'
import { useQuery } from '@tanstack/react-query'

export const DORM_KEY = 'dorm_data' as const

export type DormDataResponse = {
  dorms: Dorm[]
}

export type Dorm = {
  id: string
  address: string
}

export function useDorms() {
  const api = useApi()
  return useQuery({
    queryKey: [DORM_KEY],
    queryFn: () => api.get(`/app/dorm`).json<DormDataResponse>(),
  })
}
