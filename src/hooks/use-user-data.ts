import { useApi } from '@/api/api-provider.tsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const USER_DATA_KEY = 'user_data' as const

export type UserDataResponse = {
  username: string | undefined
  dorm: string | undefined
  room: string | undefined
}

export type UserDataRequest = {
  username: string
  dorm: string
  room: string
}

export function useUserData() {
  const api = useApi()
  const queryClient = useQueryClient()

  const getUserData = useQuery({
    queryKey: [USER_DATA_KEY],
    queryFn: () => api.get(`/app/user`).json<UserDataResponse>(),
  })

  const saveUserData = useMutation({
    mutationFn: (request: UserDataRequest) =>
      api.patch(`/app/user`, {
        json: request,
      }),

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [USER_DATA_KEY] })
    },
  })

  return {
    getUserData,
    saveUserData,
  }
}
