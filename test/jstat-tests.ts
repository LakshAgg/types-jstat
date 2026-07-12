import jStat = require('jstat');

// -------------------------------------------------------------------------
// Core constructor tests
// -------------------------------------------------------------------------

// Constructor with array
const obj1: jStat.JStat = jStat([1, 2, 3, 4, 5]);

// Constructor with matrix
const obj2: jStat.JStat = jStat([[1, 2], [3, 4]]);

// Constructor with sequence
const obj3: jStat.JStat = jStat(0, 1, 5);
const obj4: jStat.JStat = jStat(0, 1, 5, (x: number, i: number) => x * 2);

// Constructor with transform
const obj5: jStat.JStat = jStat([1, 2], (x: number) => x * 2);

// Empty constructor
const obj6: jStat.JStat = jStat();

// -------------------------------------------------------------------------
// Core static method tests
// -------------------------------------------------------------------------

const matrix: number[][] = [[1, 2, 3], [4, 5, 6]];

const rowCount: number = jStat.rows(matrix);
const colCount: number = jStat.cols(matrix);
const dims: jStat.DimensionsResult = jStat.dimensions(matrix);
const row0: number[] = jStat.row(matrix, 0);
const col0: number[][] = jStat.col(matrix, 0);
const diag: number[][] = jStat.diag(matrix);
const antiDiag: number[][] = jStat.antidiag(matrix);
const transposed: number[][] = jStat.transpose(matrix);
const diagonalMatrix: number[][] = jStat.diagonal([1, 2, 3]);
const identity: number[][] = jStat.identity(3);
const zeros: number[][] = jStat.zeros(2, 3);
const ones: number[][] = jStat.ones(2);
const rand: number[][] = jStat.rand(3, 3);
const seq: number[] = jStat.seq(0, 1, 5);
const arange1: number[] = jStat.arange(5);
const arange2: number[] = jStat.arange(1, 5);
const arange3: number[] = jStat.arange(1, 5, 0.5);
const isSymmetric: boolean = jStat.symmetric([[1, 2], [2, 1]]);
const rowa: number[] = jStat.rowa([[1, 2], [3, 4]]);
const cola: number[] = jStat.cola([[1, 2], [3, 4]]);

// Slice
const sliced1: number[][] = jStat.slice(matrix, { end: 2 }, { start: 1 });
const sliced2: number[] = jStat.slice(matrix, 0, { start: 1 });
const sliced3: number[][] = jStat.slice(matrix, { row: { end: 2 }, col: { start: 1 } });
const instanceSliced1: number[][] = jStat(matrix).slice({ row: { end: 2 }, col: { start: 1 } });
const instanceSliced2: number[] = jStat(matrix).slice(1, { start: 1 });

// Map
const mapped: number[] | number[][] = jStat.map([1, 2, 3], (x) => x * 2);
const cumreduced: number[] | number[][] = jStat.cumreduce([1, 2, 3], (a, b) => a + b);

// -------------------------------------------------------------------------
// Vector static method tests
// -------------------------------------------------------------------------

const vector: number[] = [1, 2, 3, 4, 5];

const sum: number = jStat.sum(vector);
const sumsqrd: number = jStat.sumsqrd(vector);
const sumsqerr: number = jStat.sumsqerr(vector);
const product: number = jStat.product(vector);
const min: number = jStat.min(vector);
const max: number = jStat.max(vector);
const mean: number = jStat.mean(vector);
const meansqerr: number = jStat.meansqerr(vector);
const geomean: number = jStat.geomean([1, 2, 4]);
const median: number = jStat.median(vector);
const cumsum: number[] = jStat.cumsum(vector);
const cumprod: number[] = jStat.cumprod([1, 2, 3]);
const diff: number[] = jStat.diff(vector);
const ranks: number[] = jStat.rank(vector);
const mode: number | number[] = jStat.mode([1, 2, 2, 3]);
const range: number = jStat.range(vector);
const variance: number = jStat.variance(vector);
const sampleVariance: number = jStat.variance(vector, true);
const deviation: number[] = jStat.deviation(vector);
const stdev: number = jStat.stdev(vector);
const sampleStdev: number = jStat.stdev(vector, true);
const meandev: number = jStat.meandev(vector);
const meddev: number = jStat.meddev(vector);
const skewness: number = jStat.skewness(vector);
const kurtosis: number = jStat.kurtosis(vector);
const coeffvar: number = jStat.coeffvar(vector);
const quartiles: number[] = jStat.quartiles(vector);
const quantiles: number[] = jStat.quantiles(vector, [0.25, 0.5, 0.75]);
const percentile: number = jStat.percentile(vector, 0.5);
const percentileOfScore: number = jStat.percentileOfScore(vector, 3);
const histogram: number[] = jStat.histogram(vector, 4);
const covariance: number = jStat.covariance([1, 2, 3], [4, 5, 6]);
const corrcoeff: number = jStat.corrcoeff([1, 2, 3], [4, 5, 6]);
const spearmancoeff: number = jStat.spearmancoeff([1, 2, 3], [4, 5, 6]);
const pooledVar: number = jStat.pooledvariance([[1, 2], [3, 4]]);
const pooledStdev: number = jStat.pooledstdev([[1, 2], [3, 4]]);

// -------------------------------------------------------------------------
// Special Functions static method tests
// -------------------------------------------------------------------------

const betafn: number = jStat.betafn(2, 3);
const betaln: number = jStat.betaln(2, 3);
const betacf: number = jStat.betacf(0.5, 2, 3);
const ibeta: number = jStat.ibeta(0.5, 2, 3);
const ibetainv: number = jStat.ibetainv(0.5, 2, 3);
const gammafn: number = jStat.gammafn(5);
const gammaln: number = jStat.gammaln(5);
const gammap: number = jStat.gammap(2, 3);
const lowRegGamma: number = jStat.lowRegGamma(2, 3);
const gammapinv: number = jStat.gammapinv(0.5, 2);
const factorialln: number = jStat.factorialln(5);
const factorial: number = jStat.factorial(5);
const combination: number = jStat.combination(5, 2);
const permutation: number = jStat.permutation(5, 2);
const erf: number = jStat.erf(1);
const erfc: number = jStat.erfc(1);
const erfcinv: number = jStat.erfcinv(0.5);
const randn: number = jStat.randn();
const randnMatrix: number[][] = jStat.randn(3, 3);
const randg: number = jStat.randg(2);
const randgMatrix: number[][] = jStat.randg(2, 3, 3);

// -------------------------------------------------------------------------
// Linear Algebra static method tests
// -------------------------------------------------------------------------

const arr: number[] = [1, 2, 3];
const mat: number[][] = [[1, 2], [3, 4]];

const added: number[] | number[][] = jStat.add(mat, 1);
const subtracted: number[] | number[][] = jStat.subtract(mat, 1);
const divided: number[] | number[][] = jStat.divide(mat, 2);
const multiplied: number[] | number[][] = jStat.multiply(mat, 2);
const powResult: number[] | number[][] = jStat.pow(mat, 2);
const expResult: number[] | number[][] = jStat.exp(mat);
const logResult: number[] | number[][] = jStat.log(mat);
const absResult: number[] | number[][] = jStat.abs([[-1, -2], [3, 4]]);
const dotResult: number = jStat.dot([1, 2, 3], [4, 5, 6]);
const outerResult: number[][] = jStat.outer([1, 2, 3], [4, 5, 6]);
const norm: number = jStat.norm([1, 2, 3]);
const angle: number = jStat.angle([1, 0], [0, 1]);
const augmented: number[][] = jStat.aug([[1, 2], [3, 4]], [[5], [6]]);
const determinant: number = jStat.det([[1, 2], [3, 4]]);
const inverted: number[][] = jStat.inv([[1, 2], [3, 4]]);
const gaussElim: number[][] = jStat.gauss_elimination([[1, 2], [3, 4]], [5, 6]);
const gaussJordan: number[][] = jStat.gauss_jordan([[1, 2], [3, 4]], [5, 6]);
const gaussJacobi: number[] = jStat.gauss_jacobi([[2, 1], [1, 2]], [1, 1], 100);
const gaussSeidel: number[] = jStat.gauss_seidel([[2, 1], [1, 2]], [1, 1], 100);
const sorResult: number[] = jStat.SOR([[2, 1], [1, 2]], [1, 1], 100, [0, 0], 1.5);
const lstsqFlat: number[] = jStat.lstsq([[1, 2], [3, 4], [5, 6]], [1, 2, 3]);
const lstsqMatrix: number[][] = jStat.lstsq([[1, 2], [3, 4], [5, 6]], [[1], [2], [3]]);
const luDecomp: [number[][], number[][]] = jStat.lu([[1, 2], [3, 4]]);
const cholesky: number[][] = jStat.cholesky([[2, 1], [1, 2]]);
const householder: number[][] = jStat.householder([[1, 2], [3, 4]]);
const qrDecomp: [number[][], number[][]] = jStat.QR([[1, 2], [3, 4]]);
const jacobi: { eigenvalues: number[]; eigenvectors: number[][] } = jStat.jacobi([[1, 2], [2, 1]]);

// Numerical methods
const rkResult: Array<{ t: number; y: number[] }> = jStat.rungekutta(
    (t: number, y: number[]) => [y[0], t],
    [0, 0], 0, 10, 0.1
);
const rombergResult: number = jStat.romberg((x: number) => x * x, 0, 1);
const richardsonResult: number = jStat.richardson([1, 2, 3]);
const simpsonResult: number = jStat.simpson((x: number) => x * x, 0, 1);
const hermiteFn: (t: number) => number = jStat.hermite([0, 1], [0, 1], [1, 1]);
const lagrangeFn: (t: number) => number = jStat.lagrange([0, 1], [0, 1]);
const cubicSplineFn: (t: number) => number = jStat.cubic_spline([0, 1, 2], [0, 1, 0]);
const gaussQuad: number = jStat.gauss_quadrature((x: number) => x * x, 0, 1);
const pcaResult: { eigenvalues: number[]; eigenvectors: number[][]; projected: number[][] } =
    jStat.PCA([[1, 2], [3, 4], [5, 6]]);

// -------------------------------------------------------------------------
// Statistical Tests static method tests
// -------------------------------------------------------------------------

// Z tests
const zscore1: number = jStat.zscore(3, 5, 2);
const zscore2: number = jStat.zscore(3, [1, 2, 3, 4, 5]);
const zscore3: number = jStat.zscore(3, [1, 2, 3, 4, 5], true);
const ztest1: number = jStat.ztest(3, 5, 2);
const ztest2: number = jStat.ztest(3, 5, 2, 1);
const ztest3: number = jStat.ztest(1.96);
const ztest4: number = jStat.ztest(1.96, 2);
const ztest5: number = jStat.ztest(3, [1, 2, 3, 4, 5]);
const ztest6: number = jStat.ztest(3, [1, 2, 3, 4, 5], 1, true);

// T tests
const tscore1: number = jStat.tscore(3, 5, 2, 10);
const tscore2: number = jStat.tscore(3, [1, 2, 3, 4, 5]);
const ttest1: number = jStat.ttest(3, 5, 2, 10);
const ttest2: number = jStat.ttest(1.96, 10);
const ttest3: number = jStat.ttest(1.96, 10, 1);
const ttest4: number = jStat.ttest(3, [1, 2, 3, 4, 5]);
const ttest5: number = jStat.ttest(3, [1, 2, 3, 4, 5], 1);

// F tests / ANOVA
const anovaFs1: number = jStat.anovafscore([1, 2], [3, 4], [5, 6]);
const anovaFs2: number = jStat.anovafscore([[1, 2], [3, 4], [5, 6]]);
const anovaFt1: number = jStat.anovaftest([1, 2], [3, 4], [5, 6]);
const anovaFt2: number = jStat.anovaftest([[1, 2], [3, 4], [5, 6]]);
const ftest: number = jStat.ftest(3.5, 5, 10);

// Tukey tests
const qscore1: number = jStat.qscore(5, 3, 10, 10, 1.5);
const qscore2: number = jStat.qscore([1, 2, 3], [4, 5, 6], 1.5);
const qtest1: number = jStat.qtest(3.5, 30, 3);
const qtest2: number = jStat.qtest(5, 3, 10, 10, 1.5, 30, 3);
const qtest3: number = jStat.qtest([1, 2, 3], [4, 5, 6], 1.5, 30, 3);
const tukeyhsd: Array<[[number, number], number]> = jStat.tukeyhsd([[1, 2], [3, 4], [5, 6]]);

// Confidence intervals
const normalci1: number[] = jStat.normalci(5, 0.05, 2, 30);
const normalci2: number[] = jStat.normalci(5, 0.05, [1, 2, 3, 4, 5]);
const tci1: number[] = jStat.tci(5, 0.05, 2, 30);
const tci2: number[] = jStat.tci(5, 0.05, [1, 2, 3, 4, 5]);

// Proportion tests
const oneSided: number = jStat.fn.oneSidedDifferenceOfProportions(0.5, 100, 0.4, 100);
const twoSided: number = jStat.fn.twoSidedDifferenceOfProportions(0.5, 100, 0.4, 100);

// -------------------------------------------------------------------------
// Distribution static method tests
// -------------------------------------------------------------------------

// Beta
const betaPdf: number = jStat.beta.pdf(0.5, 2, 5);
const betaCdf: number = jStat.beta.cdf(0.5, 2, 5);
const betaInv: number = jStat.beta.inv(0.5, 2, 5);
const betaMean: number = jStat.beta.mean(2, 5);
const betaMedian: number = jStat.beta.median(2, 5);
const betaMode: number = jStat.beta.mode(2, 5);
const betaSample: number = jStat.beta.sample(2, 5);
const betaVariance: number = jStat.beta.variance(2, 5);
const betaDist: jStat.ContinuousDistribution = jStat.beta(2, 5);

// Cauchy (param name: local)
const cauchyPdf: number = jStat.cauchy.pdf(0, 0, 1);
const cauchyCdf: number = jStat.cauchy.cdf(0, 0, 1);
const cauchyInv: number = jStat.cauchy.inv(0.5, 0, 1);
const cauchyMedian: number = jStat.cauchy.median(0, 1);
const cauchyMode: number = jStat.cauchy.mode(0, 1);
const cauchySample: number = jStat.cauchy.sample(0, 1);
const cauchyVariance: number = jStat.cauchy.variance(0, 1);
const cauchyDist: jStat.ContinuousNoMedian = jStat.cauchy(0, 1);

// Central F (no median)
const centralFPdf: number = jStat.centralF.pdf(2.5, 10, 20);
const centralFCdf: number = jStat.centralF.cdf(2.5, 10, 20);
const centralFInv: number = jStat.centralF.inv(0.95, 10, 20);
const centralFMean: number = jStat.centralF.mean(10, 20);
const centralFMode: number = jStat.centralF.mode(10, 20);
const centralFSample: number = jStat.centralF.sample(10, 20);
const centralFVariance: number = jStat.centralF.variance(10, 20);
const centralFDist: jStat.ContinuousNoMedian = jStat.centralF(10, 20);

// Chi-square
const chiPdf: number = jStat.chisquare.pdf(3, 5);
const chiCdf: number = jStat.chisquare.cdf(3, 5);
const chiInv: number = jStat.chisquare.inv(0.95, 5);
const chiMean: number = jStat.chisquare.mean(5);
const chiMedian: number = jStat.chisquare.median(5);
const chiMode: number = jStat.chisquare.mode(5);
const chiSample: number = jStat.chisquare.sample(5);
const chiVariance: number = jStat.chisquare.variance(5);
const chiDist: jStat.ContinuousDistribution = jStat.chisquare(5);

// Normal
const normalPdf: number = jStat.normal.pdf(0, 0, 1);
const normalCdf: number = jStat.normal.cdf(0, 0, 1);
const normalInv: number = jStat.normal.inv(0.95, 0, 1);
const normalMean: number = jStat.normal.mean(0, 1);
const normalMedian: number = jStat.normal.median(0, 1);
const normalMode: number = jStat.normal.mode(0, 1);
const normalSample: number = jStat.normal.sample(0, 1);
const normalVariance: number = jStat.normal.variance(0, 1);
const normalDist: jStat.ContinuousDistribution = jStat.normal(0, 1);

// Gamma (no median)
const gammaPdf: number = jStat.gamma.pdf(1, 2, 3);
const gammaCdf: number = jStat.gamma.cdf(1, 2, 3);
const gammaInv: number = jStat.gamma.inv(0.5, 2, 3);
const gammaMean: number = jStat.gamma.mean(2, 3);
const gammaMode: number = jStat.gamma.mode(2, 3);
const gammaSample: number = jStat.gamma.sample(2, 3);
const gammaVariance: number = jStat.gamma.variance(2, 3);
const gammaDist: jStat.ContinuousNoMedian = jStat.gamma(2, 3);

// Gamma instance should not have median()
// @ts-expect-error - gamma has no median
gammaDist.median();

// Binomial
const binPdf: number = jStat.binomial.pdf(3, 10, 0.5);
const binCdf: number = jStat.binomial.cdf(3, 10, 0.5);
const binDist: jStat.DiscreteBasic = jStat.binomial(10, 0.5);

// Poisson
const poisPdf: number = jStat.poisson.pdf(3, 5);
const poisCdf: number = jStat.poisson.cdf(3, 5);
const poisSample: number = jStat.poisson.sample(5);
const poisDist: jStat.PoissonInstance = jStat.poisson(5);

// Tukey
const tukeyCdf: number = jStat.tukey.cdf(3.5, 4, 20);
const tukeyInv: number = jStat.tukey.inv(0.95, 4, 20);
const tukeyDist: jStat.TukeyInstance = jStat.tukey(4, 20);

// Triangular (no inv)
const triPdf: number = jStat.triangular.pdf(3, 1, 5, 3);
const triCdf: number = jStat.triangular.cdf(3, 1, 5, 3);
const triMean: number = jStat.triangular.mean(1, 5, 3);
const triMedian: number = jStat.triangular.median(1, 5, 3);
const triMode: number = jStat.triangular.mode(1, 5, 3);
const triSample: number = jStat.triangular.sample(1, 5, 3);
const triVariance: number = jStat.triangular.variance(1, 5, 3);
const triDist: jStat.TriangularInstance = jStat.triangular(1, 5, 3);

// Triangular instance should not have inv()
// @ts-expect-error - triangular has no inv
triDist.inv(0.5);

// Kumaraswamy (no sample)
const kumPdf: number = jStat.kumaraswamy.pdf(0.5, 2, 3);
const kumCdf: number = jStat.kumaraswamy.cdf(0.5, 2, 3);
const kumDist: jStat.ContinuousNoSample = jStat.kumaraswamy(2, 3);

// Kumaraswamy instance should not have sample()
// @ts-expect-error - kumaraswamy has no sample
kumDist.sample();

// Pareto (no sample)
const paretoPdf: number = jStat.pareto.pdf(2, 1, 2);
const paretoCdf: number = jStat.pareto.cdf(2, 1, 2);
const paretoDist: jStat.ContinuousNoSample = jStat.pareto(1, 2);

// Negative Binomial
const negbinPdf: number = jStat.negbin.pdf(3, 5, 0.5);
const negbinCdf: number = jStat.negbin.cdf(3, 5, 0.5);
const negbinDist: jStat.DiscreteBasic = jStat.negbin(5, 0.5);

// Hypergeometric
const hypPdf: number = jStat.hypgeom.pdf(3, 10, 5, 4);
const hypCdf: number = jStat.hypgeom.cdf(3, 10, 5, 4);
const hypDist: jStat.DiscreteBasic = jStat.hypgeom(10, 5, 4);

// Exponential
const expPdf: number = jStat.exponential.pdf(1, 2);
const expCdf: number = jStat.exponential.cdf(1, 2);
const expDist: jStat.ContinuousDistribution = jStat.exponential(2);

// Log-normal
const lognormalPdf: number = jStat.lognormal.pdf(1, 0, 1);
const lognormalCdf: number = jStat.lognormal.cdf(1, 0, 1);
const lognormalDist: jStat.ContinuousDistribution = jStat.lognormal(0, 1);

// Student's t
const tPdf: number = jStat.studentt.pdf(1.96, 10);
const tCdf: number = jStat.studentt.cdf(1.96, 10);
const tDist: jStat.ContinuousDistribution = jStat.studentt(10);

// Weibull
const weibullPdf: number = jStat.weibull.pdf(1, 2, 3);
const weibullCdf: number = jStat.weibull.cdf(1, 2, 3);
const weibullDist: jStat.ContinuousDistribution = jStat.weibull(2, 3);

// Uniform
const uniformPdf: number = jStat.uniform.pdf(0.5, 0, 1);
const uniformCdf: number = jStat.uniform.cdf(0.5, 0, 1);
const uniformDist: jStat.ContinuousDistribution = jStat.uniform(0, 1);

// Arcsine
const arcsinePdf: number = jStat.arcsine.pdf(0.5, 0, 1);
const arcsineCdf: number = jStat.arcsine.cdf(0.5, 0, 1);
const arcsineDist: jStat.ContinuousDistribution = jStat.arcsine(0, 1);

// Inverse Gamma (no median)
const invGammaPdf: number = jStat.invgamma.pdf(1, 2, 3);
const invGammaCdf: number = jStat.invgamma.cdf(1, 2, 3);
const invGammaDist: jStat.ContinuousNoMedian = jStat.invgamma(2, 3);

// -------------------------------------------------------------------------
// Distribution instance method tests
// -------------------------------------------------------------------------

const betaIns: jStat.ContinuousDistribution = jStat.beta(2, 5);
const betaInsPdf: number = betaIns.pdf(0.5);
const betaInsCdf: number = betaIns.cdf(0.5);
const betaInsInv: number = betaIns.inv(0.5);
const betaInsMean: number = betaIns.mean();
const betaInsMedian: number = betaIns.median();
const betaInsMode: number = betaIns.mode();
const betaInsSample: number = betaIns.sample();
const betaInsVariance: number = betaIns.variance();

// -------------------------------------------------------------------------
// JStat instance method tests
// -------------------------------------------------------------------------

// Core instance methods
const jstat: jStat.JStat = jStat([1, 2, 3, 4, 5]);

jstat.rows();
jstat.rows((v: number) => {});
jstat.cols();
jstat.cols((v: number) => {});
jstat.dimensions();
jstat.dimensions((v: jStat.DimensionsResult) => {});
jstat.row(0);
jstat.row(0, (v: jStat.JStat) => {});
jstat.col(0);
jstat.col(0, (v: jStat.JStat) => {});
jstat.diag();
jstat.diag((v: jStat.JStat) => {});
jstat.antidiag();
jstat.transpose();
jstat.map((x: number) => x * 2);
jstat.cumreduce((a: number, b: number) => a + b);
jstat.alter((x: number) => x * 2);
jstat.create(2, (r: number, c: number) => r + c);
jstat.create(2, 3, (r: number, c: number) => r + c);
jstat.zeros(2);
jstat.ones(2);
jstat.rand(3);
jstat.identity(3);
jstat.clear();
jstat.symmetric();
jstat.symmetric((v: boolean) => {});

// Vector instance methods
jstat.sum();
jstat.sum((v: number) => {});
jstat.sum(true);
jstat.sum(true, (v: number) => {});
jstat.mean();
jstat.mean(true);
jstat.min();
jstat.min(true, (v: number) => {});
jstat.max();
jstat.max(true);
jstat.variance();
jstat.stdev();
jstat.stdev(true);
jstat.median();
jstat.mode();
jstat.mode(true, (v: number | number[] | false) => {});
jstat.deviation();
jstat.meandev();
jstat.meddev();
jstat.coeffvar();
jstat.quartiles();
jstat.corrcoeff(jStat([4, 5, 6]));
jstat.spearmancoeff([4, 5, 6]);

// Linear algebra instance methods
const matObj: jStat.JStat = jStat([[1, 2, 3]]);
matObj.add(2);
matObj.subtract(1);
matObj.divide(2);
matObj.multiply(2);
matObj.pow(2);
matObj.exp();
matObj.log();
matObj.abs();
matObj.dot([1, 2, 3]);
matObj.norm();
matObj.angle([1, 0, 0]);

// Special functions instance methods
jstat.gammafn();
jstat.gammaln();
jstat.factorial();
jstat.erf();
jstat.erfc();
jstat.erfcinv();
jstat.randn();

// Statistical tests instance methods
jstat.zscore(3);
jstat.zscore(3, true);
jstat.ztest(3);
jstat.ztest(3, 1);
jstat.ztest(3, 2, true);
jstat.tscore(3);
jstat.ttest(3);
jstat.ttest(3, 1);

// Matrix ANOVA instance methods
const matrixObj: jStat.JStat = jStat([[1, 2], [3, 4], [5, 6]]);
matrixObj.anovafscore();
matrixObj.anovaftest();

// -------------------------------------------------------------------------
// Matrix instance method tests
// -------------------------------------------------------------------------

const matrixInst: jStat.JStat = jStat([[1, 2], [3, 4]]);
matrixInst.sum();
matrixInst.sum(true);
matrixInst.sum((v: number) => {});
matrixInst.mean();
matrixInst.mean(true);
matrixInst.min();
matrixInst.min(true);
matrixInst.max();
matrixInst.max(true);
matrixInst.variance();
matrixInst.variance(true);
matrixInst.stdev();
matrixInst.stdev(true);
matrixInst.deviation();
matrixInst.deviation(true);
matrixInst.meandev();
matrixInst.meandev(true);

// -------------------------------------------------------------------------
// Models tests
// -------------------------------------------------------------------------

const endog = [1, -2, 3, 4, -5, 6, 7, -8, 9];
const exog: number[][] = [
    [1, 2, 3], [1, 1, 0], [1, -2, 3], [1, 3, 4], [1, -10, 2],
    [1, 4, 4], [1, 10, 2], [1, 3, 2], [1, 4, -1]
];
const model: jStat.OLSModel = jStat.models.ols(endog, exog);
const nobs: number = model.nobs;
const coef: number[] = model.coef;
const r2: number = model.R2;
const aR2: number = model.aR2;
const tStat: number[] = model.t.stat;
const tP: number[] = model.t.p;
const fStat: number = model.f.stat;
const fPvalue: number = model.f.pvalue;

// -------------------------------------------------------------------------
// Utils tests
// -------------------------------------------------------------------------

const isArr: boolean = jStat.utils.isArray([]);
const isFn: boolean = jStat.utils.isFunction(() => {});
const isNum: boolean = jStat.utils.isNumber(42);

// -------------------------------------------------------------------------
// Chaining tests
// -------------------------------------------------------------------------

// Method chaining with callbacks
jStat([1, 2, 3, 4, 5])
    .sum((val: number) => {
        const _sum: number = val;
    })
    .mean((val: number) => {
        const _mean: number = val;
    })
    .stdev((val: number) => {
        const _stdev: number = val;
    });

// Create and chain
jStat()
    .create(2, (r: number, c: number) => r + c)
    .min(true, (val: number) => {});

// Distribution from instance
jStat(0, 1, 11)
    .min((val: number) => {})
    .beta(2, 5)
    .pdf();
