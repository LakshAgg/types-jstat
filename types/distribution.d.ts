declare namespace jStat {
  // -------------------------------------------------------------------------
  // Continuous Distribution namespaces
  // -------------------------------------------------------------------------

  // Beta
  namespace beta {
    function pdf(x: number, alpha: number, beta: number): number;
    function cdf(x: number, alpha: number, beta: number): number;
    function inv(p: number, alpha: number, beta: number): number;
    function mean(alpha: number, beta: number): number;
    function median(alpha: number, beta: number): number;
    function mode(alpha: number, beta: number): number;
    function sample(alpha: number, beta: number): number;
    function variance(alpha: number, beta: number): number;
  }
  /**
   * Beta distribution.
   * Returns a distribution with pdf/cdf/inv/mean/median/mode/sample/variance methods.
   *
   * @example
   * ```typescript
   * const betaDist = jStat.beta(2, 5);
   * const density = betaDist.pdf(0.5);
   * ```
   */
  function beta(alpha: number, beta: number): ContinuousDistribution;

  // Cauchy (uses 'local' for location, matching docs)
  namespace cauchy {
    function pdf(x: number, local: number, scale: number): number;
    function cdf(x: number, local: number, scale: number): number;
    function inv(p: number, local: number, scale: number): number;
    function median(local: number, scale: number): number;
    function mode(local: number, scale: number): number;
    function sample(local: number, scale: number): number;
  }
  /** Cauchy distribution with location and scale parameters. */
  function cauchy(local: number, scale: number): Omit<ContinuousDistribution, "mean" | "variance">;

  // Central F (no median)
  namespace centralF {
    function pdf(x: number, df1: number, df2: number): number;
    function cdf(x: number, df1: number, df2: number): number;
    function inv(p: number, df1: number, df2: number): number;
    function mean(df1: number, df2: number): number;
    function mode(df1: number, df2: number): number;
    function sample(df1: number, df2: number): number;
    function variance(df1: number, df2: number): number;
  }
  /** Central F distribution used for ANOVA and related tests. */
  function centralF(df1: number, df2: number): ContinuousNoMedian;

  // Chi-square
  namespace chisquare {
    function pdf(x: number, dof: number): number;
    function cdf(x: number, dof: number): number;
    function inv(p: number, dof: number): number;
    function mean(dof: number): number;
    function median(dof: number): number;
    function mode(dof: number): number;
    function sample(dof: number): number;
    function variance(dof: number): number;
  }
  /** Chi-square distribution. */
  function chisquare(dof: number): ContinuousDistribution;

  // Exponential
  namespace exponential {
    function pdf(x: number, rate: number): number;
    function cdf(x: number, rate: number): number;
    function inv(p: number, rate: number): number;
    function mean(rate: number): number;
    function median(rate: number): number;
    function mode(rate: number): number;
    function sample(rate: number): number;
    function variance(rate: number): number;
  }
  /** Exponential distribution with rate parameter lambda. */
  function exponential(rate: number): ContinuousDistribution;

  // Gamma (no median)
  namespace gamma {
    function pdf(x: number, shape: number, scale: number): number;
    function cdf(x: number, shape: number, scale: number): number;
    function inv(p: number, shape: number, scale: number): number;
    function mean(shape: number, scale: number): number;
    function mode(shape: number, scale: number): number;
    function sample(shape: number, scale: number): number;
    function variance(shape: number, scale: number): number;
  }
  /** Gamma distribution parameterized by shape and scale. */
  function gamma(shape: number, scale: number): ContinuousNoMedian;

  // Inverse Gamma (no median)
  namespace invgamma {
    function pdf(x: number, shape: number, scale: number): number;
    function cdf(x: number, shape: number, scale: number): number;
    function inv(p: number, shape: number, scale: number): number;
    function mean(shape: number, scale: number): number;
    function mode(shape: number, scale: number): number;
    function sample(shape: number, scale: number): number;

    // shape <= 2: variance is undefined
    function variance(shape: number, scale: number): number | undefined;
  }
  /** Inverse Gamma distribution parameterized by shape and scale. */
  function invgamma(shape: number, scale: number): ContinuousNoMedian;

  // Kumaraswamy (no sample)
  namespace kumaraswamy {
    function pdf(x: number, a: number, b: number): number;
    function cdf(x: number, a: number, b: number): number;
    function inv(p: number, a: number, b: number): number;
    function mean(a: number, b: number): number;
    function median(a: number, b: number): number;
    function mode(a: number, b: number): number;

    /**
     * @deprecated variance is not implemented for kumaraswamy distribution
     */
    function variance(a: number, b: number): number;
  }
  /** Kumaraswamy distribution. */
  function kumaraswamy(a: number, b: number): Omit<ContinuousNoSample, "variance">;

  // Log-normal
  namespace lognormal {
    function pdf(x: number, mu: number, sigma: number): number;
    function cdf(x: number, mu: number, sigma: number): number;
    function inv(p: number, mu: number, sigma: number): number;
    function mean(mu: number, sigma: number): number;
    function median(mu: number, sigma: number): number;
    function mode(mu: number, sigma: number): number;
    function sample(mu: number, sigma: number): number;
    function variance(mu: number, sigma: number): number;
  }
  /** Log-normal distribution. */
  function lognormal(mu: number, sigma: number): ContinuousDistribution;

  // Normal
  namespace normal {
    function pdf(x: number, mean: number, std: number): number;
    function cdf(x: number, mean: number, std: number): number;
    function inv(p: number, mean: number, std: number): number;
    function mean(mean: number, std: number): number;
    function median(mean: number, std: number): number;
    function mode(mean: number, std: number): number;
    function sample(mean: number, std: number): number;
    function variance(mean: number, std: number): number;
  }
  /** Normal distribution. */
  function normal(mean: number, std: number): ContinuousDistribution;

  // Laplace (no inv)
  namespace laplace {
    function pdf(x: number, mu: number, b: number): number;
    function cdf(x: number, mu: number, b: number): number;
    function mean(mu: number, b: number): number;
    function median(mu: number, b: number): number;
    function mode(mu: number, b: number): number;
    function sample(mu: number, b: number): number;
    function variance(mu: number, b: number): number;
  }
  /** Laplace (double exponential) distribution. */
  function laplace(mu: number, b: number): ContinuousNoInv;

  // Non-central t (pdf and cdf only)
  namespace noncentralt {
    function pdf(x: number, dof: number, ncp: number): number;
    function cdf(x: number, dof: number, ncp: number): number;
  }
  /** Non-central t distribution. */
  function noncentralt(dof: number, ncp: number): NoncentralTInstance;

  // Pareto (no sample)
  namespace pareto {
    function pdf(x: number, scale: number, shape: number): number;
    function cdf(x: number, scale: number, shape: number): number;
    function inv(p: number, scale: number, shape: number): number;
    function mean(scale: number, shape: number): number;
    function median(scale: number, shape: number): number;
    function mode(scale: number, shape: number): number;

    // shape <= 2: variance is undefined
    function variance(scale: number, shape: number): number | undefined;
  }
  /** Pareto distribution. */
  function pareto(scale: number, shape: number): ContinuousNoSample;

  // Student's t
  namespace studentt {
    function pdf(x: number, dof: number): number;
    function cdf(x: number, dof: number): number;
    function inv(p: number, dof: number): number;
    function mean(dof: number): number;
    function median(dof: number): number;
    function mode(dof: number): number;
    function sample(dof: number): number;
    function variance(dof: number): number;
  }
  /** Student's t distribution. */
  function studentt(dof: number): ContinuousDistribution;

  // Tukey (cdf and inv only)
  namespace tukey {
    function cdf(q: number, nmeans: number, dof: number): number;
    function inv(p: number, nmeans: number, dof: number): number;
  }
  /** Tukey range distribution. */
  function tukey(nmeans: number, dof: number): TukeyInstance;

  // Weibull
  namespace weibull {
    function pdf(x: number, scale: number, shape: number): number;
    function cdf(x: number, scale: number, shape: number): number;
    function inv(p: number, scale: number, shape: number): number;
    function mean(scale: number, shape: number): number;
    function median(scale: number, shape: number): number;
    function mode(scale: number, shape: number): number;
    function sample(scale: number, shape: number): number;
    function variance(scale: number, shape: number): number;
  }
  /** Weibull distribution. */
  function weibull(scale: number, shape: number): ContinuousDistribution;

  // Uniform
  namespace uniform {
    function pdf(x: number, a: number, b: number): number;
    function cdf(x: number, a: number, b: number): number;
    function inv(p: number, a: number, b: number): number;
    function mean(a: number, b: number): number;
    /**
     * @deprecated median is broken: always NnA
     */
    function median(a: number, b: number): number;
    /**
     * @deprecated not implemented
     */
    function mode(a: number, b: number): number;
    function sample(a: number, b: number): number;
    function variance(a: number, b: number): number;
  }
  /** Uniform distribution on the interval [a, b]. */
  function uniform(a: number, b: number): Omit<ContinuousDistribution, "median" | "mode">;

  // Arcsine
  namespace arcsine {
    function pdf(x: number, a: number, b: number): number;
    function cdf(x: number, a: number, b: number): number;
    function inv(p: number, a: number, b: number): number;
    function mean(a: number, b: number): number;
    function median(a: number, b: number): number;
    /**
     * @deprecated not implemented
     */
    function mode(a: number, b: number): number;
    function sample(a: number, b: number): number;
    function variance(a: number, b: number): number;
  }
  /** Arcsine distribution. */
  function arcsine(a: number, b: number): Omit<ContinuousDistribution, "mode">;

  // Triangular
  namespace triangular {
    function pdf(x: number, a: number, b: number, c: number): number;
    function cdf(x: number, a: number, b: number, c: number): number;
    function inv(p: number, a: number, b: number, c: number): number;
    function mean(a: number, b: number, c: number): number;
    function median(a: number, b: number, c: number): number;
    function mode(a: number, b: number, c: number): number;
    function sample(a: number, b: number, c: number): number;
    function variance(a: number, b: number, c: number): number;
  }
  /** Triangular distribution. */
  function triangular(a: number, b: number, c: number): TriangularInstance;

  // -------------------------------------------------------------------------
  // Discrete Distribution namespaces
  // -------------------------------------------------------------------------

  // Binomial
  namespace binomial {
    function pdf(k: number, n: number, p: number): number;
    function cdf(k: number, n: number, p: number): number;
  }
  /** Binomial distribution. */
  function binomial(n: number, p: number): DiscreteBasic;

  // Negative Binomial
  namespace negbin {
    function pdf(k: number, r: number, p: number): number;
    function cdf(x: number, r: number, p: number): number;
  }
  /** Negative binomial distribution. */
  function negbin(r: number, p: number): DiscreteBasic;

  // Hypergeometric
  namespace hypgeom {
    function pdf(k: number, N: number, m: number, n: number): number;
    function cdf(x: number, N: number, m: number, n: number): number;
  }
  /** Hypergeometric distribution. */
  function hypgeom(N: number, m: number, n: number): DiscreteBasic;

  // Poisson
  namespace poisson {
    function pdf(k: number, lambda: number): number;
    function cdf(x: number, lambda: number): number;
    function sample(lambda: number): number;
    function sampleSmall(lambda: number): number;
    function sampleLarge(lambda: number): number;
  }
  /** Poisson distribution. */
  function poisson(lambda: number): PoissonInstance;
}
