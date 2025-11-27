import * as API from "../../../../../Core/Api/Public/Product/GetList"
import { Result, err, ok } from "../../../../../Core/Data/Result"
import * as ProductRow from "../../../Database/ProductRow"
import { toProduct } from "../../../App/Product"
import { NoUrlParams } from "../../../../../Core/Data/Api"
import { Product } from "../../../../../Core/App/Product"

export const contract = API.contract

export async function handler(
  _params: NoUrlParams,
): Promise<Result<API.ErrorCode, API.Payload>> {
  const productRows = await ProductRow.getAll()
  if (productRows.length === 0) {
    return err("NO_PRODUCTS_FOUND")
  }

  const products: Product[] = productRows.map(toProduct)

  return ok(products)
}
