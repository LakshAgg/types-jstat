declare namespace jStat {
  // -------------------------------------------------------------------------
  // Statistical Tests static methods
  // -------------------------------------------------------------------------

  /**
   * Returns the z-score for a value against a mean and standard deviation.
   *
   * @param value The observed value.
   * @param mean The population mean.
   * @param sd The population standard deviation.
   * @returns (value − mean) / sd.
   *
   * @example
   * ```typescript
   * jStat.zscore(85, 75, 10); // → 1 (one standard deviation above mean)
   * ```
   */
  function zscore(value: number, mean: number, sd: number): number;
  /**
   * Returns the z-score for a value against sample data.
   *
   * @param value The observed value.
   * @param array The sample data.
   * @param flag When `true`, compute sample standard deviation (divides by n−1).
   * @returns (value − mean) / stdev.
   *
   * @example
   * ```typescript
   * jStat.zscore(90, [85, 87, 88, 92, 90]); // → z-score using sample std
   * ```
   */
  function zscore(value: number, array: ReadonlyArray<number>, flag?: boolean): number;

  /**
   * Returns the p-value of a two-sided or one-sided z-test.
   * @param zscore The precomputed z-score.
   * @param sides Number of tails (1 for one-sided, 2 for two-sided).
   * @returns The p-value.
   */
  function ztest(zscore: number, sides?: 1 | 2): number;
  /**
   * Returns the p-value of a z-test given summary statistics.
   * @param value The observed value.
   * @param mean The population mean.
   * @param sd The population standard deviation.
   * @param sides Number of tails.
   * @returns The p-value.
   */
  function ztest(value: number, mean: number, sd: number, sides?: 1 | 2): number;
  /**
   * Returns the p-value of a z-test from sample data.
   *
   * @param value The observed value.
   * @param array The sample data.
   * @param sides Number of tails (1 = one-sided, 2 = two-sided).
   * @param flag When `true`, compute sample standard deviation (divides by n−1).
   * @returns The p-value.
   *
   * @example
   * ```typescript
   * // Two-sided z-test: is 95 significantly different from this sample?
   * const pValue = jStat.ztest(95, [90, 92, 88, 91, 93, 89], 2);
   *
   * // One-sided z-test using sample std (flag = true)
   * jStat.ztest(100, [95, 97, 99, 101], 1, true);
   * ```
   */
  function ztest(
    value: number,
    array: ReadonlyArray<number>,
    sides?: 1 | 2,
    flag?: boolean
  ): number;

  /**
   * Returns the t-score for a value against sample data.
   * @param value The observed value.
   * @param array The sample data.
   * @returns (value − mean) / (stdev / √n).
   */
  function tscore(value: number, array: ReadonlyArray<number>): number;
  /**
   * Returns the t-score given summary statistics.
   * @param value The observed value.
   * @param mean The sample mean.
   * @param sd The sample standard deviation.
   * @param n The sample size.
   * @returns (value − mean) / (sd / √n).
   */
  function tscore(value: number, mean: number, sd: number, n: number): number;

  /**
   * Returns the p-value of a t-test from sample data.
   * @param value The observed value.
   * @param array The sample data.
   * @param sides Number of tails.
   * @returns The p-value.
   */
  function ttest(value: number, array: ReadonlyArray<number>, sides?: 1 | 2): number;
  /**
   * Returns the p-value of a t-test from a precomputed t-score.
   * @param tscore The precomputed t-score.
   * @param n The sample size (used to compute degrees of freedom).
   * @param sides Number of tails.
   * @returns The p-value.
   */
  function ttest(tscore: number, n: number, sides?: 1 | 2): number;
  /**
   * Returns the p-value of a t-test given summary statistics.
   * @param value The observed value.
   * @param mean The sample mean.
   * @param sd The sample standard deviation.
   * @param n The sample size.
   * @param sides Number of tails.
   * @returns The p-value.
   */
  function ttest(
    value: number,
    mean: number,
    sd: number,
    n: number,
    sides?: 1 | 2
  ): number;

  /**
   * Returns the F-score of a one-way ANOVA from variadic arrays.
   * @param array1 First group.
   * @param array2 Second group.
   * @param arrays Additional groups.
   * @returns The F-statistic (explained variance / unexplained variance).
   */
  function anovafscore(
    array1: ReadonlyArray<number>,
    array2: ReadonlyArray<number>,
    ...arrays: ReadonlyArray<number>[]
  ): number;
  /**
   * Returns the F-score of a one-way ANOVA from an array of groups.
   * @param arrays An array of groups (each group is a number array).
   * @returns The F-statistic.
   */
  function anovafscore(arrays: ReadonlyArray<ReadonlyArray<number>>): number;
  /**
   * Returns the p-value of a one-way ANOVA.
   * @param fscore The precomputed F-statistic.
   * @param df1 Degrees of freedom between groups.
   * @param df2 Degrees of freedom within groups.
   * @returns The p-value.
   */
  function anovaftest(fscore: number, df1: number, df2: number): number;
  /**
   * Returns the p-value of a one-way ANOVA from sample groups.
   * @param array1 First group.
   * @param array2 Second group.
   * @param arrays Additional groups.
   * @returns The p-value.
   */
  function anovaftest(
    array1: ReadonlyArray<number>,
    array2: ReadonlyArray<number>,
    ...arrays: ReadonlyArray<number>[]
  ): number;

  /**
   * Returns the p-value of an F-test.
   * @param fscore The F-statistic.
   * @param df1 Numerator degrees of freedom.
   * @param df2 Denominator degrees of freedom.
   * @returns The p-value.
   */
  function ftest(fscore: number, df1: number, df2: number): number;

  /**
   * Returns the q-score for Tukey's range test given two means.
   * @param mean1 Mean of the first group.
   * @param mean2 Mean of the second group.
   * @param n1 Size of the first group.
   * @param n2 Size of the second group.
   * @param sd Pooled standard deviation.
   * @returns The studentized range statistic q.
   */
  function qscore(
    mean1: number,
    mean2: number,
    n1: number,
    n2: number,
    sd: number
  ): number;
  /**
   * Returns the q-score for Tukey's range test from sample arrays.
   * @param array1 First group.
   * @param array2 Second group.
   * @param sd Pooled standard deviation.
   * @returns The studentized range statistic q.
   */
  function qscore(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>, sd: number): number;

  /**
   * Returns the p-value for Tukey's range test from a q-score.
   * @param qscore The studentized range statistic.
   * @param n Total sample size.
   * @param k Number of groups.
   * @returns The p-value.
   */
  function qtest(qscore: number, n: number, k: number): number;
  /**
   * Returns the p-value for Tukey's range test from sample arrays.
   * @param array1 First group.
   * @param array2 Second group.
   * @param sd Pooled standard deviation.
   * @param n Total sample size.
   * @param k Number of groups.
   * @returns The p-value.
   */
  function qtest(
    array1: ReadonlyArray<number>,
    array2: ReadonlyArray<number>,
    sd: number,
    n: number,
    k: number
  ): number;
  /**
   * Returns the p-value for Tukey's range test from summary statistics.
   * @param mean1 Mean of the first group.
   * @param mean2 Mean of the second group.
   * @param n1 Size of the first group.
   * @param n2 Size of the second group.
   * @param sd Pooled standard deviation.
   * @param n Total sample size.
   * @param k Number of groups.
   * @returns The p-value.
   */
  function qtest(
    mean1: number,
    mean2: number,
    n1: number,
    n2: number,
    sd: number,
    n: number,
    k: number
  ): number;

  /**
   * Returns pairwise Tukey HSD results for all groups.
   * @param arrays An array of groups.
   * @returns An array of `[indices, pValue]` tuples.
   */
  function tukeyhsd(arrays: ReadonlyArray<ReadonlyArray<number>>): Array<[[number, number], number]>;

  /**
   * Returns a normal-distribution confidence interval.
   * @param value The sample mean or observed value.
   * @param alpha The significance level (e.g. 0.05 for 95% CI).
   * @param sd The standard deviation.
   * @param n The sample size.
   * @returns A tuple [lowerBound, upperBound].
   */
  function normalci(value: number, alpha: number, sd: number, n: number): number[];
  /**
   * Returns a normal-distribution confidence interval from sample data.
   * @param value The observed value.
   * @param alpha The significance level.
   * @param array The sample data.
   * @returns A tuple [lowerBound, upperBound].
   */
  function normalci(value: number, alpha: number, array: ReadonlyArray<number>): number[];

  /**
   * Returns a t-distribution confidence interval.
   * @param value The sample mean or observed value.
   * @param alpha The significance level.
   * @param sd The standard deviation.
   * @param n The sample size.
   * @returns A tuple [lowerBound, upperBound].
   */
  function tci(value: number, alpha: number, sd: number, n: number): number[];
  /**
   * Returns a t-distribution confidence interval from sample data.
   * @param value The observed value.
   * @param alpha The significance level.
   * @param array The sample data.
   * @returns A tuple [lowerBound, upperBound].
   */
  function tci(value: number, alpha: number, array: ReadonlyArray<number>): number[];

  /**
   * Returns whether a p-value is statistically significant at the given alpha level.
   * @param pvalue The p-value.
   * @param alpha The significance level.
   * @returns `true` if `pvalue < alpha`.
   */
  function significant(pvalue: number, alpha: number): boolean;
}