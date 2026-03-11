export function take<T>(iterator: Iterator<T>, count: number): T[] {
  const result: T[] = [];
  
  for (let i = 0; i < count; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    result.push(value);
  }
  
  return result;
}
export function* createRandomStream<T>(source: readonly T[]): Generator<T> {
  const seen = new Set<number>();
  const len = source.length;
  
  while (seen.size < len) {
    const idx = Math.floor(Math.random() * len);
    
    if (!seen.has(idx)) {
      seen.add(idx);
      yield source[idx];
    }
  }
}
