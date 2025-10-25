import * as API from "../../../../Core/Api/Auth/UpdateProfile"
import { Result, err, ok } from "../../../../Core/Data/Result"
import { AuthUser } from "../AuthApi"
import * as Hash from "../../Data/Hash"
import * as UserRow from "../../Database/UserRow"

export const contract = API.contract

export async function handler(
  user: AuthUser,
  params: API.BodyParams,
): Promise<Result<API.ErrorCode, API.Payload>> {
  const { email, name, currentPassword, newPassword } = params

  const isValidPassword = await Hash.verify(
    currentPassword.unwrap(),
    user.password,
  )
  if (isValidPassword === false) return err("INVALID_PASSWORD")

  const existedEmail = await UserRow.getByEmail(email)
  if (existedEmail != null && existedEmail.id.unwrap() !== user.id.unwrap()) {
    return err("EMAIL_ALREADY_EXISTS")
  }

  const newHashedPassword =
    newPassword != null ? await Hash.issue(newPassword.unwrap()) : null

  return ok({
    user: await UserRow.update(user.id, {
      name,
      email,
      newHashedPassword,
    }),
  })
}
