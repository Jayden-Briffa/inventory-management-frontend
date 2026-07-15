// Much of this will likely need to change, just mocked with Copilot for now to have something to work with in the frontend.

export type Borrow = {
  borrowId: number
  itemId: number
  email: string
  borrowDate?: string
  expectedReturnDate?: string
  isReturned?: boolean
}

export type Item = {
  itemId: number
  qrCode: string
  name: string
  description: string
  isCollection?: boolean
  borrows?: Borrow[]
}

type ItemsEnvelope = {
  items: unknown
}

const getApiBaseUrl = () => {
  return ((import.meta.env.VITE_INVENTORY_API_BASE_URL ?? '') as string).trim()
}

const buildUrl = (path: string) => {
  const base = getApiBaseUrl()
  if (!base) return path
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

const asNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && !Number.isNaN(Number(value)))
    return Number(value)
  return null
}

const asString = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

const parseBorrow = (payload: unknown): Borrow | null => {
  if (typeof payload !== 'object' || payload === null) return null

  const borrowId = asNumber((payload as { borrowId?: unknown; borrow_id?: unknown }).borrowId)
  const borrowIdAlt = asNumber((payload as { borrow_id?: unknown }).borrow_id)
  const itemId = asNumber((payload as { itemId?: unknown; item_id?: unknown }).itemId)
  const itemIdAlt = asNumber((payload as { item_id?: unknown }).item_id)
  const email =
    asString((payload as { email?: unknown }).email) ??
    asString((payload as { userEmail?: unknown }).userEmail)

  const resolvedBorrowId = borrowId ?? borrowIdAlt
  const resolvedItemId = itemId ?? itemIdAlt

  if (resolvedBorrowId === null || resolvedItemId === null || !email) return null

  const borrowDate =
    asString((payload as { borrowDate?: unknown; borrow_date?: unknown }).borrowDate) ??
    asString((payload as { borrow_date?: unknown }).borrow_date) ??
    undefined

  const expectedReturnDate =
    asString(
      (payload as { expectedReturnDate?: unknown; expected_return_date?: unknown })
        .expectedReturnDate,
    ) ??
    asString((payload as { expected_return_date?: unknown }).expected_return_date) ??
    undefined

  const isReturnedRaw =
    (payload as { isReturned?: unknown; is_returned?: unknown }).isReturned ??
    (payload as { is_returned?: unknown }).is_returned

  const isReturned = typeof isReturnedRaw === 'boolean' ? isReturnedRaw : undefined

  return {
    borrowId: resolvedBorrowId,
    itemId: resolvedItemId,
    email,
    borrowDate,
    expectedReturnDate,
    isReturned,
  }
}

const parseBorrowsPayload = (payload: unknown): Borrow[] => {
  const parseArray = (arr: unknown[]): Borrow[] =>
    arr.map(parseBorrow).filter((b): b is Borrow => b !== null)

  if (Array.isArray(payload)) return parseArray(payload)

  if (typeof payload === 'object' && payload !== null && 'borrows' in payload) {
    const value = (payload as { borrows?: unknown }).borrows
    if (Array.isArray(value)) return parseArray(value)
  }

  return []
}

const parseItem = (payload: unknown): Item | null => {
  if (typeof payload !== 'object' || payload === null) return null

  const itemId = asNumber((payload as { itemId?: unknown; item_id?: unknown }).itemId)
  const itemIdAlt = asNumber((payload as { item_id?: unknown }).item_id)
  const qrCode =
    asString((payload as { qrCode?: unknown; qr_code?: unknown }).qrCode) ??
    asString((payload as { qr_code?: unknown }).qr_code)
  const name = asString((payload as { name?: unknown }).name)
  const description = asString((payload as { description?: unknown }).description)

  const resolvedItemId = itemId ?? itemIdAlt
  if (resolvedItemId === null || !qrCode || !name || !description) return null

  const isCollectionRaw =
    (payload as { isCollection?: unknown; is_collection?: unknown }).isCollection ??
    (payload as { is_collection?: unknown }).is_collection
  const isCollection = typeof isCollectionRaw === 'boolean' ? isCollectionRaw : undefined

  const borrowsRaw = (payload as { borrows?: unknown }).borrows
  const borrows = Array.isArray(borrowsRaw)
    ? borrowsRaw.map(parseBorrow).filter((b): b is Borrow => b !== null)
    : undefined

  return {
    itemId: resolvedItemId,
    qrCode,
    name,
    description,
    isCollection,
    borrows,
  }
}

const parseItemsPayload = (payload: unknown): Item[] => {
  const parseArray = (arr: unknown[]): Item[] =>
    arr.map(parseItem).filter((i): i is Item => i !== null)

  if (Array.isArray(payload)) return parseArray(payload)

  if (typeof payload === 'object' && payload !== null && 'items' in payload) {
    const value = (payload as ItemsEnvelope).items
    if (Array.isArray(value)) return parseArray(value)
  }

  return []
}

export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  const response = await fetch(buildUrl('/items'), { signal })
  if (!response.ok) {
    throw new Error(`Failed to fetch items (${response.status})`)
  }

  const payload = (await response.json()) as unknown
  return parseItemsPayload(payload)
}

export const fetchBorrowsByItemId = async (itemId: number, signal?: AbortSignal): Promise<Borrow[]> => {
  const response = await fetch(buildUrl(`/borrows?item_id=${itemId}`), { signal })
  if (!response.ok) {
    throw new Error(`Failed to fetch borrows for item with ID ${itemId} (${response.status})`)
  }

  const payload = (await response.json()) as unknown
  return parseBorrowsPayload(payload)
}

export const fetchItemByUUID = async (itemUUID: string, signal?: AbortSignal): Promise<Item> => {
  const response = await fetch(buildUrl(`/items/${itemUUID}`), { signal })
  if (!response.ok) {
    throw new Error(`Failed to fetch item with UUID ${itemUUID} (${response.status})`)
  }

  const payload = (await response.json()) as unknown
  const item = parseItem(payload)
  if (!item) {
    throw new Error(`Invalid item data received for item with UUID ${itemUUID}`)
  }
  return item
}

export const createBorrow = async (itemId: number, email: string, expectedReturnDate: string | null, signal?: AbortSignal): Promise<Borrow> => {
  const response = await fetch(buildUrl('/borrows'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      email,
      expectedReturnDate,
    }),
    signal,
  })
  
  if (!response.ok) {
    throw new Error(`Failed to borrow item with ID ${itemId} (${response.status})`)
  }

  const payload = (await response.json()) as unknown
  const borrow = parseBorrow(payload)
  if (!borrow) {
    throw new Error(`Invalid borrow data received for item with ID ${itemId}`)
  }
  return borrow
}