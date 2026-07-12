declare namespace jStat {
  // -------------------------------------------------------------------------
  // Type declarations
  // -------------------------------------------------------------------------

  interface DimensionsResult {
    rows: number;
    cols: number;
  }

  type SliceDescriptor = {
    start?: number;
    end?: number;
    step?: number;
  };


  interface SliceOptions {
    start?: number;
    end?: number;
    row?: SliceOptions;
    col?: SliceOptions;
  }
  
  interface Utils {
    calcRdx(num0: number, num1: number): number;
    isArray(arg: unknown): arg is unknown[];
    isFunction(arg: unknown): arg is Function;
    isNumber(arg: unknown): arg is number;
  }

  const utils: Utils;

  // Result interfaces for statistical tests
  interface TukeyHSDPair {
    indices: [number, number];
    pValue: number;
  }

  interface ConfidenceInterval {
    lower: number;
    upper: number;
  }

  // Distribution instance interfaces
  interface ContinuousDistribution<T = number> {
    pdf(): T;
    pdf(x: number): T;
    cdf(x: number): T;
    inv(p: number): T;
    mean(): T;
    median(): T;
    mode(): number;
    sample(): number;
    variance(): number;
  }

  interface ContinuousNoMedian {
    pdf(x: number): number;
    cdf(x: number): number;
    inv(p: number): number;
    mean(): number;
    mode(): number;
    sample(): number;
    variance(): number;
  }

  interface ContinuousNoSample {
    pdf(x: number): number;
    cdf(x: number): number;
    inv(p: number): number;
    mean(): number;
    median(): number;
    mode(): number;
    variance(): number;
  }

  interface TriangularInstance {
    pdf(x: number): number;
    cdf(x: number): number;
    mean(): number;
    median(): number;
    mode(): number;
    sample(): number;
    variance(): number;
  }

  interface ContinuousNoInv {
    pdf(x: number): number;
    cdf(x: number): number;
    mean(): number;
    median(): number;
    mode(): number;
    sample(): number;
    variance(): number;
  }

  interface NoncentralTInstance {
    pdf(x: number): number;
    cdf(x: number): number;
  }

  interface TukeyInstance {
    cdf(q: number): number;
    inv(p: number): number;
  }

  interface DiscreteBasic {
    pdf(k: number): number;
    cdf(k: number): number;
  }

  interface PoissonInstance {
    pdf(k: number): number;
    cdf(x: number): number;
    sample(): number;
  }

  // OLS model result types (from models.js)
  interface OLSModel {
    nobs: number;
    df_model: number;
    df_resid: number;
    coef: number[];
    predict: number[];
    resid: number[];
    ybar: number;
    SST: number;
    SSE: number;
    SSR: number;
    R2: number;
    adjust_R2: number;
    exog: number[][];
    endog: number[];
    t: {
      se: number[];
      t: number[];
      p: number[];
      sigmaHat: number;
      interval95: [number, number][];
    };
    f: {
      F_statistic: number;
      pvalue: number;
    };
  }

  interface TTestResult {
    stat: number[];
    p: number[];
  }

  interface FTestResult {
    stat: number;
    pvalue: number;
  }
}