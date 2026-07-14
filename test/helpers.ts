// ==========================================================================
// Runtime assertion helpers for type-testing jStat
// ==========================================================================

import jStat from "jstat";

function _isArray(value: unknown, name: string): value is any[] {
  if (Array.isArray(value)) return true;
  if (typeof value != "object") return false;
  if (value === null) return false;
  if (typeof (value as any).length === "number") return true;
  return false;
}

function _assertIsNumber(value: unknown, name: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new TypeError(`${name}: expected number, got ${typeof value} (${String(value)})`);
  }
  return value;
}

function _assertIsNumberArray(arr: unknown, name: string): number[] {
  if (!_isArray(arr, name)) {
    throw new TypeError(`${name}: expected number[], got ${typeof arr}`);
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
      throw new TypeError(`${name}[${i}]: expected number, got ${typeof arr[i]}`);
    }
  }
  return arr;
}

function _assertIsMatrix(mat: unknown, name: string): number[][] {
  if (!_isArray(mat, name)) {
    throw new TypeError(`${name}: expected number[][], got ${typeof mat}`);
  }
  for (let i = 0; i < mat.length; i++) {
    if (!_isArray(mat[i], `${name}[${i}]`)) {
      throw new TypeError(`${name}[${i}]: expected number[], got ${typeof mat[i]}`);
    }
    for (let j = 0; j < mat[i].length; j++) {
      if (typeof mat[i][j] !== "number") {
        throw new TypeError(`${name}[${i}][${j}]: expected number, got ${typeof mat[i][j]}`);
      }
    }
  }
  return mat;
}

function _assertIsString(value: unknown, name: string): string {
  if (typeof value !== "string") {
    throw new TypeError(`${name}: expected string, got ${typeof value}`);
  }
  return value;
}

function _assertIsBoolean(value: unknown, name: string): boolean {
  if (typeof value !== "boolean") {
    throw new TypeError(`${name}: expected boolean, got ${typeof value}`);
  }
  return value;
}

function _assertIsFunction(value: unknown, name: string): Function {
  if (typeof value !== "function") {
    throw new TypeError(`${name}: expected function, got ${typeof value}`);
  }
  return value;
}

function _assertIsArray(value: unknown, name: string): unknown[] {
  if (!_isArray(value, name)) {
    throw new TypeError(`${name}: expected array, got ${typeof value}`);
  }
  return value;
}

function _assertIsObject(value: unknown, name: string): object {
  if (value === null || typeof value !== "object") {
    throw new TypeError(`${name}: expected object, got ${typeof value}`);
  }
  if (_isArray(value, name)) {
    throw new TypeError(`${name}: expected plain object, got array`);
  }
  return value;
}

function _assertInstanceOf<T extends new (...args: any[]) => any>(value: unknown, cls: T, name: string): InstanceType<T> {
  if (!(value instanceof cls)) {
    throw new TypeError(`${name}: expected instance of ${cls.name}, got ${typeof value}`);
  }
  return value as InstanceType<T>;
}

// -- Public re-exported helpers (tag for visibility) ----------------------------------

/** Assert value is a number and return it. */
export function assertNumber(value: number, name: string): number {
  const result = _assertIsNumber(value, name);
  void result;
  return result;
}

/** Assert value is a number[] and return it. */
export function assertNumberArray(arr: number[], name: string): number[] {
  if (arr instanceof jStat) {
    throw new TypeError(`${name}: expected number[], got jStat`);
  }
  const result = _assertIsNumberArray(arr, name);
  void result;
  return result;
}

/** Assert value is a number[][] and return it. */
export function assertMatrix(mat: number[][], name: string): number[][] {
  if (mat instanceof jStat) throw new TypeError(`${name}: expected number[][], got jStat`);
  const result = _assertIsMatrix(mat, name);
  void result;
  return result;
}

/** Assert value is a boolean and return it. */
export function assertBoolean(value: boolean, name: string): boolean {
  const result = _assertIsBoolean(value, name);
  void result;
  return result;
}

/** Assert value is an array and return it. */
export function assertArray(value: any[], name: string): any[] {
  if (value instanceof jStat) throw new TypeError(`${name}: expected array, got jStat`);
  const result = _assertIsArray(value, name);
  void result;
  return result;
}

/** Assert value is a plain object and return it. */
export function assertObject(value: object, name: string): object {
  const result = _assertIsObject(value, name);
  void result;
  return result;
}

/** Assert value is a string and return it. */
export function assertString(value: string, name: string): string {
  const result = _assertIsString(value, name);
  void result;
  return result;
}

/** Assert value is a function and return it. */
export function assertFunction(value: Function, name: string): Function {
  const result = _assertIsFunction(value, name);
  void result;
  return result;
}

/** Assert value is an instance of `cls` and return it. */
export function assertInstanceOf<T extends new (...args: any[]) => any>(value: InstanceType<T>, cls: T, name: string): unknown {
  const result = _assertInstanceOf(value, cls, name);
  void result;
  return result;
}

// -- Convenience section markers -----------------------------------------------------

/** Print a test-section header (disabled by default for quiet runs). */
export function _section(_name: string) {
  // console.log(`━━━ ${_name} ━━━`);
}

export function assert(truth: boolean, message: string) {
  if (!truth) {
    throw new Error(`Assertion failed: ${message}`);
  }
}