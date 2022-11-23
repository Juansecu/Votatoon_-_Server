import { bufferToArray } from './buffer-to-array.function';

describe('bufferToArray', () => {
  it('#1 should create a new array from a buffer', () => {
    const buffer: Buffer = Buffer.from([1, 2, 3]);
    const array: number[] = bufferToArray(buffer);

    expect(array).toEqual([1, 2, 3]);
  });
});
