import { useState } from 'react'
import type { CreatePurchaseRequest, PurchaseItem } from '../use-purchases-TEMP'

export type ItemField = keyof PurchaseItem

export type PurchaseItemDraft = { id: number } & Record<ItemField, string>

const today = () => new Date().toLocaleDateString('sv-SE')

const emptyItem = (id: number): PurchaseItemDraft => ({
  id,
  productId: '',
  quantity: '',
  lineTotal: '',
})

const roundMoney = (value: number) => Math.round(value * 100) / 100

export function useAddPurchasePage(defaultPaidBy = '') {
  const [items, setItems] = useState<PurchaseItemDraft[]>([emptyItem(1)])
  const [selectedPaidBy, setPaidBy] = useState('')
  const [purchaseDate, setPurchaseDate] = useState(today)
  const maxPurchaseDate = today()
  const [note, setNote] = useState('')

  const paidBy = selectedPaidBy || defaultPaidBy

  function updateItem(id: number, field: ItemField, value: string) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    )
  }

  function addItem() {
    setItems((prevItems) => [
      ...prevItems,
      emptyItem(Math.max(0, ...prevItems.map((item) => item.id)) + 1),
    ])
  }

  function removeItem(id: number) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const totalAmount = roundMoney(
    items.reduce((total, item) => total + (Number(item.lineTotal) || 0), 0),
  )

  const isValid =
    items.length > 0 &&
    items.every(
      (item) =>
        item.productId !== '' &&
        Number(item.quantity) >= 1 &&
        Number.isInteger(Number(item.quantity)) &&
        Number(item.lineTotal) >= 0.01,
    ) &&
    paidBy !== '' &&
    purchaseDate !== '' &&
    purchaseDate <= maxPurchaseDate

  function toRequest(): CreatePurchaseRequest {
    return {
      paidByUserId: paidBy,
      purchaseDate,
      note: note.trim() || undefined,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity),
        lineTotal: roundMoney(Number(item.lineTotal)),
      })),
    }
  }

  function reset() {
    setItems([emptyItem(1)])
    setPaidBy('')
    setPurchaseDate(today())
    setNote('')
  }

  return {
    items,
    paidBy,
    setPaidBy,
    purchaseDate,
    setPurchaseDate,
    maxPurchaseDate,
    note,
    setNote,
    updateItem,
    addItem,
    removeItem,
    totalAmount,
    isValid,
    toRequest,
    reset,
  }
}
