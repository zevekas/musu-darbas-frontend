import { useMutation, useQueryClient } from '@tanstack/react-query'

export type PurchaseItem = {
  productId: string
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

export function useCreatePurchase() {
  const queryClient = useQueryClient()

  return useMutation({
    // `_request` until the backend call uses it (rename back to `request` then)
    mutationFn: async (_request: CreatePurchaseRequest) => {
      // TODO backend: return api.post('/app/purchases', { json: request })
    },

    onSuccess: () => {
      void queryClient.invalidateQueries() // refetch everything as modifies almost everything
    },
  })
}
