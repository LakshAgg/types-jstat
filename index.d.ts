// Type definitions for jstat 1.9.6
// Project: https://github.com/LakshAgg/types-jstat
/// <reference path="./types/core.d.ts" />
/// <reference path="./types/tests.d.ts" />
/// <reference path="./types/types.d.ts" />
/// <reference path="./types/vector.d.ts" />
/// <reference path="./types/special.d.ts" />
/// <reference path="./types/algebra.d.ts" />
/// <reference path="./types/distribution.d.ts" />

/**
 * jStat is a statistical library with static methods for direct calculations
 * and instance methods for chainable calculations.
 *
 * @example
 * ```typescript
 * const sum = jStat.sum([1, 2, 3, 4, 5]);
 * const chain = jStat([1, 2, 3, 4, 5]).sum(() => {}).mean();
 * ```
 */
declare function jStat<T extends number[] | [number[]] | [number[], ...number[][]] | number[][]>(data: T): jStat.JStat<InferJStatType<T>>;
declare function jStat(start: number, stop: number, count: number, fn?: (value: number, index: number) => number): jStat.JStat<[number[]]>;
declare function jStat<T extends number[] | [number[]] | [number[], ...number[][]] | number[][]>(array: T, fn: (value: number, row: number, col: number) => number): jStat.JStat<InferJStatType<T>>;
declare function jStat(): jStat.JStat;


type InferJStatType<T extends number[] | number[][]> = 
  T extends number[] 
    ? [number[]] 
    : T extends [number[]] 
      ? [number[]] 
      : T extends [number[], ...number[][]] 
        ? T 
        : number[][];

type SingleResponse<T extends number[][]> = 
  T extends [number[]] 
    ? number 
    : T extends [number[], ...number[][]] 
      ? number[] 
      : number | number[];

declare namespace jStat {
    type JStat1D = JStat<[number[]]>;
    type JStat2D = JStat<[number[], ...number[][]]>;

    // -------------------------------------------------------------------------
    // Regression Models
    // -------------------------------------------------------------------------

    namespace models {
        /**
         * Estimates an ordinary least squares linear model.
         *
         * @example
         * ```typescript
         * const model = jStat.models.ols([1, 2, 3], [[1, 0], [1, 1], [1, 2]]);
         * ```
         */
        function ols(endog: ReadonlyArray<number>, exog: ReadonlyArray<ReadonlyArray<number>>): OLSModel;
    }

    // -------------------------------------------------------------------------
    // JStat instance interface
    // -------------------------------------------------------------------------

    class jStat<T extends number[][] = number[][]> {
        [index: number]: T[number];
        length: number;

        // -- Core instance methods --
        row(index: number | number[]): JStat<[number[]]>;
        row(index: number | number[], callback: (value: JStat) => void): this;
        col(index: number | number[]): JStat<[number][]>;
        col(index: number | number[], callback: (value: JStat) => void): this;

        map(fn: (value: number, row: number, col: number) => number, modify?: boolean): JStat<T>;
        cumreduce(fn: (accumulator: number, current: number) => number, modify?: boolean): JStat<T>;
        alter(fn: (value: number, row: number, col: number) => number): this;
        
        rows(): number;
        rows(callback: (value: number) => void): this;
        cols(): number;
        cols(callback: (value: number) => void): this;
        dimensions(): DimensionsResult;
        dimensions(callback: (value: DimensionsResult) => void): this;
        symmetric(): boolean;
        symmetric(callback: (value: boolean) => void): this;
        clear(callback?: () => void): this;
        
        diag(): JStat;
        diag(callback: (value: JStat) => void): this;
        antidiag(): JStat;
        antidiag(callback: (value: JStat) => void): this;
        transpose(): JStat;
        transpose(callback: (value: JStat) => void): this;

        create(row: number, fn: (row: number, col: number) => number): JStat;
        create(row: number, col: number, fn: (row: number, col: number) => number): JStat;
        zeros(row: number, col?: number): JStat;
        ones(row: number, col?: number): JStat;
        rand(row: number, col?: number): JStat;
        identity(row: number, col?: number): JStat;

        // -- Vector instance methods --
        sum(): SingleResponse<T>;
        sum(callback: (value: SingleResponse<T>) => void): this;
        sum(flatten: true,): number;
        sum(flatten: true, callback: (value: number) => void): this;

        sumsqrd(): SingleResponse<T>;
        sumsqrd(callback: (value: SingleResponse<T>) => void): this;
        sumsqrd(flatten: true,): number;
        sumsqrd(flatten: true, callback: (value: number) => void): this;

        sumsqerr(): SingleResponse<T>;
        sumsqerr(callback: (value: SingleResponse<T>) => void): this;
        sumsqerr(flatten: true,): number;
        sumsqerr(flatten: true, callback: (value: number) => void): this;

        sumrow(): SingleResponse<T>;
        sumrow(callback: (value: SingleResponse<T>) => void): this;
        sumrow(flatten: true,): number;
        sumrow(flatten: true, callback: (value: number) => void): this;

        product(): SingleResponse<T>;
        product(callback: (value: SingleResponse<T>) => void): this;
        product(flatten: true,): number;
        product(flatten: true, callback: (value: number) => void): this;

        min(): SingleResponse<T>;
        min(callback: (value: SingleResponse<T>) => void): this;
        min(flatten: true,): number;
        min(flatten: true, callback: (value: number) => void): this;

        max(): SingleResponse<T>;
        max(callback: (value: SingleResponse<T>) => void): this;
        max(flatten: true,): number;
        max(flatten: true, callback: (value: number) => void): this;

        mean(): SingleResponse<T>;
        mean(callback: (value: SingleResponse<T>) => void): this;
        mean(flatten: true,): number;
        mean(flatten: true, callback: (value: number) => void): this;

        meansqerr(): SingleResponse<T>;
        meansqerr(callback: (value: SingleResponse<T>) => void): this;
        meansqerr(flatten: true,): number;
        meansqerr(flatten: true, callback: (value: number) => void): this;

        geomean(): SingleResponse<T>;
        geomean(callback: (value: SingleResponse<T>) => void): this;
        geomean(flatten: true,): number;
        geomean(flatten: true, callback: (value: number) => void): this;

        median(): SingleResponse<T>;
        median(callback: (value: SingleResponse<T>) => void): this;
        median(flatten: true,): number;
        median(flatten: true, callback: (value: number) => void): this;

        cumsum(): number[] | number[][];
        cumsum(callback: (value: number[] | number[][]) => void): this;
        cumsum(flatten: true,): number[] | number[][];
        cumsum(flatten: true, callback: (value: number[] | number[][]) => void): this;

        cumprod(): number | number[];
        cumprod(callback: (value: number | number[]) => void): this;
        cumprod(flatten: true,): number[] | number[][];
        cumprod(flatten: true, callback: (value: number[] | number[][]) => void): this;

        diff(): number[] | number[][];
        diff(callback: (value: number[] | number[][]) => void): this;
        diff(flatten: true,): number[];
        diff(flatten: true, callback: (value: number[]) => void): this;

        rank(): number[] | number[][];
        rank(callback: (value: number[] | number[][]) => void): this;
        rank(flatten: true,): number[];
        rank(flatten: true, callback: (value: number[]) => void): this;

        mode(): number | number[] | (number | number[])[];
        mode(callback: (value: number | number[] | (number | number[])[]) => void): this;
        mode(flatten: true,): number | number[];
        mode(flatten: true, callback: (value: number | number[]) => void): this;

        range(): SingleResponse<T>;
        range(callback: (value: SingleResponse<T>) => void): this;
        range(flatten: true,): number;
        range(flatten: true, callback: (value: number) => void): this;

        variance(): SingleResponse<T>;
        variance(callback: (value: SingleResponse<T>) => void): this;
        variance(flatten: true,): number;
        variance(flatten: true, callback: (value: number) => void): this;

        deviation(): number[] | number[][];
        deviation(callback: (value: number[] | number[][]) => void): this;
        deviation(flatten: true,): number[];
        deviation(flatten: true, callback: (value: number[]) => void): this;

        stdev(): SingleResponse<T>;
        stdev(callback: (value: SingleResponse<T>) => void): this;
        stdev(flatten: true,): number;
        stdev(flatten: true, callback: (value: number) => void): this;

        meandev(): SingleResponse<T>;
        meandev(callback: (value: SingleResponse<T>) => void): this;
        meandev(flatten: true,): number;
        meandev(flatten: true, callback: (value: number) => void): this;
        
        skewness(): SingleResponse<T>;
        skewness(callback: (value: SingleResponse<T>) => void): this;
        skewness(flatten: true,): number;
        skewness(flatten: true, callback: (value: number) => void): this;

        kurtosis(): SingleResponse<T>;
        kurtosis(callback: (value: SingleResponse<T>) => void): this;
        kurtosis(flatten: true,): number;
        kurtosis(flatten: true, callback: (value: number) => void): this;

        meddev(): SingleResponse<T>;
        meddev(callback: (value: SingleResponse<T>) => void): this;
        meddev(flatten: true,): number;
        meddev(flatten: true, callback: (value: number) => void): this;

        coeffvar(): SingleResponse<T>;
        coeffvar(callback: (value: SingleResponse<T>) => void): this;
        coeffvar(flatten: true,): number;
        coeffvar(flatten: true, callback: (value: number) => void): this;
        
        histogram(): number[] | number[][];
        histogram(callback: (value: number[] | number[][]) => void): this;
        histogram(flatten: true,): number[];
        histogram(flatten: true, callback: (value: number[]) => void): this;
        
        quartiles(): number[] | number[][];
        quartiles(callback: (value: number[] | number[][]) => void): this;
        quartiles(flatten: true,): number[];
        quartiles(flatten: true, callback: (value: number[]) => void): this;
        
        unique(): number[] | number[][];
        unique(callback: (value: number[] | number[][]) => void): this;
        unique(flatten: true,): number[];
        unique(flatten: true, callback: (value: number[]) => void): this;
        
        quantiles(quantilesArray: ReadonlyArray<number>, alphap?: number, betap?: number): number[] | number[][];
        quantiles(quantilesArray: ReadonlyArray<number>, callback: (value: number[] | number[][]) => void): this;
        quantiles(quantilesArray: ReadonlyArray<number>, alphap: number, callback: (value: number[] | number[][]) => void): this;
        quantiles(quantilesArray: ReadonlyArray<number>, alphap: number, betap: number, callback: (value: number[] | number[][]) => void): this;

        percentileOfScore(score: number, kind?: 'strict' | 'weak'): number | number[];
        percentileOfScore(score: number, callback: (value: number | number[]) => void): this;
        percentileOfScore(score: number, kind: 'strict' | 'weak', callback: (value: number | number[]) => void): this;

        // -- Special Functions instance methods --
        betafn(y: number, callback?: (value: number) => void): JStat;
        betaln(y: number, callback?: (value: number) => void): JStat;
        betacf(a: number, b: number, callback?: (value: number) => void): JStat;
        ibetainv(a: number, b: number, callback?: (value: number) => void): JStat;
        ibeta(a: number, b: number, callback?: (value: number) => void): JStat;
        gammafn(callback?: (value: number) => void): JStat;
        gammaln(callback?: (value: number) => void): JStat;
        lowRegGamma(x: number, callback?: (value: number) => void): JStat;
        gammapinv(a: number, callback?: (value: number) => void): JStat;
        factorialln(callback?: (value: number) => void): JStat;
        factorial(callback?: (value: number) => void): JStat;
        combination(m: number, callback?: (value: number) => void): JStat;
        permutation(m: number, callback?: (value: number) => void): JStat;
        randn(callback?: (value: number) => void): JStat;
        randn(n: number, m?: number, callback?: (value: number | number[][]) => void): JStat;
        randg(callback?: (value: number) => void): JStat;
        randg(shape: number, n?: number, m?: number, callback?: (value: number | number[][]) => void): JStat;

        // -- Linear Algebra instance methods --
        add(arg: T | JStat<T> | number): JStat<T>;
        add(arg: T | JStat<T> | number, callback: (value: T) => void): this;
        subtract(arg: T | JStat<T> | number): JStat<T>;
        subtract(arg: T | JStat<T> | number, callback: (value: T) => void): this;

        divide(arg: number[] | number | number[][]): JStat;
        divide(arg: number[] | number | number[][], callback: (value: JStat) => void): this;
        multiply(arg: number[] | number | number[][]): JStat;
        multiply(arg: number[] | number | number[][], callback: (value: JStat) => void): this;

        dot(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number | JStat<[number[]]>;
        dot(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback: (value:  number | JStat<[number[]]>) => void): this;
        pow(arg: number | [number] | [[number]]): JStat<T>;
        pow(arg: number | [number] | [[number]], callback: (value: JStat<T>) => void): this;
        exp(): JStat<T>;
        exp(_: any, callback: (value: JStat<T>) => void): this;
        log(): JStat<T>;
        log(_: any, callback: (value: JStat<T>) => void): this;
        abs(): JStat<T>;
        abs(_: any, callback: (value: JStat<T>) => void): this;
        norm(): number;
        norm(_: any, callback: (value: number) => void): this;
        angle(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number;
        angle(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback: (value: number) => void): this;

        // -- Statistical Tests instance methods --
        /** Returns the z-score for the current object values. */
        zscore(value: number, flag?: boolean): JStat;
        /** Returns the p-value of a z-test for the current object values. */
        ztest(value: number, sides?: 1 | 2, flag?: boolean): JStat;
        /** Returns the t-score for the current object values. */
        tscore(value: number): JStat;
        /** Returns the p-value of a t-test for the current object values. */
        ttest(value: number, sides?: 1 | 2): JStat;
        /** Returns the F-score of the current object's groups. */
        anovafscore(): number;

        // -- Distribution instance methods --
        beta(alpha: number, beta: number): ContinuousDistribution<JStat>;
        cauchy(local: number, scale: number): ContinuousDistribution<JStat>;
        centralF(df1: number, df2: number): ContinuousNoMedian;
        chisquare(dof: number): ContinuousDistribution<JStat>;
        exponential(rate: number): ContinuousDistribution<JStat>;
        gamma(shape: number, scale: number): ContinuousNoMedian;
        invgamma(shape: number, scale: number): ContinuousNoMedian;
        kumaraswamy(alpha: number, beta: number): ContinuousNoSample;
        lognormal(mu: number, sigma: number): ContinuousDistribution<JStat>;
        pareto(scale: number, shape: number): ContinuousNoSample;
        studentt(dof: number): ContinuousDistribution<JStat>;
        tukey(nmeans: number, dof: number): TukeyInstance;
        weibull(scale: number, shape: number): ContinuousDistribution<JStat>;
        uniform(a: number, b: number): ContinuousDistribution<JStat>;
        arcsine(a: number, b: number): ContinuousDistribution<JStat>;
        triangular(a: number, b: number, c: number): TriangularInstance;
        binomial(n: number, p: number): DiscreteBasic;
        negbin(r: number, p: number): DiscreteBasic;
        hypgeom(N: number, m: number, n: number): DiscreteBasic;
        poisson(lambda: number): PoissonInstance;

        // -- Proportion test instance methods (from test.js) --
        /** Returns the p-value of a one-sided difference of proportions test. */
        oneSidedDifferenceOfProportions(p1: number, n1: number, p2: number, n2: number): number;
        /** Returns the p-value of a two-sided difference of proportions test. */
        twoSidedDifferenceOfProportions(p1: number, n1: number, p2: number, n2: number): number;

        // -- Utility / missing instance methods --
        /** Returns a plain JavaScript array (or array of arrays) from the instance. */
        toArray(): number[] | number[][];
        /** Confidence interval using the normal distribution. */
        normalci(value: number, alpha: number): number[];
        /** Confidence interval using the t-distribution. */
        tci(value: number, alpha: number): number[];
    }

    type JStat<T extends number[][] = number[][]> = jStat<T>;
}

declare module 'jstat' {
    export default jStat;
}
