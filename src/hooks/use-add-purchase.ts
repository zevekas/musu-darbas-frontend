import { useState } from 'react'

type PurchaseItem = {
  id: number
  productName: string
  quantity: string
  amount: string
}

export function useAddPurchase() {
  const [items, setItems] = useState<PurchaseItem[]>([
    {
      id: 1,
      productName: '',
      quantity: '',
      amount: '',
    },
  ])

  const [paidBy, setPaidBy] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(() =>
    new Date().toLocaleDateString('sv-SE'),
  )
  const [spaceId, setSpaceId] = useState('')
  const [note, setNote] = useState('')

  function updateItem(
    id: number,
    field: 'productName' | 'quantity' | 'amount',
    value: string,
  ) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    )
  }

  function addItem() {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Math.max(0, ...prevItems.map((item) => item.id)) + 1,
        productName: '',
        quantity: '',
        amount: '',
      },
    ])
  }

  function removeItem(id: number) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const totalAmount = items.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0,
  )

  const isValid =
    items.length > 0 &&
    items.every(
      (item) =>
        item.productName.trim() !== '' &&
        Number(item.quantity) >= 1 &&
        Number.isInteger(Number(item.quantity)) &&
        Number(item.amount) >= 0.01,
    ) &&
    paidBy !== '' &&
    purchaseDate !== '' &&
    spaceId !== ''

  return {
    items,
    paidBy,
    setPaidBy,
    purchaseDate,
    setPurchaseDate,
    spaceId,
    setSpaceId,
    note,
    setNote,
    updateItem,
    addItem,
    removeItem,
    totalAmount,
    isValid,
  }
}
