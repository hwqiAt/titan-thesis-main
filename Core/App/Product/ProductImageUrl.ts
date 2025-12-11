import * as JD from "decoders"
import { Opaque, jsonValueCreate } from "../../Data/Opaque"
import { Result, toMaybe, err, ok } from "../../Data/Result"
import { Maybe, throwIfNull } from "../../Data/Maybe"

const key: unique symbol = Symbol()
export type ImageUrl = Opaque<string, typeof key>
export type ErrorImageUrl = "INVALID_URL" | "URL_TOO_LONG"

export function createImageUrl(s: string): Maybe<ImageUrl> {
  return toMaybe(createImageUrlE(s))
}

export function createImageUrlE(s: string): Result<ErrorImageUrl, ImageUrl> {
  const trimmedString = s.trim()

  if (trimmedString.length === 0) {
    return err("INVALID_URL")
  }

  const isRemote =
    trimmedString.startsWith("http://") || trimmedString.startsWith("https://")
  const isLocalPath = trimmedString.startsWith("/")

  if (!isRemote && !isLocalPath) {
    return err("INVALID_URL")
  }

  if (trimmedString.length > 500) {
    return err("URL_TOO_LONG")
  }

  return ok(jsonValueCreate<string, typeof key>(key)(trimmedString))
}

export const imageUrlDecoder: JD.Decoder<ImageUrl> = JD.string.transform(
  (s) => {
    return throwIfNull(createImageUrl(s), `Invalid Image URL: ${s}`)
  },
)
