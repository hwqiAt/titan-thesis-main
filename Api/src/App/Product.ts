import { Product } from "../../../Core/App/Product"
import { ProductRow } from "../Database/ProductRow"

export function toProduct(productRow: ProductRow): Product {
  return {
    id: productRow.id,
    name: productRow.name,
    price: productRow.price,
    description: productRow.description,
  }
}
