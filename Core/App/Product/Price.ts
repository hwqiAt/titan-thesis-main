import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "../../Data/Opaque"
import { Result, toMaybe, err, ok } from "../../Data/Result"
import { Maybe, throwIfNull } from "../../Data/Maybe"
import { createPositiveInt } from "../../Data/Number/PositiveInt"

const key: unique symbol = Symbol()
export type Price = Opaque<number, typeof key>
export type ErrorPrice = "INVALID_PRICE"

export function createPrice(s: number): Maybe<Price> {
  return toMaybe(createPriceE(s))
}

export function createPriceE(s: number): Result<ErrorPrice, Price> {
  const positiveInt = createPositiveInt(s)
  if (positiveInt == null) return err("INVALID_PRICE")

  return ok(jsonValueCreate<number, typeof key>(key)(positiveInt.unwrap()))
}

export const priceDecoder: JD.Decoder<Price> = JD.number.transform((s) => {
  return throwIfNull(createPrice(s), `Invalid price: ${s}`)
})
