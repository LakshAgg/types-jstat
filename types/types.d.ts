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
  interface ContinuousDistribution {
    pdf(x: number): number;
    pdf(x: Array1D | Array2D): JStat;
    cdf(x: number): number;
    cdf(x: Array1D | Array2D): JStat;
    inv(p: number): number;
    inv(p: Array1D | Array2D): JStat;
    mean(): number;
    median(): number;
    mode(): number;
    sample(): number;
    variance(): number;
  }

  interface DistDataOverloads {
    pdf(): JStat;
    pdf(x: number): number;
    pdf(x: Array1D | Array2D): JStat;
    cdf(): JStat;
    cdf(x: number): number;
    cdf(x: Array1D | Array2D): JStat;
    inv(): JStat;
    inv(p: number): number;
    inv(p: Array1D | Array2D): JStat;
  }

  type WithDataDist<T> = Omit<T, "pdf" | "cdf" | "inv"> & {
    [K in Extract<keyof T, "pdf" | "cdf" | "inv">]: DistDataOverloads[K];
  };

  type ContinuousNoMedian = Omit<ContinuousDistribution, "median">;

  type ContinuousNoSample = Omit<ContinuousDistribution, "sample">;

  type TriangularInstance = Omit<ContinuousDistribution, "inv">;

  type ContinuousNoInv = Omit<ContinuousDistribution, "inv">;

  type NoncentralTInstance = Pick<ContinuousDistribution, "pdf" | "cdf">;

  type TukeyInstance = Pick<ContinuousDistribution, "cdf" | "inv">;

  type DiscreteBasic = Pick<ContinuousDistribution, "pdf" | "cdf">;

  type PoissonInstance = Pick<ContinuousDistribution, "pdf" | "cdf" | "sample">;

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
