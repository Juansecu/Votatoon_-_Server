import { setValue } from './set-value.function';

describe('setValues', () => {
  it('#1 should set the given value to a non-existing property passed as string', () => {
    const obj: Record<string, any> = {};
    const path = 'a.b.c.test';
    const value = 'test';

    setValue(obj, path, value);

    expect(obj).toMatchObject({
      a: {
        b: {
          c: {
            test: 'test'
          }
        }
      }
    });
  });

  it('#2 should set the given value to a non-existing property passed as array', () => {
    const obj: Record<string, any> = {};
    const path: string[] = ['a', 'b', 'c', 'test'];
    const value = 'test';

    setValue(obj, path, value);

    expect(obj).toMatchObject({
      a: {
        b: {
          c: {
            test: 'test'
          }
        }
      }
    });
  });
});
