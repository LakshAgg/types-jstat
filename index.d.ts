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
declare function jStat(...data: number[]): jStat.JStat;
declare function jStat(data: number[] | number[][]): jStat.JStat;
declare function jStat(start: number, stop: number, count: number, fn?: (value: number, index: number) => number): jStat.JStat;
declare function jStat(array: number[] | number[][], fn: (value: number) => number): jStat.JStat;
declare function jStat(): jStat.JStat;

declare namespace jStat {

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

    class jStat {
        [index: number]: any;

        // -- Core instance methods --
        rows(): number;
        rows(callback: (value: number) => void): JStat;
        cols(): number;
        cols(callback: (value: number) => void): JStat;
        dimensions(): DimensionsResult;
        dimensions(callback: (value: DimensionsResult) => void): JStat;

        // Slice overloads matching source dispatch logic:
        // slice({ row: N, col: N }) → single cell
        // slice({ row: N })          → row slice
        // slice({ col: N })          → column slice
        // slice({ row, col })        → sub-matrix
        // slice({}) / slice()        → deep copy
        slice(opts?: { row?: SliceOptions | number; col?: SliceOptions | number }): number[][] | number[] | number;

        row(index: number | number[], callback?: (value: JStat) => void): JStat;
        col(index: number | number[], callback?: (value: JStat) => void): JStat;
        diag(): number[][];
        diag(callback: (value: number[][]) => void): JStat;
        antidiag(): number[][];
        antidiag(callback: (value: number[][]) => void): JStat;
        transpose(): number[][];
        transpose(callback: (value: number[][]) => void): JStat;
        map(fn: (value: number) => number): JStat;
        cumreduce(fn: (accumulator: number, current: number) => number): JStat;
        alter(fn: (value: number) => number): JStat;
        create(row: number, fn: (row: number, col: number) => number): JStat;
        create(row: number, col: number, fn: (row: number, col: number) => number): JStat;
        zeros(row: number, col?: number): JStat;
        ones(row: number, col?: number): JStat;
        rand(row: number, col?: number): JStat;
        identity(row: number, col?: number): JStat;
        clear(callback?: () => void): JStat;
        symmetric(): boolean;
        symmetric(callback: (value: boolean) => void): JStat;
        // ---- Properties ----
        length: 1;

        // -- Vector instance methods --
        sum(): number[] | number;
        sum(callback: (value: number) => void): JStat;
        sum(flatten: true): number;
        sum(flatten: true, callback?: (value: number) => void): JStat;

        sumsqrd(): number | number[];
        sumsqrd(callback?: (value: number) => void): JStat;
        sumsqrd(flatten: true, callback: (value: number) => void): JStat;
        sumsqrd(flatten: true): number;

        sumsqerr(): number | number[];
        sumsqerr(callback?: (value: number) => void): JStat;
        sumsqerr(flatten: true, callback: (value: number) => void): JStat;
        sumsqerr(flatten: true): number;

        sumrow(): number | number[];
        sumrow(callback?: (value: number) => void): JStat;
        sumrow(flatten: true, callback: (value: number) => void): JStat;
        sumrow(flatten: true): number;

        product(): number | number[];
        product(callback?: (value: number) => void): JStat;
        product(flatten: true, callback: (value: number) => void): JStat;
        product(flatten: true): number;

        min(): number | number[];
        min(callback?: (value: number) => void): JStat;
        min(flatten: true, callback: (value: number) => void): JStat;
        min(flatten: true): number;

        max(): number | number[];
        max(callback?: (value: number) => void): JStat;
        max(flatten: true, callback: (value: number) => void): JStat;
        max(flatten: true): number;

        mean(): number[] | number;
        mean(callback: (value: number) => void): JStat;
        mean(flatten: true): number;
        mean(flatten: true, callback: (value: number) => void): JStat;

        meansqerr(): number | number[];
        meansqerr(callback: (value: number) => void): JStat;
        meansqerr(flatten: true,): number;
        meansqerr(flatten: true, callback: (value: number) => void): JStat;

        geomean(): number | number[];
        geomean(callback: (value: number) => void): JStat;
        geomean(flatten: true,): number;
        geomean(flatten: true, callback: (value: number) => void): JStat;

        median(): number | number[];
        median(callback: (value: number) => void): JStat;
        median(flatten: true,): number;
        median(flatten: true, callback: (value: number) => void): JStat;

        cumsum(): number | number[];
        cumsum(callback: (value: number[]) => void): JStat;
        cumsum(flatten: true,): number;
        cumsum(flatten: true, callback: (value: number[]) => void): JStat;

        cumprod(): number | number[];
        cumprod(callback: (value: number[]) => void): JStat;
        cumprod(flatten: true,): number;
        cumprod(flatten: true, callback: (value: number[]) => void): JStat;

        diff(): number | number[];
        diff(callback: (value: number[]) => void): JStat;
        diff(flatten: true,): number;
        diff(flatten: true, callback: (value: number[]) => void): JStat;

        rank(): number | number[];
        rank(callback: (value: number[]) => void): JStat;
        rank(flatten: true,): number;
        rank(flatten: true, callback: (value: number[]) => void): JStat;

        mode(): number | number[];
        mode(callback: (value: number | number[] | false) => void): JStat;
        mode(flatten: true,): number;
        mode(flatten: true, callback: (value: number | number[] | false) => void): JStat;

        range(): number | number[];
        range(callback: (value: number) => void): JStat;
        range(flatten: true,): number;
        range(flatten: true, callback: (value: number) => void): JStat;

        variance(): number | number[];
        variance(callback: (value: number) => void): JStat;
        variance(flatten: true,): number;
        variance(flatten: true, callback: (value: number) => void): JStat;

        deviation(): number | number[] | number[][];
        deviation(callback: (value: number[]) => void): JStat;
        deviation(flatten: true,): number | number[];
        deviation(flatten: true, callback: (value: number[]) => void): JStat;

        stdev(): number | number[];
        stdev(callback: (value: number) => void): JStat;
        stdev(flatten: true,): number;
        stdev(flatten: true, callback: (value: number) => void): JStat;

        meandev(): number | number[];
        meandev(callback: (value: number) => void): JStat;
        meandev(flatten: true,): number;
        meandev(flatten: true, callback: (value: number) => void): JStat;

        meddev(): number | number[];
        meddev(callback: (value: number) => void): JStat;
        meddev(flatten: true,): number;
        meddev(flatten: true, callback: (value: number) => void): JStat;

        coeffvar(): number | number[];
        coeffvar(callback: (value: number) => void): JStat;
        coeffvar(flatten: true,): number;
        coeffvar(flatten: true, callback: (value: number) => void): JStat;

        quartiles(callback?: (value: number[]) => void): JStat;
        quantiles(quantilesArray: ReadonlyArray<number>, alphap?: number, betap?: number, callback?: (value: number[]) => void): JStat;
        percentile(k: number, exclusive?: boolean, callback?: (value: number) => void): JStat;
        percentileOfScore(score: number, kind?: 'strict' | 'weak', callback?: (value: number) => void): JStat;
        histogram(numBins?: number, callback?: (value: number[]) => void): JStat;
        covariance(other: JStat | ReadonlyArray<number>, callback?: (value: number) => void): JStat;
        unique(): number[];

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
        add(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
        subtract(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
        divide(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
        multiply(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
        dot(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback?: (value: number) => void): number;
        pow(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
        exp(callback?: (value: number | number[] | number[][]) => void): JStat;
        log(callback?: (value: number | number[] | number[][]) => void): JStat;
        abs(callback?: (value: number | number[] | number[][]) => void): JStat;
        norm(callback?: (value: number) => void): number;
        angle(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback?: (value: number) => void): number;

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

    type JStat = jStat;
}

declare module 'jstat' {
    export default jStat;
}
