import { useQuery } from '@tanstack/react-query'
import { mockRoomMemberBalances, mockRoomMembers } from './mock-data-TEMP'

export const ROOM_MEMBER_KEY = 'room_member' as const
export const ROOM_BALANCES_KEY = 'room_balances' as const

export type RoomMember = {
  userId: string
  username: string
  isCurrentUser: boolean
}

/** Room member with their share of the room's expenses. */
export type RoomMemberBalance = RoomMember & {
  roomNumber: string
  balance: number
}

export function useRoomMembers() {
  return useQuery({
    queryKey: [ROOM_MEMBER_KEY],
    queryFn: async (): Promise<RoomMember[]> => {
      // TODO backend: return api.get('/app/room/members').json<RoomMember[]>()
      return [...mockRoomMembers]
    },
  })
}

export function useRoomBalances() {
  return useQuery({
    queryKey: [ROOM_BALANCES_KEY],
    queryFn: async (): Promise<RoomMemberBalance[]> => {
      // TODO backend: return api.get('/app/room/balances').json<RoomMemberBalance[]>()
      return [...mockRoomMemberBalances]
    },
  })
}
