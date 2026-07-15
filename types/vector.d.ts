declare namespace jStat {
  // -------------------------------------------------------------------------
  // Vector static methods
  // -------------------------------------------------------------------------

  /**
   * Returns the sum of all elements in a vector.
   *
   * @param array The input vector.
   * @returns The arithmetic sum.
   */
  function sum(array: ReadonlyArray<number>): number;

  /**
   * Returns the sum of squares of all elements.
   *
   * @param array The input vector.
   * @returns Σ xᵢ².
   */
  function sumsqrd(array: ReadonlyArray<number>): number;

  /**
   * Returns the sum of squared errors (SSE) — deviations from the mean.
   *
   * @param array The input vector.
   * @returns Σ (xᵢ − mean)².
   */
  function sumsqerr(array: ReadonlyArray<number>): number;

  /**
   * Returns the sum of elements. Identical to {@link sum}.
   *
   * @param array The input vector.
   * @returns The arithmetic sum.
   */
  function sumrow(array: ReadonlyArray<number>): number;

  /**
   * Returns the product of all elements.
   *
   * @param array The input vector.
   * @returns Π xᵢ.
   */
  function product(array: ReadonlyArray<number>): number;

  /**
   * Returns the minimum value in the vector.
   *
   * @param array The input vector.
   * @returns The smallest element.
   */
  function min(array: ReadonlyArray<number>): number;

  /**
   * Returns the maximum value in the vector.
   *
   * @param array The input vector.
   * @returns The largest element.
   */
  function max(array: ReadonlyArray<number>): number;

  /**
   * Returns the arithmetic mean (average).
   *
   * @param array The input vector.
   * @returns Σ xᵢ / n.
   */
  function mean(array: ReadonlyArray<number>): number;

  /**
   * Returns the mean squared error (MSE) — mean of squared deviations from the mean.
   *
   * @param array The input vector.
   * @returns Σ (xᵢ − mean)² / n.
   */
  function meansqerr(array: ReadonlyArray<number>): number;

  /**
   * Returns the geometric mean of the elements.
   *
   * @param array The input vector (all elements should be non-negative).
   * @returns (Π xᵢ)^(1/n).
   */
  function geomean(array: ReadonlyArray<number>): number;

  /**
   * Returns the median — the middle value when sorted.
   * For even-length arrays, returns the average of the two central values.
   *
   * @param array The input vector.
   * @returns The median value.
   */
  function median(array: ReadonlyArray<number>): number;

  /**
   * Returns the cumulative sum of elements.
   *
   * @param array The input vector.
   * @returns A vector where each element is the running total.
   *
   * @example
   * ```typescript
   * jStat.cumsum([1, 2, 3, 4]); // → [1, 3, 6, 10]
   * ```
   */
  function cumsum(array: ReadonlyArray<number>): number[];

  /**
   * Returns the cumulative product of elements.
   *
   * @param array The input vector.
   * @returns A vector where each element is the running product.
   *
   * @example
   * ```typescript
   * jStat.cumprod([1, 2, 3, 4]); // → [1, 2, 6, 24]
   * ```
   */
  function cumprod(array: ReadonlyArray<number>): number[];

  /**
   * Returns the successive differences between consecutive elements (Δx = xᵢ − xᵢ₋₁).
   *
   * @param array The input vector.
   * @returns A vector of length n−1 containing forward differences.
   *
   * @example
   * ```typescript
   * jStat.diff([1, 5, 2, 8]); // → [4, -3, 6]
   * ```
   */
  function diff(array: ReadonlyArray<number>): number[];

  /**
   * Returns the ranks of elements with ties averaged.
   *
   * @param array The input vector.
   * @returns A vector of the same length containing averaged ranks (1-based).
   *
   * @example
   * ```typescript
   * jStat.rank([3, 1, 2, 1]); // → [3.5, 1.5, 3, 1.5]
   * ```
   */
  function rank(array: ReadonlyArray<number>): number[];

  /**
   * Returns the mode(s) — the most frequent value(s).
   * If multiple values share the highest frequency, returns all of them.
   * If there's a unique mode, returns a single number.
   *
   * @param array The input vector.
   * @returns A single number (unique mode) or an array of numbers (multiple modes).
   *
   * @example
   * ```typescript
   * jStat.mode([1, 2, 2, 3]);     // → 2
   * jStat.mode([1, 1, 2, 2]);     // → [1, 2]
   * jStat.mode([1, 2, 3]);        // → false
   * ```
   */
  function mode(array: ReadonlyArray<number>): number | number[];

  /**
   * Returns the range — the difference between maximum and minimum.
   *
   * @param array The input vector.
   * @returns max − min.
   */
  function range(array: ReadonlyArray<number>): number;

  /**
   * Returns the variance.
   *
   * @param array The input vector.
   * @param sample When `true`, computes sample variance (divides by n−1).
   *   When `false` or omitted, computes population variance (divides by n).
   * @returns The variance.
   */
  function variance(array: ReadonlyArray<number>, sample?: boolean): number;

  /**
   * Returns the pooled variance across multiple vectors.
   *
   * @param arrays An array of vectors.
   * @returns The pooled variance Σ SSEᵢ / (Σ nᵢ − k), where k is the number of vectors.
   */
  function pooledvariance(arrays: ReadonlyArray<ReadonlyArray<number>>): number;

  /**
   * Returns the deviation from the mean for each element.
   *
   * @param array The input vector.
   * @returns A vector where each element is xᵢ − mean.
   */
  function deviation(array: ReadonlyArray<number>): number[];

  /**
   * Returns the standard deviation.
   *
   * @param array The input vector.
   * @param sample When `true`, computes sample standard deviation (from sample variance).
   *   When `false` or omitted, computes population standard deviation.
   * @returns The standard deviation.
   */
  function stdev(array: ReadonlyArray<number>, sample?: boolean): number;

  /**
   * Returns the pooled standard deviation across multiple vectors.
   *
   * @param arrays An array of vectors.
   * @returns The square root of the pooled variance.
   */
  function pooledstdev(arrays: ReadonlyArray<ReadonlyArray<number>>): number;

  /**
   * Returns the mean absolute deviation from the mean.
   *
   * @param array The input vector.
   * @returns Σ |xᵢ − mean| / n.
   */
  function meandev(array: ReadonlyArray<number>): number;

  /**
   * Returns the median absolute deviation from the median.
   *
   * @param array The input vector.
   * @returns median(|xᵢ − median|).
   */
  function meddev(array: ReadonlyArray<number>): number;

  /**
   * Returns the standardized moment of order `n`.
   * This is the general form of skewness (n=3) and kurtosis (n=4).
   *
   * @param array The input vector.
   * @param n The moment order. Use 3 for skewness, 4 for kurtosis (add 3 for excess kurtosis).
   * @returns (1/n) Σ ((xᵢ − mean) / stdev)ⁿ.
   */
  function stanMoment(array: ReadonlyArray<number>, n: number): number;

  /**
   * Returns the (Pearson's) moment coefficient of skewness.
   * Measures the asymmetry of the distribution.
   *
   * @param array The input vector.
   * @returns A value where positive indicates right-skew and negative indicates left-skew.
   */
  function skewness(array: ReadonlyArray<number>): number;

  /**
   * Returns the (Pearson's) excess kurtosis.
   * Measures the "tailedness" of the distribution relative to a normal distribution.
   *
   * @param array The input vector.
   * @returns Excess kurtosis (normal distribution has kurtosis = 3, so excess = 0).
   */
  function kurtosis(array: ReadonlyArray<number>): number;

  /**
   * Returns the coefficient of variation — ratio of standard deviation to mean.
   *
   * @param array The input vector.
   * @returns stdev / mean.
   */
  function coeffvar(array: ReadonlyArray<number>): number;

  /**
   * Returns the three quartiles (Q1, Q2, Q3) of the vector.
   *
   * @param array The input vector.
   * @returns An array of exactly 3 numbers: [Q1, Q2, Q3].
   *
   * @example
   * ```typescript
   * jStat.quartiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
   * // → [3.25, 6.5, 9.75] (approximate)
   * ```
   */
  function quartiles(array: ReadonlyArray<number>): number[];

  /**
   * Returns quantiles at the given probability points.
   * Uses a configurable interpolation method (defaults to scipy's type 7).
   *
   * @param dataArray The input vector.
   * @param quantilesArray Array of probability points in [0, 1].
   * @param alphap Interpolation parameter (default 3/8).
   * @param betap Interpolation parameter (default 3/8).
   * @returns An array of quantile values, one per probability point.
   */
  function quantiles(
    dataArray: ReadonlyArray<number>,
    quantilesArray: ReadonlyArray<number>,
    alphap?: number,
    betap?: number
  ): number[];

  /**
   * Returns the k-th percentile of values in the vector.
   *
   * @param dataArray The input vector.
   * @param k The percentile (0 to 1 inclusive).
   * @param exclusive When `true`, excludes both endpoints of the range.
   * @returns The interpolated percentile value.
   */
  function percentile(
    dataArray: ReadonlyArray<number>,
    k: number,
    exclusive?: boolean
  ): number;

  /**
   * Returns the percentile rank of a score within the data set.
   *
   * @param dataArray The input vector.
   * @param score The score to evaluate.
   * @param kind `'strict'` counts values strictly less than score;
   *   `'weak'` (default) counts values less than or equal.
   * @returns A percentage value in [0, 1].
   */
  function percentileOfScore(
    dataArray: ReadonlyArray<number>,
    score: number,
    kind?: 'strict' | 'weak'
  ): number;

  /**
   * Returns a histogram (bin count) of the data.
   *
   * @param dataArray The input vector.
   * @param numBins Number of bins (default 4).
   * @returns An array of length `numBins` containing bin counts.
   */
  function histogram(
    dataArray: ReadonlyArray<number>,
    numBins?: number
  ): number[];

  /**
   * Returns the covariance between two vectors.
   *
   * @param array1 The first vector.
   * @param array2 The second vector (same length as `array1`).
   * @returns Σ (xᵢ − mean(x)) × (yᵢ − mean(y)) / (n − 1).
   */
  function covariance(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;

  /**
   * Returns the Pearson correlation coefficient (ρ) between two vectors.
   *
   * @param array1 The first vector.
   * @param array2 The second vector (same length as `array1`).
   * @returns The correlation coefficient in [−1, 1].
   */
  function corrcoeff(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;

  /**
   * Returns the Spearman rank correlation coefficient between two vectors.
   * Computes Pearson's ρ on the ranks of the data.
   *
   * @param array1 The first vector.
   * @param array2 The second vector (same length as `array1`).
   * @returns The Spearman correlation coefficient in [−1, 1].
   */
  function spearmancoeff(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;

  /**
   * Returns unique (distinct) values from the vector, preserving first-occurrence order.
   *
   * @param array The input vector.
   * @returns An array of unique values.
   */
  function unique(array: ReadonlyArray<number>): number[];
}