import * as JD from "decoders"
import { Name, nameDecoder } from "./Product/Name"
import { ProductID, productIDDecoder } from "./Product/ProductID"
import { Price, priceDecoder } from "./Product/Price"
import { ImageUrl, imageUrlDecoder } from "./Product/ProductImageUrl"

export type BasicProduct = {
  id: ProductID
  name: Name
  price: Price
  imageUrl: ImageUrl
}

export const basicProductDecoder: JD.Decoder<BasicProduct> = JD.object({
  id: productIDDecoder,
  name: nameDecoder,
  price: priceDecoder,
  imageUrl: imageUrlDecoder,
})
