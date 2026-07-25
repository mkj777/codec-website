import assert from "node:assert/strict"

import { getBrowserFamily } from "../src/lib/browser.ts"

const cases = [
  ["Mozilla/5.0 Chrome/140.0 Safari/537.36 Edg/140.0", "edge"],
  ["Mozilla/5.0 Chrome/140.0 Safari/537.36", "chrome"],
  ["Mozilla/5.0 Firefox/141.0", "firefox"],
  ["Mozilla/5.0 Version/18.0 Safari/605.1.15", "safari"],
  ["CodecBrowser/1.0", "unknown"],
] as const

for (const [userAgent, expected] of cases) {
  assert.equal(getBrowserFamily(userAgent), expected)
}

console.log("Browser download hints: OK")
