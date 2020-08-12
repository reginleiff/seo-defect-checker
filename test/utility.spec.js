const { isString, isStringArray } = require("../lib/utility")

describe('Utility', () => {
  test('isString', () => {
    expect(isString('')).toBe(true);
    expect(isString('1')).toBe(true);
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  })

  test('isStringArray', () => {
    expect(isStringArray([])).toBe(true);
    expect(isStringArray(['1', 'hello'])).toBe(true);
    expect(isStringArray(['1', 1])).toBe(false);
    expect(isStringArray(null)).toBe(false);
    expect(isStringArray(undefined)).toBe(false);
  })
})