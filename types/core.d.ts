declare namespace jStat {
  // -------------------------------------------------------------------------
  // Core static methods
  // -------------------------------------------------------------------------

  /**
   * Sets the random number generator function used by jStat.
   * By default, jStat uses `Math.random`. You can provide a custom function
   * that returns a random number in the range [0, 1).
   *
   * @param fn A function that returns a random number in [0, 1).
   */
  function setRandom(fn: typeof Math.random): void;

  /**
   * Returns the number of rows in a matrix.
   *
   * @param array The input matrix (2D array).
   * @returns The number of rows, or `1` if the matrix has zero rows.
   */
  function rows(array: number[][]): number;

  /**
   * @todo This function is broken in the jStat source code. It is identical to {@link row}
   * Returns a specific row or multiple rows from a matrix as a plain array.
   * Equivalent to calling {@link row} and flattening each result.
   *
   * @param array The input matrix (2D array).
   * @param index A single row index or an array of row indices.
   * @returns The extracted row(s) as a flat or 2D array.
   */
  function rowa(array: number[][], index: number): number[];
  function rowa(array: number[][], index: number[]): number[][];

  /**
   * Returns the number of columns in a matrix.
   *
   * @param array The input matrix (2D array).
   * @returns The number of columns, or `1` if the first row is empty.
   */
  function cols(array: number[][]): number;

  /**
   * @todo This function is broken in the jStat source code. It returns the first columns as a row: jStat.cola([[1, 2], [3, 4]], [1, 0]); → [ 2, 4 ]
   * Returns a specific column or multiple columns from a matrix as a plain array.
   * Equivalent to calling {@link col} and unwrapping each single-element array.
   *
   * @param array The input matrix (2D array).
   * @param index A single column index or an array of column indices.
   * @returns The extracted column(s) as a flat or 2D array.
   */
  function cola(array: number[][], index: number): number[];
  function cola(array: number[][], index: number[]): number[][];

  /**
   * Slices the matrix. The return type depends on which arguments are provided:
   * - `{ row: number, col: number }` → returns a single `number`.
   * - `{ row: number, col?: SliceDescriptor }` → returns a 1D `number[]` (a sliced row).
   * - `{ row?: SliceDescriptor, col: number }` → returns a 1D `number[]` (a sliced column).
   * - `{ row?: SliceDescriptor, col?: SliceDescriptor }` → returns a 2D `number[][]` (a sub-matrix).
   *
   * @param list The input matrix (2D array).
   * @param rcSlice An object describing which rows and columns to extract.
   *   Each of `row` and `col` can be a specific index (number) or a
   *   {@link SliceDescriptor} with `start`, `end`, and `step` ranges.
   *
   * @example
   * ```typescript
   * // Extract a single cell
   * jStat.slice([[1, 2], [3, 4]], { row: 0, col: 1 }); // → 2
   *
   * // Extract a sliced row (equivalent to A[0, 1:])
   * jStat.slice([[1, 2, 3], [4, 5, 6]], { row: 0, col: { start: 1 } }); // → [2, 3]
   *
   * // Extract a sliced column (equivalent to A[:2, 0])
   * jStat.slice([[1, 2, 3], [4, 5, 6], [7, 8, 9]], { row: { end: 2 }, col: 0 }); // → [1, 4]
   *
   * // Extract a sub-matrix (equivalent to A[:2, 1:])
   * jStat.slice([[1, 2, 3], [4, 5, 6], [7, 8, 9]], { row: { end: 2 }, col: { start: 1 } });
   * // → [[2, 3], [5, 6]]
   * ```
   */
  function slice(
    list: number[][],
    rcSlice: { row: number; col: number }
  ): number;
  function slice(
    list: number[][],
    rcSlice: { row: number; col?: SliceDescriptor }
  ): number[];
  function slice(
    list: number[][],
    rcSlice: { row?: SliceDescriptor; col: number }
  ): number[];
  function slice(
    list: number[][],
    rcSlice?: { row?: SliceDescriptor; col?: SliceDescriptor }
  ): number[][];

  /**
   * Assigns values into a sliced region of a matrix, mutating it in place.
   *
   * @param array The target matrix (2D array) to mutate.
   * @param rcSlice An object describing which cell(s)/row(s)/column(s) to target.
   *   If both `row` and `col` are numbers, assigns to a single cell.
   *   If `row` is a number, assigns to a row slice.
   *   If `col` is a number, assigns to a column slice.
   *   If both are `SliceOptions`, assigns to a sub-matrix region.
   * @param values The value(s) to assign.
   * @returns The mutated matrix (same reference as `array`), or the assigned value
   *   when assigning to a single cell.
   *
   * @example
   * ```typescript
   * const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
   * jStat.sliceAssign(A, { row: { start: 1 }, col: { start: 1 } }, [[0, 0], [0, 0]]);
   * // A → [[1, 2, 3], [4, 0, 0], [7, 0, 0]]
   * ```
   */
  function sliceAssign(
    array: number[][],
    rcSlice: { row: number; col: number },
    values: number
  ): number;
  function sliceAssign(
    array: number[][],
    rcSlice: { row: number; col?: SliceOptions },
    values: number[]
  ): number[][];
  function sliceAssign(
    array: number[][],
    rcSlice: { row?: SliceOptions; col: number },
    values: number[]
  ): number[][];
  function sliceAssign(
    array: number[][],
    rcSlice: { row?: SliceOptions; col?: SliceOptions },
    values: number[][]
  ): number[][];

  /**
   * Returns the dimensions of a matrix.
   *
   * @param array The input matrix (2D array).
   * @returns An object with `rows` and `cols` properties.
   */
  function dimensions(array: number[][]): DimensionsResult;

  /**
   * Returns a specific row or multiple rows from a matrix.
   *
   * @param array The input matrix (2D array).
   * @param index A single row index or an array of row indices.
   * @returns The extracted row(s).
   */
  function row(array: number[][], index: number): number[];
  function row(array: number[][], index: number[]): number[][];

  /**
   * Returns a specific column or multiple columns from a matrix,
   * wrapping each value in a single-element array.
   *
   * @param array The input matrix (2D array).
   * @param index A single column index or an array of column indices.
   * @returns The extracted column(s) as a 2D array.
   */
  function col(array: number[][], index: number): number[][];
  function col(array: number[][], index: number[]): number[][];

  /**
   * Extracts the main diagonal of a matrix as a column vector.
   * Each diagonal element is wrapped in a single-element array.
   *
   * @param array The input matrix (2D array).
   * @returns A column vector containing the diagonal elements.
   *
   * @example
   * ```typescript
   * jStat.diag([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
   * // → [[1], [5], [9]]
   * ```
   */
  function diag(array: number[][]): number[][];

  /**
   * Extracts the anti-diagonal (top-right to bottom-left) of a matrix
   * as a column vector. Each element is wrapped in a single-element array.
   *
   * @param array The input matrix (2D array).
   * @returns A column vector containing the anti-diagonal elements.
   *
   * @example
   * ```typescript
   * jStat.antidiag([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
   * // → [[3], [5], [7]]
   * ```
   */
  function antidiag(array: number[][]): number[][];

  /**
   * Creates a square diagonal matrix from a 1D array.
   *
   * @param array A 1D array whose elements become the diagonal entries.
   * @returns A square matrix with the input values on the main diagonal and zeros elsewhere.
   *
   * @example
   * ```typescript
   * jStat.diagonal([1, 2, 3]);
   * // → [[1, 0, 0], [0, 2, 0], [0, 0, 3]]
   * ```
   */
  function diagonal(array: number[]): number[][];

  /**
   * Transposes a matrix or converts a vector to a column vector.
   *
   * @param array The input vector (1D array) or matrix (2D array).
   * @returns The transposed result. For a vector of length `n`, returns an
   *   `n × 1` column vector (`number[][]`). For a matrix of shape `m × n`,
   *   returns the `n × m` transpose.
   *
   * @example
   * ```typescript
   * // Vector → column vector
   * jStat.transpose([1, 2, 3]); // → [[1], [2], [3]]
   *
   * // Matrix transpose
   * jStat.transpose([[1, 2], [3, 4], [5, 6]]);
   * // → [[1, 3, 5], [2, 4, 6]]
   * ```
   */
  function transpose(array: [number][]): number[];
  function transpose(array: number[] | number[][]): number[][];

  /**
   * Maps a function over every element of a vector or matrix.
   *
   * @param array The input vector or matrix.
   * @param fn Callback invoked with three arguments:
   *   - `value`: The current element.
   *   - `row`: The row index of the current element.
   *   - `col`: The column index of the current element.
   * @param modify Optional boolean indicating whether to modify the input array in place.
   * @returns The transformed vector or matrix.
   */
  function map(
    array: number[] | number[][],
    fn: (value: number, row: number, col: number) => number,
    modify?: boolean
  ): number[] | number[][];

  /**
   * Cumulatively reduces the elements of a vector or matrix.
   * Each element is combined with the running accumulator.
   *
   * @param array The input vector or matrix.
   * @param fn A callback that combines the accumulator and the current value.
   * @param modify Optional boolean indicating whether to modify the input array in place.
   * @returns A vector or matrix of the same shape holding cumulative results.
   */
  function cumreduce(
    array: number[] | number[][],
    fn: (accumulator: number, current: number) => number,
    modify?: boolean
  ): number[] | number[][];

  /**
   * Mutates a vector or matrix in place by applying a callback to each value.
   *
   * @param array The input vector or matrix to mutate.
   * @param fn A callback invoked with the same signature as {@link map}.
   */
  function alter(
    array: number[],
    fn: (value: number, row: number, col: number) => number
  ): number[];
  function alter(
    array: number[][],
    fn: (value: number, row: number, col: number) => number
  ): number[][];

  /**
   * Creates a square matrix by calling a generator for each cell.
   *
   * @param size The number of rows and columns (n × n matrix).
   * @param fn Generator called with `(row, col)` for each cell.
   * @returns An n × n matrix.
   */
  function create(size: number, fn: (row: number, col: number) => number): number[][];

  /**
   * Creates a rectangular matrix by calling a generator for each cell.
   *
   * @param rows The number of rows.
   * @param cols The number of columns.
   * @param fn Generator called with `(row, col)` for each cell.
   * @returns An rows × cols matrix.
   */
  function create(rows: number, cols: number, fn: (row: number, col: number) => number): number[][];

  /**
   * Creates a square matrix filled with zeros.
   *
   * @param size The dimension of the square matrix (n × n).
   * @returns An n × n matrix of zeros.
   */
  function zeros(size: number): number[][];

  /**
   * Creates a rectangular matrix filled with zeros.
   *
   * @param rows The number of rows.
   * @param cols The number of columns.
   * @returns A rows × cols matrix of zeros.
   */
  function zeros(rows: number, cols: number): number[][];

  /**
   * Creates a square matrix filled with ones.
   *
   * @param size The dimension of the square matrix (n × n).
   * @returns An n × n matrix of ones.
   */
  function ones(size: number): number[][];

  /**
   * Creates a rectangular matrix filled with ones.
   *
   * @param rows The number of rows.
   * @param cols The number of columns.
   * @returns A rows × cols matrix of ones.
   */
  function ones(rows: number, cols: number): number[][];

  /**
   * Creates a square matrix filled with uniformly distributed random values in [0, 1).
   *
   * @param size The dimension of the square matrix (n × n).
   * @returns An n × n matrix of random values.
   */
  function rand(size: number): number[][];

  /**
   * Creates a rectangular matrix filled with uniformly distributed random values in [0, 1).
   *
   * @param rows The number of rows.
   * @param cols The number of columns.
   * @returns A rows × cols matrix of random values.
   */
  function rand(rows: number, cols: number): number[][];

  /**
   * Returns a deep copy of a vector or matrix.
   *
   * @param array The input vector or matrix to copy.
   * @returns A shallow-deep copy (each row array is a new reference).
   */
  function copy(array: number[]): number[];
  function copy(array: number[][]): number[][];

  /**
   * Creates an identity matrix (square matrix with 1s on the diagonal, 0s elsewhere).
   *
   * @param size The dimension of the identity matrix (n × n).
   * @returns An n × n identity matrix.
   */
  function identity(size: number): number[][];

  /**
   * Creates a rectangular identity matrix (1s on the diagonal, 0s elsewhere).
   *
   * @param rows The number of rows.
   * @param cols The number of columns.
   * @returns An rows × cols matrix.
   */
  function identity(rows: number, cols: number): number[][];

  /**
   * Creates a numeric sequence from `min` to `max` with the given `length`.
   * Uses a correction factor to compensate for IEEE floating-point error.
   *
   * @param min Start value.
   * @param max End value.
   * @param length Number of points.
   * @param fn Optional callback invoked with `(value, index)` for each element.
   * @returns A 1D array of `length` elements evenly spaced between `min` and `max`.
   */
  function seq(
    min: number,
    max: number,
    length: number,
    fn?: (value: number, index: number) => number
  ): number[];

  /**
   * Creates a range `[0, 1, ..., stop - 1]` (like Python's `range(stop)`).
   *
   * @param stop Exclusive upper bound.
   * @returns A 1D array from `0` to `stop - 1`.
   */
  function arange(stop: number): number[];

  /**
   * Creates a range `[start, start + 1, ..., stop - 1]` with step `1`.
   *
   * @param start Inclusive start value.
   * @param stop Exclusive upper bound.
   * @returns A 1D array from `start` up to but not including `stop`.
   */
  function arange(start: number, stop: number): number[];

  /**
   * Creates a range with a custom step size.
   *
   * @param start Inclusive start value.
   * @param stop Exclusive upper bound.
   * @param step Increment between consecutive elements.
   * @returns A 1D array with the specified start, stop, and step.
   */
  function arange(start: number, stop: number, step: number): number[];

  /**
   * Clears a vector or matrix in place, setting all values to zero.
   *
   * @param array The input vector or matrix to clear.
   */
  function clear(array: number[]): number[];
  function clear(array: number[][]): number[][];

  /**
   * Checks whether a matrix is symmetric (equal to its transpose).
   * Returns `false` if the matrix is not square.
   *
   * @param array The input matrix.
   * @returns `true` if `matrix[i][j] === matrix[j][i]` for all valid indices.
   */
  function symmetric(array: number[][]): boolean;
}