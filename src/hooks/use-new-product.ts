import { useApi } from '@/api/api-provider.tsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const PRODUCTS_KEY = 'products' as const

export type ProductType = 'QUANTITY' | 'STATUS'
export type ProductStatus = 'FULL' | 'HALF' | 'QUARTER' | 'EMPTY'

export const PRODUCT_STATUSES: ProductStatus[] = [
  'FULL',
  'HALF',
  'QUARTER',
  'EMPTY',
]

export type ProductResponse = {
  id: string
  name: string
  type: ProductType
  status: ProductStatus | null
  amount: number | null
  imageUrl: string | null
}

export type ProductRequest = {
  name: string
  type: ProductType
  status: ProductStatus | null
  amount: number | null
  photo: File | null
}

export function useProducts() {
  const api = useApi()
  const queryClient = useQueryClient()

  const getProducts = useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: () => api.get('/app/products').json<ProductResponse[]>(),
  })

  const createProduct = useMutation({
    mutationFn: async ({ photo, ...product }: ProductRequest) => {
      let imageUrl: string | null = null

      if (photo) {
        const body = new FormData()
        body.append('file', photo)

        const uploaded = await api
          .post('/app/files', { body })
          .json<{ url: string }>()
        imageUrl = uploaded.url
      }

      return api.post('/app/products', { json: { ...product, imageUrl } })
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })

  return {
    getProducts,
    createProduct,
  }
}
