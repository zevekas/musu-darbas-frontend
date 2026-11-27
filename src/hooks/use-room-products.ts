import { useQuery } from '@tanstack/react-query'
import type { ProductStatus, ProductType } from './use-products'
import { mockRoomProducts } from './mock-data-TEMP'

export const ROOM_PRODUCTS_KEY = 'room_products' as const

export type RoomProduct = {
  id: string
  productId: string
  name: string
  type: ProductType
  imageUrl: string | null
  amount: number | null // QUANTITY product only
  status: ProductStatus
  updatedAt: string
}

// TODO: add backend integration
export function useRoomProducts() {
  return useQuery({
    queryKey: [ROOM_PRODUCTS_KEY],
    queryFn: async (): Promise<RoomProduct[]> => {
      // TODO backend: return api.get('/app/room/products').json<RoomProduct[]>()
      return [...mockRoomProducts]
    },
  })
}
