declare namespace jStat {
  // -------------------------------------------------------------------------
  // Linear Algebra static methods
  // -------------------------------------------------------------------------

  /**
   * Adds two matrices/vectors, or adds a scalar to every entry of a matrix/vector.
   *
   * @param A The first operand.
   * @param B The second operand — either a scalar or a matrix/vector of matching shape.
   * @returns A + B element-wise.
   */
  function add(A: number, B: number): number;
  function add(A: number[], B: number | number[]): number[];
  function add(A: number[][], B: number | number[][]): number[][];

  /**
   * Subtracts `B` from every entry of `A`, or subtracts two matrices element-wise.
   *
   * @param A The first operand.
   * @param B The second operand.
   * @returns A − B element-wise.
   */
  function subtract(A: number, B: number): number;
  function subtract(A: number[], B: number | number[]): number[];
  function subtract(A: number[][], B: number | number[][]): number[][];

  /**
   * Divides every entry of `A` by a scalar, or divides two matrices (A × B⁻¹).
   *
   * @param A The dividend matrix/vector.
   * @param B The divisor — either a scalar or a square matrix.
   * @returns A / B.
   */
  function divide(A: number, B: number): number;
  function divide(A: number[], B: number): number[];
  function divide(A: number[][], B: number): number[][];
  function divide(A: number[] | number[][], B: number[] | number[][]): number[] | number[][];

  /**
   * Multiplies every entry of `A` by a scalar, or performs matrix multiplication
   * when `B` is a matrix.
   *
   * @param A The left operand.
   * @param B The right operand — either a scalar or a matrix.
   * @returns A × B.
   */
  function multiply(A: number, B: number): number;
  function multiply(A: number[], B: number): number[];
  function multiply(A: number[][], B: number): number[][];
  function multiply(A: number[] | number[][], B: number[] | number[][]): number | number[] | number[][];

  /**
   * Returns the outer product of two vectors: Aᵢ × Bⱼ, producing a matrix.
   *
   * @param A First vector.
   * @param B Second vector.
   * @returns An |A| × |B| matrix.
   */
  function outer(A: ReadonlyArray<number>, B: ReadonlyArray<number>): number[][];

  /**
   * Returns the dot product (element-wise product summed to a scalar) of two vectors.
   *
   * @param A First vector.
   * @param B Second vector.
   * @returns Σ Aᵢ × Bᵢ.
   */
  function dot(A: ReadonlyArray<number>, B: ReadonlyArray<number>): number;

  /**
   * Returns the p-norm of a vector. Defaults to the Euclidean 2-norm (p = 2).
   *
   * @param A The input vector (or matrix — uses the first row if 2D).
   * @param p The norm order (default 2).
   * @returns (Σ |xᵢ|ᵖ)^(1/p).
   */
  function norm(A: number[] | number[][], p?: number): number;

  /**
   * Returns the angle in radians between two vectors.
   *
   * @param A First vector (uses first row if 2D).
   * @param B Second vector (uses first row if 2D).
   * @returns arccos(dot(A, B) / (‖A‖ × ‖B‖)).
   */
  function angle(A: number[] | number[][], B: number[] | number[][]): number;

  /**
   * Horizontally concatenates two matrices (augments A by B).
   *
   * @param A Left matrix.
   * @param B Right matrix (same number of rows as A).
   * @returns A matrix of shape A.rows × (A.cols + B.cols).
   */
  function aug(A: ReadonlyArray<ReadonlyArray<number>>, B: ReadonlyArray<ReadonlyArray<number>>): number[][];

  /**
   * Returns the determinant of a square matrix (recursive Laplace expansion).
   *
   * @param A A square matrix.
   * @returns The determinant.
   */
  function det(A: ReadonlyArray<ReadonlyArray<number>>): number;

  /**
   * Returns the inverse of a square matrix using Gauss-Jordan elimination.
   *
   * @param A A square matrix.
   * @returns A⁻¹.
   */
  function inv(A: ReadonlyArray<ReadonlyArray<number>>): number[][];

  /**
   * Solves Ax = b using Gaussian elimination with partial pivoting
   * and back substitution.
   *
   * @param A Coefficient matrix (n × n square).
   * @param b Right-hand-side vector (n) or matrix (n × m).
   * @returns The solution vector (n) or matrix.
   */
  function gauss_elimination(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>
  ): number[];

  /**
   * Augments A with B and performs Gauss-Jordan elimination.
   *
   * @param A Coefficient matrix (n × n).
   * @param B Right-hand-side matrix (n × m).
   * @returns The full reduced matrix of shape n × (n + m).
   */
  function gauss_jordan(
    A: ReadonlyArray<ReadonlyArray<number>>,
    B: ReadonlyArray<ReadonlyArray<number>>
  ): number[][];

  /**
   * Solves Ax = b using the Gauss-Jacobi iterative method.
   * Iterates until ‖xₖ − xₖ₋₁‖ < `tol`.
   *
   * @param A Coefficient matrix (n × n).
   * @param b Right-hand-side vector (n).
   * @param x0 Initial guess (array of n numbers).
   * @param tol Tolerance (default 1e-6).
   * @returns The solution vector.
   */
  function gauss_jacobi(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<number>,
    x0: number[],
    tol?: number
  ): number[];

  /**
   * Solves Ax = b using the Gauss-Seidel iterative method.
   * Iterates until ‖xₖ − xₖ₋₁‖ < `tol`.
   *
   * @param A Coefficient matrix (n × n).
   * @param b Right-hand-side vector (n).
   * @param x0 Initial guess (array of n numbers).
   * @param tol Tolerance (default 1e-6).
   * @returns The solution vector.
   */
  function gauss_seidel(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<number>,
    x0: number[],
    tol?: number
  ): number[];

  /**
   * Solves Ax = b using successive over-relaxation (SOR).
   *
   * @param A Coefficient matrix.
   * @param b Right-hand-side vector.
   * @param x0 Initial guess.
   * @param tol Tolerance.
   * @param omega Relaxation parameter (ω).
   * @returns The solution vector or matrix.
   */
  function SOR(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>,
    x0: number[] | ReadonlyArray<ReadonlyArray<number>>,
    tol: number,
    omega: number
  ): number[] | number[][];

  /**
   * Solves a least-squares problem min‖Ax − b‖₂ via QR decomposition.
   *
   * @param A Design matrix (m × n).
   * @param b Right-hand-side vector (m) or matrix (m × k).
   * @returns The least-squares solution (n) or (n × k).
   */
  function lstsq(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<number>
  ): number[];
  function lstsq(
    A: ReadonlyArray<ReadonlyArray<number>>,
    b: ReadonlyArray<ReadonlyArray<number>>
  ): number[][];

  /**
   * Returns the LU decomposition: L × U = A where L is lower-triangular
   * and U is upper-triangular.
   *
   * @param A An n × n matrix.
   * @returns A tuple [L, U].
   */
  function lu(A: ReadonlyArray<ReadonlyArray<number>>): [number[][], number[][]];

  /**
   * Returns the Cholesky decomposition: A = T × T′ where T is lower-triangular.
   *
   * @param A A symmetric positive-definite n × n matrix.
   * @returns The lower-triangular Cholesky factor T.
   */
  function cholesky(A: ReadonlyArray<ReadonlyArray<number>>): number[][];

  /**
   * Applies Householder reflections to reduce a matrix to upper-Hessenberg form.
   *
   * @param A An m × n matrix.
   * @returns The transformed matrix.
   */
  function householder(A: ReadonlyArray<ReadonlyArray<number>>): number[][];

  /**
   * Returns the QR decomposition: Q × R = A where Q is orthogonal and R is upper-triangular.
   *
   * @param A An m × n matrix.
   * @returns A tuple [Q, R].
   */
  function QR(A: ReadonlyArray<ReadonlyArray<number>>): [number[][], number[][]];

  /**
   * Returns eigenvalues and eigenvectors via the Jacobi eigenvalue algorithm.
   *
   * @param A A real symmetric n × n matrix.
   * @returns A tuple [eigenvectors, eigenvalues].
   */
  function jacobi(
    A: ReadonlyArray<ReadonlyArray<number>>
  ): [eigenvectors: number[][], eigenvalues: number[]];

  /**
   * Raises every entry of a vector or matrix to the given power.
   *
   * @param A The input vector or matrix.
   * @param p The exponent.
   * @returns A vector or matrix with each element raised to `p`.
   */
  function pow(A: number[], p: number): number[];
  function pow(A: number[][], p: number): number[][];

  /**
   * Computes eˣ for every entry of a vector or matrix.
   *
   * @param A The input vector or matrix.
   * @returns A vector or matrix of eˣ values.
   */
  function exp(A: number[]): number[];
  function exp(A: number[][]): number[][];

  /**
   * Computes the natural logarithm for every entry.
   *
   * @param A The input vector or matrix.
   * @returns A vector or matrix of ln(x) values.
   */
  function log(A: number[]): number[];
  function log(A: number[][]): number[][];

  /**
   * Applies Math.abs to every entry.
   *
   * @param A The input vector or matrix.
   * @returns A vector or matrix of absolute values.
   */
  function abs(A: number[]): number[];
  function abs(A: number[][]): number[][];

  /**
   * Solves an ordinary differential equation (ODE) of the form du/dt = f(t, u)
   * using the Runge-Kutta method.
   * * @param f The derivative function f(t, u).
   * @param h The step size.
   * @param tn The target time (end point of the simulation).
   * @param t0 The initial time (t0).
   * @param y0 The initial state (u0).
   * @param order The order of the Runge-Kutta method (2 or 4).
   * @returns The approximated state `u` at the target time `p`.
   */
  function rungekutta(f: (t: number, u: number) => number, h: number, tn: number, t0: number, y0: number, order: 2 | 4): number;
  /**
   * Approximates the definite integral of a function using Romberg integration.
   * * Note: Due to the internal implementation, this function returns an array 
   * containing the final calculated scalar value (e.g., `[result]`), not a raw number.
   * * @param f The continuous function to integrate, taking a single parameter x.
   * @param a The lower limit of integration.
   * @param b The upper limit of integration.
   * @param order The order of the approximation (typically an even integer).
   * @returns An array containing the approximated integral value.
   */
  function romberg(f: (x: number) => number, a: number, b: number, order: number): [number];
  /**
   * Approximates the second derivative of a function using Richardson extrapolation.
   * * Note: Due to the internal implementation, this function returns an array 
   * containing the final calculated scalar value (e.g., `[result]`), not a raw number.
   * * @param X Array of discrete x-coordinates.
   * @param f Array of function values corresponding to X.
   * @param x The specific x-coordinate at which to evaluate the derivative.
   * @param h The initial step size.
   * @returns An array containing the approximated derivative value.
   */
  function richardson(X: number[], f: number[], x: number, h: number): [number];

  /**
   * Approximates the definite integral of a function using Simpson's rule.
   * * @param f The continuous function to integrate.
   * @param a The lower limit of integration.
   * @param b The upper limit of integration.
   * @param n The number of subintervals (must be an even integer).
   * @returns The approximated integral as a scalar number.
   */
  function simpson(f: (x: number) => number, a: number, b: number, n: number): number;

  /**
   * Evaluates the Hermite interpolating polynomial at a given point.
   * * @param X Array of discrete x-coordinates.
   * @param F Array of function values (y-coordinates) corresponding to X.
   * @param dF Array of derivative values corresponding to X.
   * @param value The x-coordinate at which to interpolate.
   * @returns The interpolated y-value.
   */
  function hermite(X: number[], F: number[], dF: number[], value: number): number;

  /**
   * Evaluates the Lagrange interpolating polynomial at a given point.
   * * @param X Array of discrete x-coordinates.
   * @param F Array of function values (y-coordinates) corresponding to X.
   * @param value The x-coordinate at which to interpolate.
   * @returns The interpolated y-value.
   */
  function lagrange(X: number[], F: number[], value: number): number;

  /**
   * Evaluates a natural cubic spline interpolation at a given point.
   * BUG IN JSTAT SOURCE: This function will crash at runtime 
   * due to an uninitialized matrix index (`A[0]`) passed to `jStat.inv`. 
   * Do not use this method unless you have monkey-patched the jStat source code.
   * @param X Array of discrete x-coordinates (must be strictly increasing).
   * @param F Array of function values (y-coordinates) corresponding to X.
   * @param value The x-coordinate at which to interpolate.
   * @returns The interpolated y-value.
   */
  function cubic_spline(X: number[], F: number[], value: number): number;

  /**
   * Approximates an integral with Gaussian quadrature.
   * @deprecated Not implemented — throws at runtime.
   */
  function gauss_quadrature(
    f: (x: number) => number,
    a: number,
    b: number,
    n?: number
  ): never;


  /**
   * Performs Principal Component Analysis (PCA) on a given data matrix.
   * * @param X The input data matrix (2D array of numbers).
   * @returns A tuple containing four elements:
   * - `[0]`: The original input matrix `X` (2D array).
   * - `[1]`: The sorted eigenvalues `D` (1D array).
   * - `[2]`: The corresponding transposed eigenvectors `Vt` (2D array).
   * - `[3]`: The projected data / principal components `Y` (2D array).
   */
  function PCA(X: number[][]): [
    X: number[][],
    D: number[],
    Vt: number[][],
    Y: number[][]
  ];
}