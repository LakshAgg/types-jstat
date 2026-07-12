// Type definitions for jstat 1.9.6
// Project: https://github.com/LakshAgg/types-jstat
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * jStat is a statistical library with static methods for direct calculations
 * and instance methods for chainable calculations.
 *
 * @example
 * ```typescript
 * const sum = jStat.sum([1, 2, 3, 4, 5]);
 * const chain = jStat([1, 2, 3, 4, 5]).sum().mean();
 * ```
 */
declare module 'jstat' {
    function jStat(...data: number[]): jStat.JStat;
    function jStat(data: number[] | number[][]): jStat.JStat;
    function jStat(start: number, stop: number, count: number, fn?: (value: number, index: number) => number): jStat.JStat;
    function jStat(array: number[] | number[][], fn: (value: number) => number): jStat.JStat;
    function jStat(): jStat.JStat;

    namespace jStat {
        // -------------------------------------------------------------------------
        // Type declarations
        // -------------------------------------------------------------------------

        interface DimensionsResult {
            rows: number;
            cols: number;
        }

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
            pdf(): number;
            pdf(x: number): number;
            cdf(x: number): number;
            inv(p: number): number;
            mean(): number;
            median(): number;
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

        // OLS model result types
        interface OLSModel {
            nobs: number;
            coef: number[];
            R2: number;
            aR2: number;
            t: TTestResult;
            f: FTestResult;
        }

        interface TTestResult {
            stat: number[];
            p: number[];
        }

        interface FTestResult {
            stat: number;
            pvalue: number;
        }

        // -------------------------------------------------------------------------
        // Core static methods
        // -------------------------------------------------------------------------

        /** Returns the number of rows in a matrix. */
        function rows(array: number[][]): number;
        /** Returns the first row of a matrix as a flat array. */
        function rowa(array: number[][]): number[];
        /** Returns the number of columns in a matrix. */
        function cols(array: number[][]): number;
        /** Returns the first column of a matrix as a flat array. */
        function cola(array: number[][]): number[];
        /** Slices a matrix using NumPy-style row and column options. */
        function slice(array: number[][], opts: SliceOptions): number[][];
        function slice(array: number[][], rowOpts: SliceOptions, colOpts: SliceOptions): number[][];
        /** Returns one row of a matrix, optionally sliced by column options. */
        function slice(array: number[][], row: number, colOpts: SliceOptions): number[];
        /** Assigns values into a sliced region of a matrix. */
        function sliceAssign(array: number[][], rowOpts: SliceOptions, colOpts: SliceOptions, values: number[][]): void;
        /** Returns the matrix dimensions as `{ rows, cols }`. */
        function dimensions(array: number[][]): DimensionsResult;
        /** Returns a specific row or rows from a matrix. */
        function row(array: number[][], index: number): number[];
        /** Returns a specific row or rows from a matrix. */
        function row(array: number[][], index: number[]): number[][];
        /** Returns a specific column or columns from a matrix. */
        function col(array: number[][], index: number): number[][];
        /** Returns a specific column or columns from a matrix. */
        function col(array: number[][], index: number[]): number[][][];
        /** Returns the main diagonal of a matrix. */
        function diag(array: number[][]): number[][];
        /** Returns the anti-diagonal of a matrix. */
        function antidiag(array: number[][]): number[][];
        /** Creates a diagonal matrix from a 1D array. */
        function diagonal(array: number[]): number[][];
        /** Transposes a matrix. */
        function transpose(array: number[][]): number[][];
        /** Maps each value in a vector or matrix through a callback. */
        function map(array: number[] | number[][], fn: (value: number) => number): number[] | number[][];
        /** Reduces a vector or matrix cumulatively with a callback. */
        function cumreduce(array: number[] | number[][], fn: (accumulator: number, current: number) => number): number[] | number[][];
        /** Mutates a vector or matrix by applying a callback to each value. */
        function alter(array: number[] | number[][], fn: (value: number) => number): void;
        /** Creates a matrix by calling a generator for each cell. */
        function create(row: number, fn: (row: number, col: number) => number): number[][];
        /** Creates a matrix by calling a generator for each cell. */
        function create(row: number, col: number, fn: (row: number, col: number) => number): number[][];
        /** Creates a matrix filled with zeroes. */
        function zeros(row: number, col?: number): number[][];
        /** Creates a matrix filled with ones. */
        function ones(row: number, col?: number): number[][];
        /** Creates a matrix filled with random values. */
        function rand(row: number, col?: number): number[][];
        /** Returns a deep copy of a vector or matrix. */
        function copy(array: number[] | number[][]): number[] | number[][];
        /** Creates an identity matrix. */
        function identity(row: number, col?: number): number[][];
        /** Creates a numeric sequence from `start` to `stop`. */
        function seq(start: number, stop: number, count: number): number[];
        /** Creates a range with a stop value only. */
        function arange(stop: number): number[];
        /** Creates a range from `start` to `stop`. */
        function arange(start: number, stop: number): number[];
        /** Creates a range from `start` to `stop` using a custom step. */
        function arange(start: number, stop: number, step: number): number[];
        /** Clears a vector or matrix in place. */
        function clear(array: number[] | number[][]): void;
        /** Returns true when the matrix is symmetric. */
        function symmetric(array: number[][]): boolean;

        // -------------------------------------------------------------------------
        // Vector static methods
        // -------------------------------------------------------------------------

        /** Returns the sum of a vector. */
        function sum(array: ReadonlyArray<number>): number;
        /** Returns the sum of squares of a vector. */
        function sumsqrd(array: ReadonlyArray<number>): number;
        /** Returns the sum of squared errors of a vector. */
        function sumsqerr(array: ReadonlyArray<number>): number;
        /** Returns the sum of a vector in row-based order. */
        function sumrow(array: ReadonlyArray<number>): number;
        /** Returns the product of all vector entries. */
        function product(array: ReadonlyArray<number>): number;
        /** Returns the smallest vector entry. */
        function min(array: ReadonlyArray<number>): number;
        /** Returns the largest vector entry. */
        function max(array: ReadonlyArray<number>): number;
        /** Returns the arithmetic mean. */
        function mean(array: ReadonlyArray<number>): number;
        /** Returns the mean squared error. */
        function meansqerr(array: ReadonlyArray<number>): number;
        /** Returns the geometric mean. */
        function geomean(array: ReadonlyArray<number>): number;
        /** Returns the median. */
        function median(array: ReadonlyArray<number>): number;
        /** Returns cumulative sums. */
        function cumsum(array: ReadonlyArray<number>): number[];
        /** Returns cumulative products. */
        function cumprod(array: ReadonlyArray<number>): number[];
        /** Returns successive differences. */
        function diff(array: ReadonlyArray<number>): number[];
        /** Returns ranks with ties averaged. */
        function rank(array: ReadonlyArray<number>): number[];
        /** Returns the mode or modes of a vector. */
        function mode(array: ReadonlyArray<number>): number | number[];
        /** Returns the range, or max minus min. */
        function range(array: ReadonlyArray<number>): number;
        /** Returns the variance of a vector. */
        function variance(array: ReadonlyArray<number>, sample?: boolean): number;
        /** Returns the pooled variance of multiple vectors. */
        function pooledvariance(arrays: ReadonlyArray<ReadonlyArray<number>>): number;
        /** Returns the deviation from the mean for each entry. */
        function deviation(array: ReadonlyArray<number>): number[];
        /** Returns the standard deviation of a vector. */
        function stdev(array: ReadonlyArray<number>, sample?: boolean): number;
        /** Returns the pooled standard deviation of multiple vectors. */
        function pooledstdev(arrays: ReadonlyArray<ReadonlyArray<number>>): number;
        /** Returns the mean absolute deviation. */
        function meandev(array: ReadonlyArray<number>): number;
        /** Returns the median absolute deviation. */
        function meddev(array: ReadonlyArray<number>): number;
        /** Returns the skewness of the vector. */
        function skewness(array: ReadonlyArray<number>): number;
        /** Returns the kurtosis of the vector. */
        function kurtosis(array: ReadonlyArray<number>): number;
        /** Returns the coefficient of variation. */
        function coeffvar(array: ReadonlyArray<number>): number;
        /** Returns the quartiles of the vector. */
        function quartiles(array: ReadonlyArray<number>): number[];
        /** Returns quantiles for the given probability points. */
        function quantiles(dataArray: ReadonlyArray<number>, quantilesArray: ReadonlyArray<number>, alphap?: number, betap?: number): number[];
        /** Returns the percentile for a score. */
        function percentile(dataArray: ReadonlyArray<number>, k: number, exclusive?: boolean): number;
        /** Returns the percentile of a score within the data set. */
        function percentileOfScore(dataArray: ReadonlyArray<number>, score: number, kind?: 'strict' | 'weak'): number;
        /** Returns a histogram with the requested number of bins. */
        function histogram(dataArray: ReadonlyArray<number>, numBins?: number): number[];
        /** Returns the covariance between two vectors. */
        function covariance(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;
        /** Returns the correlation coefficient between two vectors. */
        function corrcoeff(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;
        /** Returns the Spearman correlation coefficient between two vectors. */
        function spearmancoeff(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): number;

        // -------------------------------------------------------------------------
        // Special Functions static methods
        // -------------------------------------------------------------------------

        /** Evaluates the Beta function. */
        function betafn(x: number, y: number): number;
        /** Evaluates the log Beta function. */
        function betaln(x: number, y: number): number;
        /** Returns the continued fraction for the incomplete Beta function. */
        function betacf(x: number, a: number, b: number): number;
        /** Returns the inverse of the incomplete Beta function. */
        function ibetainv(p: number, a: number, b: number): number;
        /** Returns the incomplete Beta function. */
        function ibeta(x: number, a: number, b: number): number;
        /** Returns the Gamma function. */
        function gammafn(x: number): number;
        /** Returns the log Gamma function. */
        function gammaln(x: number): number;
        /** Returns the lower incomplete gamma function. */
        function gammap(a: number, x: number): number;
        /** Returns the lower regularized incomplete gamma function. */
        function lowRegGamma(a: number, x: number): number;
        /** Returns the inverse of the lower regularized incomplete gamma function. */
        function gammapinv(p: number, a: number): number;
        /** Returns the natural log of factorial. */
        function factorialln(n: number): number;
        /** Returns the factorial of n. */
        function factorial(n: number): number;
        /** Returns the number of combinations of n items taken m at a time. */
        function combination(n: number, m: number): number;
        /** Returns the number of permutations of n items taken m at a time. */
        function permutation(n: number, m: number): number;
        /** Returns the error function. */
        function erf(x: number): number;
        /** Returns the complementary error function. */
        function erfc(x: number): number;
        /** Returns the inverse complementary error function. */
        function erfcinv(p: number): number;
        /** Returns a normal deviate. */
        function randn(): number;
        /** Returns a matrix of normal deviates. */
        function randn(n: number, m?: number): number[][];
        /** Returns a Gamma deviate. */
        function randg(shape: number): number;
        /** Returns a matrix of Gamma deviates. */
        function randg(shape: number, n: number, m?: number): number[][];

        // -------------------------------------------------------------------------
        // Linear Algebra static methods
        // -------------------------------------------------------------------------

        /** Adds a scalar to every entry of a vector or matrix. */
        function add(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, arg: number): number[] | number[][];
        /** Subtracts a scalar from every entry of a vector or matrix. */
        function subtract(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, arg: number): number[] | number[][];
        /** Divides every entry of a vector or matrix by a scalar. */
        function divide(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, arg: number): number[] | number[][];
        /** Multiplies every entry of a vector or matrix by a scalar. */
        function multiply(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, arg: number): number[] | number[][];
        /** Raises every entry of a vector or matrix to a power. */
        function pow(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, arg: number): number[] | number[][];
        /** Exponentiates every entry of a vector or matrix. */
        function exp(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number[] | number[][];
        /** Applies the natural logarithm to every entry of a vector or matrix. */
        function log(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number[] | number[][];
        /** Applies `Math.abs` to every entry of a vector or matrix. */
        function abs(arr: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number[] | number[][];
        /** Returns the dot product of two vectors. */
        function dot(arr1: ReadonlyArray<number>, arr2: ReadonlyArray<number>): number;
        /** Returns the outer product of two vectors. */
        function outer(A: ReadonlyArray<number>, B: ReadonlyArray<number>): number[][];
        /** Returns the Euclidean norm of a vector. */
        function norm(arr: ReadonlyArray<number>): number;
        /** Returns the angle between two vectors. */
        function angle(arr1: ReadonlyArray<number>, arr2: ReadonlyArray<number>): number;
        /** Horizontally concatenates two matrices. */
        function aug(A: ReadonlyArray<ReadonlyArray<number>>, B: ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Returns the determinant of a square matrix. */
        function det(A: ReadonlyArray<ReadonlyArray<number>>): number;
        /** Returns the inverse of a square matrix. */
        function inv(A: ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Solves a linear system using Gaussian elimination. */
        function gauss_elimination(A: ReadonlyArray<ReadonlyArray<number>>, B: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Solves a linear system using Gauss-Jordan elimination. */
        function gauss_jordan(A: ReadonlyArray<ReadonlyArray<number>>, B: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Solves a linear system using the Gauss-Jacobi method. */
        function gauss_jacobi(A: ReadonlyArray<ReadonlyArray<number>>, b: ReadonlyArray<number>, x: number, r?: ReadonlyArray<number>): number[];
        /** Solves a linear system using the Gauss-Seidel method. */
        function gauss_seidel(A: ReadonlyArray<ReadonlyArray<number>>, b: ReadonlyArray<number>, x: number, r?: ReadonlyArray<number>): number[];
        /** Solves a linear system using successive over-relaxation. */
        function SOR(A: ReadonlyArray<ReadonlyArray<number>>, b: ReadonlyArray<number>, x: number, r: ReadonlyArray<number>, w: number): number[];
        /** Solves a least-squares system using QR decomposition. */
        function lstsq(A: ReadonlyArray<ReadonlyArray<number>>, b: ReadonlyArray<number>): number[];
        /** Solves a least-squares system using QR decomposition. */
        function lstsq(A: ReadonlyArray<ReadonlyArray<number>>, b: ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Returns the LU decomposition. */
        function lu(A: ReadonlyArray<ReadonlyArray<number>>): [number[][], number[][]];
        /** Returns the Cholesky decomposition. */
        function cholesky(A: ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Returns the Householder-transformed matrix. */
        function householder(A: ReadonlyArray<ReadonlyArray<number>>): number[][];
        /** Returns the QR decomposition. */
        function QR(A: ReadonlyArray<ReadonlyArray<number>>): [number[][], number[][]];
        /** Returns eigenvalues and eigenvectors via Jacobi iteration. */
        function jacobi(A: ReadonlyArray<ReadonlyArray<number>>): { eigenvalues: number[]; eigenvectors: number[][] };
        /** Solves an ODE using the Runge-Kutta method. */
        function rungekutta(f: (t: number, y: number[]) => number[], y0: ReadonlyArray<number>, t0: number, tEnd: number, h: number): Array<{ t: number; y: number[] }>;
        /** Approximates an integral with Romberg integration. */
        function romberg(f: (x: number) => number, a: number, b: number, maxIter?: number, tol?: number): number;
        /** Refines an approximation with Richardson extrapolation. */
        function richardson(approx: ReadonlyArray<number>, order?: number): number;
        /** Approximates an integral with Simpson's rule. */
        function simpson(f: (x: number) => number, a: number, b: number, n?: number): number;
        /** Returns an interpolation function using Hermite interpolation. */
        function hermite(x: ReadonlyArray<number>, y: ReadonlyArray<number>, dy: ReadonlyArray<number>): (t: number) => number;
        /** Returns an interpolation function using Lagrange interpolation. */
        function lagrange(x: ReadonlyArray<number>, y: ReadonlyArray<number>): (t: number) => number;
        /** Returns an interpolation function using cubic splines. */
        function cubic_spline(x: ReadonlyArray<number>, y: ReadonlyArray<number>): (t: number) => number;
        /** Approximates an integral with Gaussian quadrature. */
        function gauss_quadrature(f: (x: number) => number, a: number, b: number, n?: number): number;
        /** Returns the principal components of a data matrix. */
        function PCA(data: ReadonlyArray<ReadonlyArray<number>>, numComponents?: number): { eigenvalues: number[]; eigenvectors: number[][]; projected: number[][] };

        // -------------------------------------------------------------------------
        // Statistical Tests static methods
        // -------------------------------------------------------------------------

        /** Returns the z-score for a value against a mean and standard deviation. */
        function zscore(value: number, mean: number, sd: number): number;
        /** Returns the z-score for a value against sample data. */
        function zscore(value: number, array: ReadonlyArray<number>, flag?: boolean): number;
        /** Returns the p-value of a z-test from a mean and standard deviation. */
        function ztest(value: number, mean: number, sd: number, sides?: 1 | 2): number;
        /** Returns the p-value of a z-test from a z-score. */
        function ztest(zscore: number, sides?: 1 | 2): number;
        /** Returns the p-value of a z-test from sample data. */
        function ztest(value: number, array: ReadonlyArray<number>, sides?: 1 | 2, flag?: boolean): number;

        /** Returns the t-score for a value against a mean, deviation, and sample size. */
        function tscore(value: number, mean: number, sd: number, n: number): number;
        /** Returns the t-score for a value against sample data. */
        function tscore(value: number, array: ReadonlyArray<number>): number;
        /** Returns the p-value of a t-test from a mean, deviation, and sample size. */
        function ttest(value: number, mean: number, sd: number, n: number, sides?: 1 | 2): number;
        /** Returns the p-value of a t-test from a precomputed t-score. */
        function ttest(tscore: number, n: number, sides?: 1 | 2): number;
        /** Returns the p-value of a t-test from sample data. */
        function ttest(value: number, array: ReadonlyArray<number>, sides?: 1 | 2): number;

        /** Returns the F-score of a one-way ANOVA. */
        function anovafscore(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>, ...arrays: ReadonlyArray<number>[]): number;
        /** Returns the F-score of a one-way ANOVA from an array of groups. */
        function anovafscore(arrays: ReadonlyArray<ReadonlyArray<number>>): number;
        /** Returns the p-value of a one-way ANOVA. */
        function anovaftest(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>, ...arrays: ReadonlyArray<number>[]): number;
        /** Returns the p-value of a one-way ANOVA from an array of groups. */
        function anovaftest(arrays: ReadonlyArray<ReadonlyArray<number>>): number;
        /** Returns the p-value of an F-test. */
        function ftest(fscore: number, df1: number, df2: number): number;

        /** Returns the q-score for Tukey's range test. */
        function qscore(mean1: number, mean2: number, n1: number, n2: number, sd: number): number;
        /** Returns the q-score for Tukey's range test from sample arrays. */
        function qscore(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>, sd: number): number;
        /** Returns the p-value for a q-score. */
        function qtest(qscore: number, n: number, k: number): number;
        /** Returns the p-value for Tukey's range test from summary statistics. */
        function qtest(mean1: number, mean2: number, n1: number, n2: number, sd: number, n: number, k: number): number;
        /** Returns the p-value for Tukey's range test from sample arrays. */
        function qtest(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>, sd: number, n: number, k: number): number;
        /** Returns pairwise Tukey HSD results for all groups. */
        function tukeyhsd(arrays: ReadonlyArray<ReadonlyArray<number>>): Array<[[number, number], number]>;

        /** Returns a normal-distribution confidence interval. */
        function normalci(value: number, alpha: number, sd: number, n: number): number[];
        /** Returns a normal-distribution confidence interval from sample data. */
        function normalci(value: number, alpha: number, array: ReadonlyArray<number>): number[];
        /** Returns a t-distribution confidence interval. */
        function tci(value: number, alpha: number, sd: number, n: number): number[];
        /** Returns a t-distribution confidence interval from sample data. */
        function tci(value: number, alpha: number, array: ReadonlyArray<number>): number[];

        // Proportion test utilities namespace
        namespace fn {
            function oneSidedDifferenceOfProportions(p1: number, n1: number, p2: number, n2: number): number;
            function twoSidedDifferenceOfProportions(p1: number, n1: number, p2: number, n2: number): number;
        }

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
            function variance(local: number, scale: number): number;
        }
        /** Cauchy distribution with location and scale parameters. */
        function cauchy(local: number, scale: number): ContinuousDistribution;

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
            function variance(shape: number, scale: number): number;
        }
        /** Inverse Gamma distribution parameterized by shape and scale. */
        function invgamma(shape: number, scale: number): ContinuousNoMedian;

        // Kumaraswamy (no sample)
        namespace kumaraswamy {
            function pdf(x: number, a: number, b: number): number;
            function cdf(x: number, alpha: number, beta: number): number;
            function inv(p: number, alpha: number, beta: number): number;
            function mean(alpha: number, beta: number): number;
            function median(alpha: number, beta: number): number;
            function mode(alpha: number, beta: number): number;
            function variance(alpha: number, beta: number): number;
        }
        /** Kumaraswamy distribution. */
        function kumaraswamy(alpha: number, beta: number): ContinuousNoSample;

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

        // Pareto (no sample)
        namespace pareto {
            function pdf(x: number, scale: number, shape: number): number;
            function cdf(x: number, scale: number, shape: number): number;
            function inv(p: number, scale: number, shape: number): number;
            function mean(scale: number, shape: number): number;
            function median(scale: number, shape: number): number;
            function mode(scale: number, shape: number): number;
            function variance(scale: number, shape: number): number;
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
            function median(a: number, b: number): number;
            function mode(a: number, b: number): number;
            function sample(a: number, b: number): number;
            function variance(a: number, b: number): number;
        }
        /** Uniform distribution on the interval [a, b]. */
        function uniform(a: number, b: number): ContinuousDistribution;

        // Arcsine
        namespace arcsine {
            function pdf(x: number, a: number, b: number): number;
            function cdf(x: number, a: number, b: number): number;
            function inv(p: number, a: number, b: number): number;
            function mean(a: number, b: number): number;
            function median(a: number, b: number): number;
            function mode(a: number, b: number): number;
            function sample(a: number, b: number): number;
            function variance(a: number, b: number): number;
        }
        /** Arcsine distribution. */
        function arcsine(a: number, b: number): ContinuousDistribution;

        // Triangular (no inv)
        namespace triangular {
            function pdf(x: number, a: number, b: number, c: number): number;
            function cdf(x: number, a: number, b: number, c: number): number;
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
        }
        /** Poisson distribution. */
        function poisson(lambda: number): PoissonInstance;

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

        interface JStat {
            // -- Core instance methods --
            rows(callback?: (value: number) => void): JStat;
            cols(callback?: (value: number) => void): JStat;
            dimensions(callback?: (value: jStat.DimensionsResult) => void): JStat;
            slice(opts: SliceOptions): number[][];
            slice(row: number, colOpts: SliceOptions): number[];
            row(index: number | number[], callback?: (value: JStat) => void): JStat;
            col(index: number | number[], callback?: (value: JStat) => void): JStat;
            diag(callback?: (value: JStat) => void): JStat;
            antidiag(callback?: (value: JStat) => void): JStat;
            transpose(callback?: (value: JStat) => void): JStat;
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
            symmetric(callback?: (value: boolean) => void): JStat;

            // -- Vector instance methods --
            sum(callback?: (value: number) => void): JStat;
            sum(flatten: boolean, callback?: (value: number) => void): JStat;
            sumsqrd(callback?: (value: number) => void): JStat;
            sumsqrd(flatten: boolean, callback?: (value: number) => void): JStat;
            sumsqerr(callback?: (value: number) => void): JStat;
            sumsqerr(flatten: boolean, callback?: (value: number) => void): JStat;
            sumrow(callback?: (value: number) => void): JStat;
            sumrow(flatten: boolean, callback?: (value: number) => void): JStat;
            product(callback?: (value: number) => void): JStat;
            product(flatten: boolean, callback?: (value: number) => void): JStat;
            min(callback?: (value: number) => void): JStat;
            min(flatten: boolean, callback?: (value: number) => void): JStat;
            max(callback?: (value: number) => void): JStat;
            max(flatten: boolean, callback?: (value: number) => void): JStat;
            mean(callback?: (value: number) => void): JStat;
            mean(flatten: boolean, callback?: (value: number) => void): JStat;
            meansqerr(callback?: (value: number) => void): JStat;
            meansqerr(flatten: boolean, callback?: (value: number) => void): JStat;
            geomean(callback?: (value: number) => void): JStat;
            geomean(flatten: boolean, callback?: (value: number) => void): JStat;
            median(callback?: (value: number) => void): JStat;
            median(flatten: boolean, callback?: (value: number) => void): JStat;
            cumsum(callback?: (value: number[]) => void): JStat;
            cumsum(flatten: boolean, callback?: (value: number[]) => void): JStat;
            cumprod(callback?: (value: number[]) => void): JStat;
            cumprod(flatten: boolean, callback?: (value: number[]) => void): JStat;
            diff(callback?: (value: number[]) => void): JStat;
            diff(flatten: boolean, callback?: (value: number[]) => void): JStat;
            rank(callback?: (value: number[]) => void): JStat;
            rank(flatten: boolean, callback?: (value: number[]) => void): JStat;
            mode(callback?: (value: number | number[] | false) => void): JStat;
            mode(flatten: boolean, callback?: (value: number | number[] | false) => void): JStat;
            range(callback?: (value: number) => void): JStat;
            range(flatten: boolean, callback?: (value: number) => void): JStat;
            variance(callback?: (value: number) => void): JStat;
            variance(flatten: boolean, callback?: (value: number) => void): JStat;
            deviation(callback?: (value: number[]) => void): JStat;
            deviation(flatten: boolean, callback?: (value: number[]) => void): JStat;
            stdev(callback?: (value: number) => void): JStat;
            stdev(flatten: boolean, callback?: (value: number) => void): JStat;
            meandev(callback?: (value: number) => void): JStat;
            meandev(flatten: boolean, callback?: (value: number) => void): JStat;
            meddev(callback?: (value: number) => void): JStat;
            meddev(flatten: boolean, callback?: (value: number) => void): JStat;
            coeffvar(callback?: (value: number) => void): JStat;
            coeffvar(flatten: boolean, callback?: (value: number) => void): JStat;
            quartiles(callback?: (value: number[]) => void): JStat;
            quantiles(quantilesArray: ReadonlyArray<number>, alphap?: number, betap?: number, callback?: (value: number[]) => void): JStat;
            percentile(k: number, exclusive?: boolean, callback?: (value: number) => void): JStat;
            percentileOfScore(score: number, kind?: 'strict' | 'weak', callback?: (value: number) => void): JStat;
            histogram(numBins?: number, callback?: (value: number[]) => void): JStat;
            covariance(other: JStat | ReadonlyArray<number>, callback?: (value: number) => void): JStat;
            corrcoeff(other: JStat | ReadonlyArray<number>, callback?: (value: number) => void): JStat;
            spearmancoeff(other: JStat | ReadonlyArray<number>, callback?: (value: number) => void): JStat;

            // -- Special Functions instance methods --
            betafn(y: number, callback?: (value: number) => void): JStat;
            betaln(y: number, callback?: (value: number) => void): JStat;
            betacf(a: number, b: number, callback?: (value: number) => void): JStat;
            ibetainv(a: number, b: number, callback?: (value: number) => void): JStat;
            ibeta(a: number, b: number, callback?: (value: number) => void): JStat;
            gammafn(callback?: (value: number) => void): JStat;
            gammaln(callback?: (value: number) => void): JStat;
            gammap(x: number, callback?: (value: number) => void): JStat;
            lowRegGamma(x: number, callback?: (value: number) => void): JStat;
            gammapinv(a: number, callback?: (value: number) => void): JStat;
            factorialln(callback?: (value: number) => void): JStat;
            factorial(callback?: (value: number) => void): JStat;
            combination(m: number, callback?: (value: number) => void): JStat;
            permutation(m: number, callback?: (value: number) => void): JStat;
            erf(callback?: (value: number) => void): JStat;
            erfc(callback?: (value: number) => void): JStat;
            erfcinv(callback?: (value: number) => void): JStat;
            randn(callback?: (value: number) => void): JStat;
            randn(n: number, m?: number, callback?: (value: number | number[][]) => void): JStat;
            randg(callback?: (value: number) => void): JStat;
            randg(shape: number, n?: number, m?: number, callback?: (value: number | number[][]) => void): JStat;

            // -- Linear Algebra instance methods --
            add(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
            subtract(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
            divide(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
            multiply(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
            dot(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback?: (value: number) => void): JStat;
            pow(arg: number, callback?: (value: number | number[] | number[][]) => void): JStat;
            exp(callback?: (value: number | number[] | number[][]) => void): JStat;
            log(callback?: (value: number | number[] | number[][]) => void): JStat;
            abs(callback?: (value: number | number[] | number[][]) => void): JStat;
            norm(callback?: (value: number) => void): JStat;
            angle(arg: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>, callback?: (value: number) => void): JStat;

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
            anovafscore(): JStat;
            /** Returns the p-value of ANOVA for the current object's groups. */
            anovaftest(): JStat;

            // -- Distribution instance methods --
            beta(alpha: number, beta: number): ContinuousDistribution;
            cauchy(local: number, scale: number): ContinuousDistribution;
            centralF(df1: number, df2: number): ContinuousNoMedian;
            chisquare(dof: number): ContinuousDistribution;
            exponential(rate: number): ContinuousDistribution;
            gamma(shape: number, scale: number): ContinuousNoMedian;
            invgamma(shape: number, scale: number): ContinuousNoMedian;
            kumaraswamy(alpha: number, beta: number): ContinuousNoSample;
            lognormal(mu: number, sigma: number): ContinuousDistribution;
            normal(mean: number, std: number): ContinuousDistribution;
            pareto(scale: number, shape: number): ContinuousNoSample;
            studentt(dof: number): ContinuousDistribution;
            tukey(nmeans: number, dof: number): TukeyInstance;
            weibull(scale: number, shape: number): ContinuousDistribution;
            uniform(a: number, b: number): ContinuousDistribution;
            arcsine(a: number, b: number): ContinuousDistribution;
            triangular(a: number, b: number, c: number): TriangularInstance;
            binomial(n: number, p: number): DiscreteBasic;
            negbin(r: number, p: number): DiscreteBasic;
            hypgeom(N: number, m: number, n: number): DiscreteBasic;
            poisson(lambda: number): PoissonInstance;
        }
    }

    export = jStat;
}