import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type Product = {
  id: string
  name: string
}

export type PurchaseItem = {
  roomProductId: string
  quantity: number
  lineTotal: number // total for the whole line
}

export type CreatePurchaseRequest = {
  paidByUserId: string
  purchaseDate: string
  note?: string
  items: PurchaseItem[]
}

export type CreatePurchaseResponse = {
  id: string
  total: number
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      // TODO backend: return api.get('/app/products').json<Product[]>()
      return [
        { id: 'p1', name: 'Tualetinis popierius' },
        { id: 'p2', name: 'Kiaušiniai' },
        { id: 'p3', name: 'Indų ploviklis' },
        { id: 'p4', name: 'Pienas' },
        { id: 'p5', name: 'Makaronai' },
      ]
    },
  })
}

export function useCreatePurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: CreatePurchaseRequest) => {
      // TODO backend: return api.post('/app/purchases', { json: request })
      console.log('[mock] POST /app/purchases', request)
    },

    onSuccess: () => {
      void queryClient.invalidateQueries() // refetch everything as modifies almost everything
    },
  })
}
