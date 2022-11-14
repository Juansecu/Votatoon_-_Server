/**
 * Creates a new array from a buffer.
 *
 * @param buffer The buffer to convert to an array
 */
export function bufferToArray(buffer: Buffer): number[] {
  return [].slice.call(buffer);
}
