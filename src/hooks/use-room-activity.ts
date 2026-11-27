import { useQuery } from '@tanstack/react-query'
import type { ProductStatus } from './use-products'
import { mockRoomActivityList } from './mock-data-TEMP'

export const ROOM_ACTIVITY_KEY = 'room_activity' as const

export type ActivityItem =
  | {
      id: string
      kind: 'STOCK_UPDATE'
      username: string
      productName: string
      from: number | ProductStatus
      to: number | ProductStatus
      createdAt: string
    }
  | {
      id: string
      kind: 'PURCHASE'
      username: string
      description: string
      total: number
      perPerson: number
      createdAt: string
    }

// TODO: add backend integration
export function useRoomActivity() {
  return useQuery({
    queryKey: [ROOM_ACTIVITY_KEY],
    queryFn: async (): Promise<ActivityItem[]> => {
      // TODO backend: return api.get('/app/room/activity?limit=3').json<ActivityItem[]>()
      return [...mockRoomActivityList]
    },
  })
}
