import * as JD from "decoders"
import {
  responseDecoder,
  Api,
  NoUrlParams,
  noUrlParamsDecoder,
  NoBodyParams,
  noBodyParamsDecoder,
} from "../../../Data/Api"
import { Product, productDecoder } from "../../../App/Product"

export type Contract = Api<
  "GET",
  "/products",
  NoUrlParams,
  NoBodyParams,
  ErrorCode,
  Payload
>

export type ErrorCode = "NO_PRODUCTS_FOUND"

export type Payload = Product[]

export const payloadDecoder: JD.Decoder<Payload> = JD.array(productDecoder)

export const errorCodeDecoder: JD.Decoder<ErrorCode> = JD.oneOf([
  "NO_PRODUCTS_FOUND",
])

export const contract: Contract = {
  method: "GET",
  route: "/products",
  urlDecoder: noUrlParamsDecoder,
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: responseDecoder(errorCodeDecoder, payloadDecoder),
}
