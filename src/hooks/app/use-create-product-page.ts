import type {
  CreateProductInput,
  ProductStatus,
  ProductType,
} from '../use-products'
import { useState } from 'react'

export function useCreateProductPage() {
  const [name, setName] = useState('')
  const [type, setType] = useState<ProductType>('QUANTITY')
  const [addToRoom, setAddToRoom] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [status, setStatus] = useState<ProductStatus>('FULL')
  const [image, setImage] = useState<File | null>(null)

  const quantityValid =
    Number(quantity) >= 1 && Number.isInteger(Number(quantity))

  const isValid =
    name.trim() !== '' && (!addToRoom || type === 'STATUS' || quantityValid)

  function toRequest(): CreateProductInput {
    return {
      name: name.trim(),
      type,
      amount: addToRoom && type === 'QUANTITY' ? Number(quantity) : null,
      status: addToRoom && type === 'STATUS' ? status : null,
      image,
    }
  }

  function reset() {
    setName('')
    setType('QUANTITY')
    setAddToRoom(false)
    setQuantity('1')
    setStatus('FULL')
    setImage(null)
  }

  return {
    name,
    setName,
    type,
    setType,
    addToRoom,
    setAddToRoom,
    quantity,
    setQuantity,
    status,
    setStatus,
    image,
    setImage,
    isValid,
    toRequest,
    reset,
  }
}
