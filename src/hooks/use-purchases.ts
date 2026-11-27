import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mockMonthExpense } from './mock-data-TEMP'

export const ROOM_EXPENSES_KEY = 'room_expenses' as const

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

/** The room's expenses for the current month. */
export type RoomExpenses = {
  month: number // 1-12
  total: number
  memberCount: number
  perPerson: number
}

// TODO: add backend integration
export function useRoomExpenses() {
  return useQuery({
    queryKey: [ROOM_EXPENSES_KEY],
    queryFn: async (): Promise<RoomExpenses> => {
      // TODO backend: return api.get('/app/room/expenses/current-month').json<RoomExpenses>()
      return mockMonthExpense
    },
  })
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
