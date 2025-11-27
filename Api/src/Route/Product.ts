import { Express } from "express"
import { publicApi } from "../Api/PublicApi"
import * as GetList from "../Api/Public/Product/GetList"
// import * as GetByID from "../Api/Public/Product/GetProductByID"

export function productRoutes(app: Express): void {
  publicApi(app, GetList)
  //   publicApi(app, GetByID)
}
