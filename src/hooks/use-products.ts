import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ROOM_PRODUCTS_KEY } from './use-room-products'
import { mockProducts } from './mock-data-TEMP'

export const PRODUCTS_KEY = 'products' as const

export type ProductType = 'QUANTITY' | 'STATUS'
export type ProductStatus = 'FULL' | 'HALF' | 'QUARTER' | 'EMPTY'

export const PRODUCT_STATUSES: ProductStatus[] = [
  'FULL',
  'HALF',
  'QUARTER',
  'EMPTY',
]

export type Product = {
  id: string
  name: string
  type: ProductType
}

export type CreateProductRequest = {
  name: string
  type: ProductType
  amount: number | null
  status: ProductStatus | null
  imageUrl: string | null
}

export type CreateProductInput = Omit<CreateProductRequest, 'imageUrl'> & {
  image: File | null
}

// TODO: add backend integration
export function useProducts() {
  return useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: async (): Promise<Product[]> => {
      // TODO backend: return api.get('/app/products').json<Product[]>()
      return [...mockProducts]
    },
  })
}

// TODO: add backend integration
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateProductInput): Promise<Product> => {
      let imageUrl: string | null = null

      if (input.image) {
        // TODO backend:
        //   const body = new FormData()
        //   body.append('file', input.image)
        //   imageUrl = (await api.post('/app/files', { body }).json<{ url: string }>()).url
        imageUrl = `mock://uploads/${input.image.name}`
      }

      const request: CreateProductRequest = {
        name: input.name,
        type: input.type,
        amount: input.amount,
        status: input.status,
        imageUrl,
      }

      // TODO backend: return api.post('/app/products', { json: request }).json<Product>()
      const created: Product = {
        id: crypto.randomUUID(),
        name: request.name,
        type: request.type,
      }
      mockProducts.push(created)
      return created
    },

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
      void queryClient.invalidateQueries({ queryKey: [ROOM_PRODUCTS_KEY] })
    },
  })
}
