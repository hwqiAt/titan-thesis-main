// import * as API from "../../../../../Core/Api/Public/Product/GetProductByID"
// import { Result, err, ok } from "../../../../../Core/Data/Result"
// import * as ProductRow from "../../../Database/ProductRow"
// import {
//   createProductID,
//   ProductID,
// } from "../../../../../Core/App/Product/ProductID" // Import hàm tạo ProductID
// import { toProduct } from "../../../App/Product"
// import { Product } from "../../../../../Core/App/Product"

// export const contract = API.contract

// export async function handler(
//   params: API.QueryParams, // Nhận { id: string }
// ): Promise<Result<API.ErrorCode, API.Payload>> {
//   const { id: productIDString } = params

//   const maybeProductID = createProductID(productIDString)

//   if (maybeProductID == null) {
//     return err("INVALID_PRODUCT_ID")
//   }

//   const productID: ProductID = maybeProductID

//   const productRow = await ProductRow.getByID(productID)

//   if (productRow == null) {
//     return err("PRODUCT_NOT_FOUND")
//   }

//   const product: Product = toProduct(productRow)

//   return ok(product)
// }
