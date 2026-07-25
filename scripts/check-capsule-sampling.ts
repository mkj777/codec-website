import assert from "node:assert/strict"

import { sampleUnique } from "../src/lib/random.ts"

const source = Array.from({ length: 30 }, (_, index) => index)
const snapshot = [...source]
const selected = sampleUnique(source, 10, () => 0.42)

assert.equal(selected.length, 10)
assert.equal(new Set(selected).size, 10)
assert.deepEqual(source, snapshot)

console.log("Capsule sampling: OK")
