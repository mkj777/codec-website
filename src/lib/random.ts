export function sampleUnique<T>(
  items: readonly T[],
  count: number,
  random: () => number = Math.random,
) {
  const pool = [...items]

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const value = pool[index]
    pool[index] = pool[swapIndex]
    pool[swapIndex] = value
  }

  return pool.slice(0, Math.max(0, count))
}
