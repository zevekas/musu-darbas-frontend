import { useQuery } from '@tanstack/react-query'

export const ROOM_MEMBER_KEY = 'room_member' as const

export type RoomMember = {
  userId: string
  username: string
  isCurrentUser: boolean
}

export function useRoomMembers() {
  return useQuery({
    queryKey: [ROOM_MEMBER_KEY],
    queryFn: async (): Promise<RoomMember[]> => {
      // TODO backend: return api.get('/app/room/members').json<RoomMember[]>()
      return [
        { userId: 'u1', username: 'Matas', isCurrentUser: true },
        { userId: 'u2', username: 'Vykintas', isCurrentUser: false },
        { userId: 'u3', username: 'Kipras', isCurrentUser: false },
      ]
    },
  })
}
