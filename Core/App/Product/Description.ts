import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "../../Data/Opaque"
import { Result, toMaybe, err, ok } from "../../Data/Result"
import { Maybe, throwIfNull } from "../../Data/Maybe"
import { createText100 } from "../../Data/Text"

const key: unique symbol = Symbol()
export type Description = Opaque<string, typeof key>
export type ErrorDescription = "INVALID_DESCRIPTION"

export function createDescription(s: string): Maybe<Description> {
  return toMaybe(createDescriptionE(s))
}

export function createDescriptionE(
  s: string,
): Result<ErrorDescription, Description> {
  const text100 = createText100(s)
  if (text100 == null) return err("INVALID_DESCRIPTION")

  return ok(jsonValueCreate<string, typeof key>(key)(text100.unwrap()))
}

export const descriptionDecoder: JD.Decoder<Description> = JD.string.transform(
  (s) => {
    return throwIfNull(createDescription(s), `Invalid Description: ${s}`)
  },
)
