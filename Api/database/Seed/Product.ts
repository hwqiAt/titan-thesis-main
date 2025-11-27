import { count, create } from "../../src/Database/ProductRow"
import * as Logger from "../../src/Logger"
import { nameDecoder } from "../../../Core/App/Product/Name"
import { descriptionDecoder } from "../../../Core/App/Product/Description"
import { priceDecoder } from "../../../Core/App/Product/Price"

type NewProductData = {
  nameStr: string
  priceNum: number
  descriptionStr: string
}

const PRODUCTS_TO_SEED: NewProductData[] = [
  {
    nameStr: "Wireless Mechanical Keyboard",
    priceNum: 1290000,
    descriptionStr:
      "High-performance mechanical keyboard with low-latency wireless connectivity. Perfect for gaming and typing.",
  },
  {
    nameStr: "4K USB-C Monitor",
    priceNum: 4999000,
    descriptionStr:
      "27-inch 4K UHD monitor with USB-C power delivery and display port.",
  },
  {
    nameStr: "Ergonomic Office Chair",
    priceNum: 2500000,
    descriptionStr:
      "Fully adjustable ergonomic chair designed for all-day comfort and back support.",
  },
  {
    nameStr: "Noise-Cancelling Headphones",
    priceNum: 750000,
    descriptionStr:
      "Over-ear headphones with industry-leading noise cancellation and 30-hour battery life.",
  },
  {
    nameStr: "Smart Home Hub",
    priceNum: 450000,
    descriptionStr:
      "Central device for controlling all smart devices in your home.",
  },
  {
    nameStr: "Portable SSD 1TB",
    priceNum: 1590000,
    descriptionStr:
      "Ultra-fast external solid-state drive for quick data transfer and backup.",
  },
]

export async function seedProd(): Promise<void> {
  return _seedProducts(PRODUCTS_TO_SEED)
}

export async function seedDev(): Promise<void> {
  return _seedProducts(PRODUCTS_TO_SEED)
}

/**
 * Seeds products into the database if the product table is currently empty.
 * @param newProductData An array of product data objects to insert.
 */
async function _seedProducts(newProductData: NewProductData[]): Promise<void> {
  const currentProductCount = await count()
  if (currentProductCount.unwrap() > 0) {
    Logger.log(
      `Skipping seeding products. ${currentProductCount.unwrap()} products already exist.`,
    )
  } else {
    for (const { nameStr, priceNum, descriptionStr } of newProductData) {
      try {
        await create({
          name: nameDecoder.verify(nameStr),
          price: priceDecoder.verify(priceNum),
          description: descriptionDecoder.verify(descriptionStr),
        })

        Logger.log(`Seeded product: "${nameStr}"`)
      } catch (e) {
        Logger.error(`Failed to seed product "${nameStr}": ${e}`)
      }
    }
    Logger.log(`Successfully seeded ${newProductData.length} products.`)
  }
}
