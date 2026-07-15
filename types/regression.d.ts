/// <reference path="../index.d.ts" />

declare namespace jStat {
  // -------------------------------------------------------------------------
  // Regression result types
  // -------------------------------------------------------------------------

  /**
   * Per-coefficient statistics produced by `jStat.regresst`.
   * Each entry corresponds to one regressor (including the intercept).
   */
  type RegressionCoefficientStats = [
    /** The estimated coefficient (beta). */
    beta: number[],
    /** Standard deviation of the coefficient estimate. */
    sd: number,
    /** Absolute t-statistic. */
    t: number,
    /** Two-sided (or one-sided) p-value. */
    p: number,
  ]

  /**
   * ANOVA summary produced by `jStat.regresst`.
   */
  interface RegressionAnova {
    /** Residual vectors (y - ŷ). */
    residuals: JStat;
    /** Sum of squares regression (SSR). */
    ssr: number;
    /** Mean square regression (MSR = SSR / df_model). */
    msr: number;
    /** Sum of squared errors (SSE). */
    sse: number;
    /** Mean squared error (MSE = SSE / df_resid). */
    mse: number;
    /** Total sum of squares (SST). */
    sst: number;
    /** Mean total sum of squares (MST = SST / (n - 1)). */
    mst: number;
    /** Coefficient of determination (clamped to >= 0). */
    r2: number;
    /** Adjusted R-squared (clamped to >= 0). */
    r2adj: number;
    /** F-ratio (MSR / MSE). */
    fratio: number;
    /** F-test p-value. */
    pvalue: number;
    /** Root mean squared error. */
    rmse: number;
  }

  /**
   * Full regression output from `jStat.regresst`.
   */
  interface RegressionResult {
    /** ANOVA table. */
    anova: RegressionAnova;
    /** Per-coefficient statistics [beta, sd, t, p]. */
    stats: RegressionCoefficientStats[];
    /** Predicted values (ŷ = X · β̂). */
    yBar: JStat;
    /** Estimated coefficient vector. */
    regress: JStat;
  }

  // -------------------------------------------------------------------------
  // Regression static methods (legacy API)
  // -------------------------------------------------------------------------

  /**
   * Builds an X design matrix from variadic column vectors by prepending a
   * column of 1's (intercept).
   *
   * @param arrays Column vectors (x1, x2, x3, …).
   * @returns A jStat instance wrapping an n × (k+1) matrix [1, x1, x2, …].
   */
  function buildxmatrix(...arrays: number[][]): JStat;

  /**
   * Builds an X design matrix from an array of column vectors by prepending
   * a column of 1's (intercept).
   *
   * @param arrays A 2D array where each row is a column vector.
   * @returns A jStat instance wrapping an n × (k+1) matrix [1, x1, x2, …].
   */
  function builddxmatrix(arrays: number[][] | JStat): JStat;

  /**
   * Builds an X design matrix from a jStat instance by prepending a column
   * of 1's (intercept).
   *
   * @param jMat The jStat instance whose columns serve as regressors.
   * @returns A jStat instance with an added intercept column.
   */
  function buildjxmatrix(jMat: JStat): JStat;

  /**
   * Builds a Y response matrix by transposing a 1D vector.
   *
   * @param array The response vector.
   * @returns A jStat instance wrapping the transposed (column) vector.
   */
  function buildymatrix(array: number[]): JStat;

  /**
   * Returns the transpose of a jStat instance as the Y matrix.
   *
   * @param jMat The jStat instance to transpose.
   * @returns The transposed jStat instance.
   */
  function buildjymatrix(jMat: JStat): JStat;

  /**
   * Performs matrix multiplication of two jStat instances.
   * Returns `undefined` when inner dimensions don't match (A.cols() != B.rows()).
   *
   * @param A Left operand (m × n).
   * @param B Right operand (n × p).
   * @returns A jStat instance wrapping the m × p result matrix, or `undefined` if A.cols != B.rows.
   */
  function matrixmult(A: JStat, B: JStat): JStat | undefined;

  /**
   * Element-wise subtraction of two jStat instances.
   *
   * @param A The minuend matrix.
   * @param B The subtrahend matrix (same shape as A).
   * @returns A jStat instance wrapping A − B.
   */
  function matrixsubtract(A: JStat, B: JStat): JStat;

  /**
   * Legacy ordinary least-squares regression.
   * Computes β̂ = (XᵀX)⁻¹ XᵀY.
   *
   * @deprecated Prefer `jStat.models.ols()` for a fully-featured OLS model.
   * @param jMatX The design matrix (X).
   * @param jMatY The response vector (Y).
   * @returns A jStat instance wrapping the estimated coefficient vector.
   */
  function regress(jMatX: JStat, jMatY: JStat): JStat;

  /**
   * Legacy regression with full ANOVA statistics and per-coefficient t-tests.
   *
   * @deprecated Prefer `jStat.models.ols()` for a fully-featured OLS model.
   * @param jMatX The design matrix (X).
   * @param jMatY The response vector (Y).
   * @param sides Number of tails for the t-test (1 or 2).
   * @returns A {@link RegressionResult} object.
   */
  function regresst(jMatX: JStat, jMatY: JStat, sides?: number): RegressionResult;

  /**
   * Returns Xᵀ · X for a jStat design matrix.
   *
   * @param jMatX The design matrix.
   * @returns A jStat instance wrapping the Gram matrix.
   */
  function xtranspx(jMatX: JStat): JStat;

  /**
   * Returns (Xᵀ · X)⁻¹ for a jStat design matrix.
   *
   * @param jMatX The design matrix.
   * @returns The inverse of the Gram matrix as a plain 2D array.
   */
  function xtranspxinv(jMatX: JStat): number[][];

  /**
   * Returns ŷ = X · β̂ (predicted values).
   *
   * @param jMatX The design matrix.
   * @param beta The coefficient vector.
   * @returns A new jStat instance wrapping the predicted values.
   */
  function jMatYBar(jMatX: JStat, beta: JStat): JStat;

  /**
   * Returns the residual vector y − ŷ.
   *
   * @param jMatY The observed response.
   * @param jMatYBar The predicted response.
   * @returns A jStat instance wrapping the residuals.
   */
  function residuals(jMatY: JStat, jMatYBar: JStat): JStat;

  /**
   * Returns the sum of squares regression: Σ (ŷᵢ − ȳ)².
   *
   * @param jMatYBar The predicted values.
   * @param yAverage The mean of the observed response.
   * @returns The SSR scalar.
   */
  function ssr(jMatYBar: number[], yAverage: number): number;

  /**
   * Returns the sum of squared errors: Σ (yᵢ − ŷᵢ)².
   *
   * @param jMatY The observed response.
   * @param jMatYBar The predicted response.
   * @returns The SSE scalar.
   */
  function sse(jMatY: number[], jMatYBar: number[]): number;

  /**
   * Returns the total sum of squares: Σ (yᵢ − ȳ)².
   *
   * @param jMatY The observed response.
   * @param yAverage The mean of the observed response.
   * @returns The SST scalar.
   */
  function sst(jMatY: number[], yAverage: number): number;
}
