import * as JD from "decoders"
import {
  responseDecoder,
  Api,
  urlParamsDecoder,
  NoBodyParams,
  noBodyParamsDecoder,
} from "../../../Data/Api"
import { Product, productDecoder } from "../../../App/Product" // Giả định Product model & decoder

/**
 * Định nghĩa Contract cho API: GET /products (ID được truyền qua Query String)
 */
export type Contract = Api<
  "GET",
  "/products", // Route cơ sở, không có ID
  QueryParams, // ID nằm trong Query Params
  NoBodyParams, // Yêu cầu GET không có body
  ErrorCode,
  Payload
>

/**
 * Các tham số lấy từ URL Query String (sau dấu ?)
 */
export type QueryParams = {
  id: string // Chuỗi ID sản phẩm được truyền qua ?id=
}

/**
 * Các mã lỗi có thể xảy ra
 */
export type ErrorCode = "PRODUCT_NOT_FOUND" | "INVALID_PRODUCT_ID"

/**
 * Dữ liệu trả về thành công (chỉ là một đối tượng Product)
 */
export type Payload = Product

// --- DECODERS ---

/**
 * Decoder cho Query Params
 */
export const queryParamsDecoder: JD.Decoder<QueryParams> = JD.object({
  id: JD.string,
})

/**
 * Decoder cho Payload (sản phẩm)
 */
export const payloadDecoder: JD.Decoder<Payload> = productDecoder

/**
 * Decoder cho mã lỗi
 */
export const errorCodeDecoder: JD.Decoder<ErrorCode> = JD.oneOf([
  "PRODUCT_NOT_FOUND",
  "INVALID_PRODUCT_ID",
])

/**
 * Định nghĩa Contract cuối cùng
 */
export const contract: Contract = {
  method: "GET",
  route: "/products",
  urlDecoder: urlParamsDecoder(queryParamsDecoder), // Sử dụng decoder cho Query Params
  bodyDecoder: noBodyParamsDecoder,
  responseDecoder: responseDecoder(errorCodeDecoder, payloadDecoder),
}
