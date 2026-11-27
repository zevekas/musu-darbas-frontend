import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const PRODUCTS_KEY = 'products' as const

/** How a product is tracked: by count (6 rolls) or by status (Half full). */
export type ProductType = 'QUANTITY' | 'STATUS'

/** How much is left of a STATUS product in a room. */
export type ProductStatus = 'FULL' | 'HALF' | 'QUARTER' | 'EMPTY'

export const PRODUCT_STATUSES: ProductStatus[] = [
  'FULL',
  'HALF',
  'QUARTER',
  'EMPTY',
]

/** Product: a shared product type (template), not stock. */
export type Product = {
  id: string
  name: string
  type: ProductType
}

/** Room product: a Product placed in a room, with its current stock. */
export type RoomProduct = {
  id: string
  productId: string
  name: string
  type: ProductType
  amount: number | null // QUANTITY product only
  status: ProductStatus | null // STATUS product only
}

/** Exactly what POST /app/products receives (JSON). */
export type CreateProductRequest = {
  name: string
  type: ProductType
  // Both null = only create the product, don't add it to the room
  amount: number | null
  status: ProductStatus | null
  /** URL returned by POST /app/files, or null if no image. */
  imageUrl: string | null
}

/**
 * What the create form hands to useCreateProduct: the request fields,
 * but with the image file instead of imageUrl (uploaded first by the hook).
 */
export type CreateProductInput = Omit<CreateProductRequest, 'imageUrl'> & {
  image: File | null
}

const mockProducts: Product[] = [
  { id: 'p1', name: 'Tualetinis popierius', type: 'QUANTITY' },
  { id: 'p2', name: 'Kiaušiniai', type: 'QUANTITY' },
  { id: 'p3', name: 'Indų ploviklis', type: 'STATUS' },
  { id: 'p4', name: 'Pienas', type: 'QUANTITY' },
  { id: 'p5', name: 'Makaronai', type: 'QUANTITY' },
]

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
      // 1. Upload the image first (if one was chosen) to get its URL
      let imageUrl: string | null = null

      if (input.image) {
        // TODO backend:
        //   const body = new FormData()
        //   body.append('file', input.image)
        //   imageUrl = (await api.post('/app/files', { body }).json<{ url: string }>()).url
        imageUrl = `mock://uploads/${input.image.name}`
      }

      // 2. Create the product (JSON) with the uploaded image's URL
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
    },
  })
}
