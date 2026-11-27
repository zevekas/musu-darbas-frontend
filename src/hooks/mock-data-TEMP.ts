import type { ActivityItem } from './use-room-activity'
import type { Product } from './use-products'
import type { RoomMember, RoomMemberBalance } from './use-room-members'
import type { RoomProduct } from './use-room-products'
import type { RoomExpenses } from './use-purchases'

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString()

export const mockRoomActivityList: ActivityItem[] = [
  {
    id: 'a1',
    kind: 'STOCK_UPDATE',
    username: 'Vilius',
    productName: 'Kiaušiniai',
    from: 6,
    to: 3,
    createdAt: minutesAgo(25),
  },
  {
    id: 'a2',
    kind: 'PURCHASE',
    username: 'Vykintas',
    description: '12 tualetinio popieriaus rulonų',
    total: 6,
    perPerson: 1.5,
    createdAt: minutesAgo(180),
  },
  {
    id: 'a3',
    kind: 'STOCK_UPDATE',
    username: 'Kipras',
    productName: 'Pienas',
    from: 1,
    to: 0,
    createdAt: minutesAgo(240),
  },
]

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Tualetinis popierius', type: 'QUANTITY' },
  { id: 'p2', name: 'Kiaušiniai', type: 'QUANTITY' },
  { id: 'p3', name: 'Indų ploviklis', type: 'STATUS' },
  { id: 'p4', name: 'Pienas', type: 'QUANTITY' },
  { id: 'p5', name: 'Makaronai', type: 'QUANTITY' },
]

export const mockMonthExpense: RoomExpenses = {
  month: new Date().getMonth() + 1,
  total: 84,
  memberCount: 4,
  perPerson: 21,
}

export const mockRoomMembers: RoomMember[] = [
  { userId: 'u1', username: 'Matas', isCurrentUser: true },
  { userId: 'u2', username: 'Vykintas', isCurrentUser: false },
  { userId: 'u3', username: 'Kipras', isCurrentUser: false },
]

export const mockRoomMemberBalances: RoomMemberBalance[] = [
  {
    userId: 'u1',
    username: 'Matas',
    roomNumber: '204',
    balance: -6,
    isCurrentUser: true,
  },
  {
    userId: 'u2',
    username: 'Vykintas',
    roomNumber: '203',
    balance: 18,
    isCurrentUser: false,
  },
  {
    userId: 'u3',
    username: 'Kipras',
    roomNumber: '204',
    balance: -9,
    isCurrentUser: false,
  },
  {
    userId: 'u4',
    username: 'Vilius',
    roomNumber: '203',
    balance: -3,
    isCurrentUser: false,
  },
]

export const mockRoomProducts: RoomProduct[] = [
  {
    id: 'rp1',
    productId: 'p1',
    name: 'Tualetinis popierius',
    type: 'QUANTITY',
    imageUrl: null,
    amount: 8,
    status: 'FULL',
    updatedAt: minutesAgo(120),
  },
  {
    id: 'rp2',
    productId: 'p2',
    name: 'Kiaušiniai',
    type: 'QUANTITY',
    imageUrl: null,
    amount: 3,
    status: 'QUARTER',
    updatedAt: minutesAgo(25),
  },
  {
    id: 'rp3',
    productId: 'p3',
    name: 'Indų ploviklis',
    type: 'STATUS',
    imageUrl: null,
    amount: null,
    status: 'FULL',
    updatedAt: minutesAgo(60 * 20),
  },
  {
    id: 'rp4',
    productId: 'p4',
    name: 'Pienas',
    type: 'QUANTITY',
    imageUrl: null,
    amount: 0,
    status: 'EMPTY',
    updatedAt: minutesAgo(200),
  },
  {
    id: 'rp5',
    productId: 'p5',
    name: 'Makaronai',
    type: 'QUANTITY',
    imageUrl: null,
    amount: 2,
    status: 'FULL',
    updatedAt: minutesAgo(60 * 22),
  },
  {
    id: 'rp6',
    productId: 'p6',
    name: 'Šiukšlių maišai',
    type: 'QUANTITY',
    imageUrl: null,
    amount: 14,
    status: 'FULL',
    updatedAt: minutesAgo(60 * 48),
  },
  {
    id: 'rp7',
    productId: 'p7',
    name: 'Skalbiklis',
    type: 'STATUS',
    imageUrl: null,
    amount: null,
    status: 'HALF',
    updatedAt: minutesAgo(60 * 72),
  },
]
