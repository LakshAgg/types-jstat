declare namespace jStat {
  // -------------------------------------------------------------------------
  // Special Functions static methods
  // -------------------------------------------------------------------------

  /**
   * Evaluates the Beta function B(x, y).
   *
   * @param x First parameter (must be positive).
   * @param y Second parameter (must be positive).
   * @returns B(x, y) = Γ(x) × Γ(y) / Γ(x + y), or `undefined` if either parameter
   *   is non-positive.
   */
  function betafn(x: number, y: number): number | undefined;

  /**
   * Evaluates the natural logarithm of the Beta function.
   *
   * @param x First parameter.
   * @param y Second parameter.
   * @returns ln(B(x, y)) = ln(Γ(x)) + ln(Γ(y)) − ln(Γ(x + y)).
   */
  function betaln(x: number, y: number): number;

  /**
   * Returns the continued fraction approximation for the incomplete Beta function Iₓ(a, b).
   * Uses modified Lentz's method.
   *
   * @param x The evaluation point (should be in [0, 1]).
   * @param a First shape parameter.
   * @param b Second shape parameter.
   * @returns The continued fraction value.
   */
  function betacf(x: number, a: number, b: number): number;

  /**
   * Returns the inverse of the incomplete Beta function.
   *
   * @param p The probability (target value of Iₓ(a, b)), in [0, 1].
   * @param a First shape parameter.
   * @param b Second shape parameter.
   * @returns The value x such that Iₓ(a, b) = p.
   */
  function ibetainv(p: number, a: number, b: number): number;

  /**
   * Returns the incomplete Beta function Iₓ(a, b).
   *
   * @param x The evaluation point.
   * @param a First shape parameter.
   * @param b Second shape parameter.
   * @returns Iₓ(a, b) when x ∈ [0, 1]; `false` otherwise.
   */
  function ibeta(x: number, a: number, b: number): number | false;

  /**
   * Returns the Gamma function Γ(x).
   *
   * @param x The input value.
   * @returns Γ(x), or `Infinity` for x > 171.62 or non-positive integers.
   */
  function gammafn(x: number): number;

  /**
   * Returns the natural logarithm of the Gamma function.
   *
   * @param x The input value.
   * @returns ln(Γ(x)).
   */
  function gammaln(x: number): number;

  /**
   * Returns the lower incomplete gamma function γ(a, x) = ∫₀ˣ tᵃ⁻¹ e⁻ᵗ dt.
   *
   * @param a The shape parameter.
   * @param x The upper limit of integration.
   * @returns γ(a, x) = P(a, x) × Γ(a).
   */
  function gammap(a: number, x: number): number;

  /**
   * Returns the lower regularized incomplete gamma function P(a, x).
   *
   * @param a The shape parameter.
   * @param x The upper limit of integration.
   * @returns P(a, x) = γ(a, x) / Γ(a). Returns `NaN` if x < 0 or a ≤ 0.
   */
  function lowRegGamma(a: number, x: number): number;

  /**
   * Returns the inverse of the lower regularized incomplete gamma function.
   *
   * @param p The probability value P(a, x) in [0, 1].
   * @param a The shape parameter.
   * @returns The value x such that P(a, x) = p.
   */
  function gammapinv(p: number, a: number): number;

  /**
   * Returns the natural logarithm of n! = ln(Γ(n + 1)).
   *
   * @param n The input value.
   * @returns ln(n!) for n ≥ 0, `NaN` for n < 0.
   */
  function factorialln(n: number): number;

  /**
   * Returns the factorial n! = Γ(n + 1).
   *
   * @param n The input value.
   * @returns n! for n ≥ 0, `NaN` for n < 0.
   */
  function factorial(n: number): number;

  /**
   * Returns the number of combinations of n items taken m at a time (n choose m).
   *
   * @param n The total number of items.
   * @param m The number of items to choose.
   * @returns n! / (m! × (n − m)!).
   */
  function combination(n: number, m: number): number;

  /**
   * Returns the number of permutations of n items taken m at a time.
   *
   * @param n The total number of items.
   * @param m The number of items to arrange.
   * @returns n! / (n − m)!.
   */
  function permutation(n: number, m: number): number;

  /**
   * Returns the error function erf(x).
   *
   * @param x The input value.
   * @returns erf(x) = (2/√π) ∫₀ˣ e⁻ᵗ² dt.
   */
  function erf(x: number): number;

  /**
   * Returns the complementary error function erfc(x) = 1 − erf(x).
   *
   * @param x The input value.
   * @returns erfc(x).
   */
  function erfc(x: number): number;

  /**
   * Returns the inverse of the complementary error function.
   *
   * @param p The probability value.
   * @returns The value x such that erfc(x) = p.
   */
  function erfcinv(p: number): number;

  /**
   * Returns a single standard normal deviate (μ = 0, σ = 1).
   *
   * @returns A random value from N(0, 1).
   */
  function randn(): number;

  /**
   * Returns an n × m matrix of standard normal deviates (μ = 0, σ = 1).
   *
   * @param n Number of rows.
   * @param m Number of columns (defaults to n).
   * @returns An n × m matrix of random values from N(0, 1).
   */
  function randn(n: number, m?: number): number[][];

  /**
   * Returns a single gamma deviate with the given shape parameter.
   * Uses the Marsaglia and Tsang method.
   *
   * @param shape The shape parameter (α). Defaults to 1 if 0.
   * @returns A random value from Gamma(α, 1).
   */
  function randg(shape: number): number;

  /**
   * Returns an n × m matrix of gamma deviates with the given shape parameter.
   *
   * @param shape The shape parameter (α). Defaults to 1 if 0.
   * @param n Number of rows.
   * @param m Number of columns (defaults to n).
   * @returns An n × m matrix of random values from Gamma(α, 1).
   */
  function randg(shape: number, n: number, m?: number): number[][];
}