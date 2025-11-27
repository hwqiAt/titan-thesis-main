import * as JD from "decoders"
import { Name, nameDecoder } from "./Product/Name"
import { ProductID, productIDDecoder } from "./Product/ProductID"
import { Price, priceDecoder } from "./Product/Price"
import { Description, descriptionDecoder } from "./Product/Description"

/** Provided as an example for App-level Type 1
 * User type differs from app to app
 * so it cannot belong to Data context-folder
 */
export type Product = {
  id: ProductID
  name: Name
  price: Price
  description: Description
}

export const productDecoder: JD.Decoder<Product> = JD.object({
  id: productIDDecoder,
  name: nameDecoder,
  price: priceDecoder,
  description: descriptionDecoder,
})
