import { useMemo, useState } from 'react'
import type { ProductStatus } from '../use-products'
import type { RoomProduct } from '../use-room-products'

export const TOP_PRODUCTS_COUNT = 6

// Most urgent first, so the "top" items are the ones that need attention
const URGENCY: Record<ProductStatus, number> = {
  EMPTY: 0,
  QUARTER: 1,
  HALF: 2,
  FULL: 3,
}

export function useDashboardPage(products: RoomProduct[] = []) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const sortedProducts = useMemo(
    () =>
      [...products].sort(
        (a, b) =>
          URGENCY[a.status] - URGENCY[b.status] || a.name.localeCompare(b.name),
      ),
    [products],
  )

  const runningOutCount = sortedProducts.filter(
    (product) => product.status === 'EMPTY' || product.status === 'QUARTER',
  ).length

  const searching = query.trim() !== ''

  const visibleProducts = useMemo(() => {
    // Search covers ALL products, not only the top ones
    if (searching) {
      const search = query.trim().toLowerCase()
      return sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(search),
      )
    }

    return showAll
      ? sortedProducts
      : sortedProducts.slice(0, TOP_PRODUCTS_COUNT)
  }, [sortedProducts, query, searching, showAll])

  const canToggleShowAll =
    !searching && sortedProducts.length > TOP_PRODUCTS_COUNT

  function toggleShowAll() {
    setShowAll((prev) => !prev)
  }

  return {
    query,
    setQuery,
    searching,
    showAll,
    toggleShowAll,
    canToggleShowAll,
    totalCount: sortedProducts.length,
    runningOutCount,
    visibleProducts,
  }
}
