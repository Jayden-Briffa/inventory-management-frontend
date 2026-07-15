declare module '@/apis/itemMethods' {
  import type { Item } from '@/services/inventory'

  export function getItems(collection?: boolean): Promise<Item[] | undefined>
  export function deleteItem(qrCode: string): Promise<void>
  export function updateItem(
    qrCode: string,
    itemDetails: Partial<Item> & Record<string, unknown>
  ): Promise<void>
}
