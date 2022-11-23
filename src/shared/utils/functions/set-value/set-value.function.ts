/**
 * Sets the value on the property of a given object dynamically.
 *
 * @param obj The object to set the value on
 * @param path The path to the value. If the path is a string, it will be split by the `.` character.
 * @param value The value to set
 */
export function setValue(
  obj: Record<string, any>,
  path: string[] | string,
  value: unknown
): void {
  if (typeof path == 'string') path = path.split('.');

  if (path.length > 1) {
    if (!obj.hasOwnProperty(path[0]) || typeof obj[path[0]] != 'object')
      obj[path[0]] = {};

    const item = path.shift();

    setValue(obj[item], path, value);
  } else obj[path[0]] = value;
}
