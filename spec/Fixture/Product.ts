import * as UserRow from "../../Api/src/Database/UserRow"
import * as Hash from "../../Api/src/Data/Hash"
import { _notNull } from "./Maybe"
import { createPrice } from "../../Core/App/Product/Price"
import { createName } from "../../Core/App/Product/Name"
import { createDescription } from "../../Core/App/Product/Description"
import { createNow } from "../../Core/Data/Time/Timestamp"
import { createProductID } from "../../Core/App/Product/ProductID"

export async function _createProduct(
  emailS: string,
  userData?: Partial<UserRow.UserRow>,
): Promise<UserRow.UserRow> {
  const hashedPassword = await _hashPassword(_defaultPassword.unwrap())
  const now = createNow()

  return UserRow.unsafeCreate({
    id: createUserID(),
    email: _notNull(createEmail(emailS)),
    name: _notNull(createName("Alice")),
    password: hashedPassword.unwrap(),
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
    ...userData,
  })
}
