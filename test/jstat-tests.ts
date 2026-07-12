import jStat from 'jstat';

// ==========================================================================
// Runtime assertion helpers
// ==========================================================================

function _isArray(value: unknown, name: string): value is any[] {
    if (Array.isArray(value)) return true;
    if (typeof value != 'object') return false;
    if (value === null) return false;
    if (typeof (value as any).length === 'number') return true;
    return false;
}

function _section(name: string) {
    // console.log(`\n━━━ ${name} ━━━`);
}

function _pass(name: string, val: unknown) {
    // silently validate — if we get here the type is correct
    void val;
    // console.log(`  ✓ ${name}`);
}

function _assertIsNumber(value: unknown, name: string): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new TypeError(`${name}: expected number, got ${typeof value} (${String(value)})`);
    }
    return value;
}

function _assertIsNumberArray(arr: unknown, name: string): number[] {
    if (!_isArray(arr, name)) {
        throw new TypeError(`${name}: expected number[], got ${typeof arr}`);
    }
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number') {
            throw new TypeError(`${name}[${i}]: expected number, got ${typeof arr[i]}`);
        }
    }
    return arr;
}

function _assertIsMatrix(mat: unknown, name: string): number[][] {
    if (!_isArray(mat, name)) {
        throw new TypeError(`${name}: expected number[][], got ${typeof mat}`);
    }
    for (let i = 0; i < mat.length; i++) {
        if (!_isArray(mat[i], `${name}[${i}]`)) {
            throw new TypeError(`${name}[${i}]: expected number[], got ${typeof mat[i]}`);
        }
        for (let j = 0; j < mat[i].length; j++) {
            if (typeof mat[i][j] !== 'number') {
                throw new TypeError(`${name}[${i}][${j}]: expected number, got ${typeof mat[i][j]}`);
            }
        }
    }
    return mat;
}

function _assertIsString(value: unknown, name: string): string {
    if (typeof value !== 'string') {
        throw new TypeError(`${name}: expected string, got ${typeof value}`);
    }
    return value;
}

function _assertIsBoolean(value: unknown, name: string): boolean {
    if (typeof value !== 'boolean') {
        throw new TypeError(`${name}: expected boolean, got ${typeof value}`);
    }
    return value;
}

function _assertIsFunction(value: unknown, name: string): Function {
    if (typeof value !== 'function') {
        throw new TypeError(`${name}: expected function, got ${typeof value}`);
    }
    return value;
}

function _assertIsArray(value: unknown, name: string): unknown[] {
    if (!_isArray(value, name)) {
        throw new TypeError(`${name}: expected array, got ${typeof value}`);
    }
    return value;
}

function _assertIsObject(value: unknown, name: string): object {
    if (value === null || typeof value !== 'object') {
        throw new TypeError(`${name}: expected object, got ${typeof value}`);
    }
    if (_isArray(value, name)) {
        throw new TypeError(`${name}: expected plain object, got array`);
    }
    return value;
}

function _assertInstanceOf(value: unknown, cls: new (...args: any[]) => any, name: string): unknown {
    if (!(value instanceof cls)) {
        throw new TypeError(`${name}: expected instance of ${cls.name}, got ${typeof value}`);
    }
    return value;
}

// Re-exported helpers that _pass tags for visibility
function assertNumber(value: number, name: string): number {
    const result = _assertIsNumber(value, name);
    _pass(name, result);
    return result;
}

function assertNumberArray(arr: number[], name: string): number[] {
    const result = _assertIsNumberArray(arr, name);
    _pass(name, result);
    return result;
}

function assertMatrix(mat: number[][], name: string): number[][] {
    const result = _assertIsMatrix(mat, name);
    _pass(name, result);
    return result;
}

function assertBoolean(value: boolean, name: string): boolean {
    const result = _assertIsBoolean(value, name);
    _pass(name, result);
    return result;
}

function assertArray(value: any[], name: string): any[] {
    const result = _assertIsArray(value, name);
    _pass(name, result);
    return result;
}

function assertObject(value: object, name: string): object {
    const result = _assertIsObject(value, name);
    _pass(name, result);
    return result;
}

function assertInstanceOf<T extends new (...args: any[]) => any>(value: InstanceType<T>, cls: T, name: string): unknown {
    const result = _assertInstanceOf(value, cls, name);
    _pass(name, result);
    return result;
}

// ==========================================================================
// Core constructor tests
// ==========================================================================

_section('Core Constructor Tests');

// Constructor with array
const obj1: jStat.JStat = jStat([1, 2, 3, 4, 5]);
assertInstanceOf(obj1, jStat.jStat, 'obj1 (array constructor)');

// Constructor with matrix
const obj2: jStat.JStat = jStat([[1, 2], [3, 4]]);
assertInstanceOf(obj2, jStat.jStat, 'obj2 (matrix constructor)');

// Constructor with sequence
const obj3: jStat.JStat = jStat(0, 1, 5);
assertInstanceOf(obj3, jStat.jStat, 'obj3 (seq)');

const obj4: jStat.JStat = jStat(0, 1, 5, (x: number, i: number) => x * 2);
assertInstanceOf(obj4, jStat.jStat, 'obj4 (seq + transform)');

// Constructor with transform
const obj5: jStat.JStat = jStat([1, 2], (x: number) => x * 2);
assertInstanceOf(obj5, jStat.jStat, 'obj5 (array + transform)');

// Empty constructor
const obj6: jStat.JStat = jStat();
assertInstanceOf(obj6, jStat.jStat, 'obj6 (empty constructor)');

// -------------------------------------------------------------------------
// Core static method tests
// -------------------------------------------------------------------------

_section('Core Static Methods');

const matrix: number[][] = [[1, 2, 3], [4, 5, 6]];

const rowCount: number = jStat.rows(matrix);
assertNumber(rowCount, 'jStat.rows');
const colCount: number = jStat.cols(matrix);
assertNumber(colCount, 'jStat.cols');
const dims: jStat.DimensionsResult = jStat.dimensions(matrix);
assertObject(dims, 'jStat.dimensions');
const row0: number[] = jStat.row(matrix, 0);
assertNumberArray(row0, 'jStat.row');
const col0: number[][] = jStat.col(matrix, 0);
assertMatrix(col0, 'jStat.col');
const diag: number[][] = jStat.diag(matrix);
assertMatrix(diag, 'jStat.diag');
const antiDiag: number[][] = jStat.antidiag(matrix);
assertMatrix(antiDiag, 'jStat.antidiag');
const transposed: number[][] = jStat.transpose(matrix);
assertMatrix(transposed, 'jStat.transpose');
const diagonalMatrix: number[][] = jStat.diagonal([1, 2, 3]);
assertMatrix(diagonalMatrix, 'jStat.diagonal');
const identity: number[][] = jStat.identity(3);
assertMatrix(identity, 'jStat.identity');
assertNumber(identity.length, 'jStat.identity.length');
const zeros: number[][] = jStat.zeros(2, 3);
assertMatrix(zeros, 'jStat.zeros');
const ones: number[][] = jStat.ones(2);
assertMatrix(ones, 'jStat.ones');
const rand: number[][] = jStat.rand(3, 3);
assertMatrix(rand, 'jStat.rand');
const seq: number[] = jStat.seq(0, 1, 5);
assertNumberArray(seq, 'jStat.seq');
const arange1: number[] = jStat.arange(5);
assertNumberArray(arange1, 'jStat.arange(5)');
const arange2: number[] = jStat.arange(1, 5);
assertNumberArray(arange2, 'jStat.arange(1, 5)');
const arange3: number[] = jStat.arange(1, 5, 0.5);
assertNumberArray(arange3, 'jStat.arange(1, 5, 0.5)');
const isSymmetric: boolean = jStat.symmetric([[1, 2], [2, 1]]);
assertBoolean(isSymmetric, 'jStat.symmetric');

// broken
// const rowa: number[] = jStat.rowa([[1, 2], [3, 4]], 0);
// assertNumberArray(rowa, 'jStat.rowa');
// broken
// const cola: number[] = jStat.cola([[1, 2], [3, 4]], 0);
// assertNumberArray(cola, 'jStat.cola');
// const rowan: number[] = jStat.rowa([[1, 2], [3, 4]], [0, 1]);
// assertNumberArray(rowan, 'jStat.rowa multiple');
// const colan: number[] = jStat.cola([[1, 2], [3, 4]], [0, 1]);
// assertNumberArray(colan, 'jStat.cola multiple');

// Slice
const sliced1: number[][] = jStat.slice(matrix, { row: { end: 2 }, col: { start: 1 } });
assertMatrix(sliced1, 'jStat.slice (obj opts)');
const sliced2: number[] = jStat.slice(matrix, { row: 1, col: { start: 1 } });
assertNumberArray(sliced2, 'jStat.slice (row index)');
const sliced3: number[][] = jStat.slice(matrix, { row: { end: 2 }, col: { start: 1 } });
assertMatrix(sliced3, 'jStat.slice (full obj)');
const instanceSliced1: number[][] | number[] | number = jStat(matrix).slice({ row: { end: 2 }, col: { start: 1 } });
assertMatrix(instanceSliced1 as number[][], 'instance.slice');
const instanceSliced2: number[][] | number[] | number = jStat(matrix).slice({ row: 1, col: { start: 1 } });
assertMatrix(instanceSliced2 as number[][], 'instance.slice (row idx)');

// Map
const mapped: number[] | number[][] = jStat.map([1, 2, 3], (x) => x * 2);
assertArray(mapped, 'jStat.map');
const cumreduced: number[] | number[][] = jStat.cumreduce([1, 2, 3], (a, b) => a + b);
assertArray(cumreduced, 'jStat.cumreduce');

// -------------------------------------------------------------------------
// Vector static method tests
// -------------------------------------------------------------------------

_section('Vector Static Methods');

const vector: number[] = [1, 2, 3, 4, 5];

const sum: number = jStat.sum(vector);
assertNumber(sum, 'jStat.sum');
const sumsqrd: number = jStat.sumsqrd(vector);
assertNumber(sumsqrd, 'jStat.sumsqrd');
const sumsqerr: number = jStat.sumsqerr(vector);
assertNumber(sumsqerr, 'jStat.sumsqerr');
const product: number = jStat.product(vector);
assertNumber(product, 'jStat.product');
const min: number = jStat.min(vector);
assertNumber(min, 'jStat.min');
const max: number = jStat.max(vector);
assertNumber(max, 'jStat.max');
const mean: number = jStat.mean(vector);
assertNumber(mean, 'jStat.mean');
const meansqerr: number = jStat.meansqerr(vector);
assertNumber(meansqerr, 'jStat.meansqerr');
const geomean: number = jStat.geomean([1, 2, 4]);
assertNumber(geomean, 'jStat.geomean');
const median: number = jStat.median(vector);
assertNumber(median, 'jStat.median');
const cumsum: number[] = jStat.cumsum(vector);
assertNumberArray(cumsum, 'jStat.cumsum');
const cumprod: number[] = jStat.cumprod([1, 2, 3]);
assertNumberArray(cumprod, 'jStat.cumprod');
const diff: number[] = jStat.diff(vector);
assertNumberArray(diff, 'jStat.diff');
const ranks: number[] = jStat.rank(vector);
assertNumberArray(ranks, 'jStat.rank');
const modeSingle: number | number[] = jStat.mode([1, 2, 2, 3]);
assertNumber(modeSingle as number, 'jStat.mode');
const mode: number | number[] = jStat.mode([1, 2, 3]);
assertArray(mode as number[], 'jStat.mode');
const range: number = jStat.range(vector);
assertNumber(range, 'jStat.range');
const variance: number = jStat.variance(vector);
assertNumber(variance, 'jStat.variance');
const sampleVariance: number = jStat.variance(vector, true);
assertNumber(sampleVariance, 'jStat.variance(sample)');
const deviation: number[] = jStat.deviation(vector);
assertNumberArray(deviation, 'jStat.deviation');
const stdev: number = jStat.stdev(vector);
assertNumber(stdev, 'jStat.stdev');
const sampleStdev: number = jStat.stdev(vector, true);
assertNumber(sampleStdev, 'jStat.stdev(sample)');
const meandev: number = jStat.meandev(vector);
assertNumber(meandev, 'jStat.meandev');
const meddev: number = jStat.meddev(vector);
assertNumber(meddev, 'jStat.meddev');
const skewness: number = jStat.skewness(vector);
assertNumber(skewness, 'jStat.skewness');
const kurtosis: number = jStat.kurtosis(vector);
assertNumber(kurtosis, 'jStat.kurtosis');
const coeffvar: number = jStat.coeffvar(vector);
assertNumber(coeffvar, 'jStat.coeffvar');
const quartiles: number[] = jStat.quartiles(vector);
assertNumberArray(quartiles, 'jStat.quartiles');
const quantiles: number[] = jStat.quantiles(vector, [0.25, 0.5, 0.75]);
assertNumberArray(quantiles, 'jStat.quantiles');
const percentile: number = jStat.percentile(vector, 0.5);
assertNumber(percentile, 'jStat.percentile');
const percentileOfScore: number = jStat.percentileOfScore(vector, 3);
assertNumber(percentileOfScore, 'jStat.percentileOfScore');
const histogram: number[] = jStat.histogram(vector, 4);
assertNumberArray(histogram, 'jStat.histogram');
const covariance: number = jStat.covariance([1, 2, 3], [4, 5, 6]);
assertNumber(covariance, 'jStat.covariance');
const corrcoeff: number = jStat.corrcoeff([1, 2, 3], [4, 5, 6]);
assertNumber(corrcoeff, 'jStat.corrcoeff');
const spearmancoeff: number = jStat.spearmancoeff([1, 2, 3], [4, 5, 6]);
assertNumber(spearmancoeff, 'jStat.spearmancoeff');
const pooledVar: number = jStat.pooledvariance([[1, 2], [3, 4]]);
assertNumber(pooledVar, 'jStat.pooledvariance');
const pooledStdev: number = jStat.pooledstdev([[1, 2], [3, 4]]);
assertNumber(pooledStdev, 'jStat.pooledstdev');

// -------------------------------------------------------------------------
// Special Functions static method tests
// -------------------------------------------------------------------------

_section('Special Functions');

const betafn: number | undefined = jStat.betafn(2, 3);
assertNumber(betafn as number, 'jStat.betafn');
const betaln: number = jStat.betaln(2, 3);
assertNumber(betaln, 'jStat.betaln');
const betacf: number = jStat.betacf(0.5, 2, 3);
assertNumber(betacf, 'jStat.betacf');
const ibeta: number | false = jStat.ibeta(0.5, 2, 3);
assertNumber(ibeta as number, 'jStat.ibeta');
const ibetainv: number = jStat.ibetainv(0.5, 2, 3);
assertNumber(ibetainv, 'jStat.ibetainv');
const gammafn: number = jStat.gammafn(5);
assertNumber(gammafn, 'jStat.gammafn');
const gammaln: number = jStat.gammaln(5);
assertNumber(gammaln, 'jStat.gammaln');
const gammap: number = jStat.gammap(2, 3);
assertNumber(gammap, 'jStat.gammap');
const lowRegGamma: number = jStat.lowRegGamma(2, 3);
assertNumber(lowRegGamma, 'jStat.lowRegGamma');
const gammapinv: number = jStat.gammapinv(0.5, 2);
assertNumber(gammapinv, 'jStat.gammapinv');
const factorialln: number = jStat.factorialln(5);
assertNumber(factorialln, 'jStat.factorialln');
const factorial: number = jStat.factorial(5);
assertNumber(factorial, 'jStat.factorial');
const combination: number = jStat.combination(5, 2);
assertNumber(combination, 'jStat.combination');
const permutation: number = jStat.permutation(5, 2);
assertNumber(permutation, 'jStat.permutation');
const erf: number = jStat.erf(1);
assertNumber(erf, 'jStat.erf');
const erfc: number = jStat.erfc(1);
assertNumber(erfc, 'jStat.erfc');
const erfcinv: number = jStat.erfcinv(0.5);
assertNumber(erfcinv, 'jStat.erfcinv');
const randn: number = jStat.randn();
assertNumber(randn, 'jStat.randn');
const randnMatrix: number[][] = jStat.randn(3, 3);
assertMatrix(randnMatrix, 'jStat.randn(matrix)');
const randg: number = jStat.randg(2);
assertNumber(randg, 'jStat.randg');
const randgMatrix: number[][] = jStat.randg(2, 3, 3);
assertMatrix(randgMatrix, 'jStat.randg(matrix)');

// -------------------------------------------------------------------------
// Linear Algebra static method tests
// -------------------------------------------------------------------------

_section('Linear Algebra');

const arr: number[] = [1, 2, 3];
const mat: number[][] = [[1, 2], [3, 4]];

const added: number[] | number[][] = jStat.add(mat, 1);
assertArray(added, 'jStat.add');
const subtracted: number[] | number[][] = jStat.subtract(mat, 1);
assertArray(subtracted, 'jStat.subtract');
const divided: number[] | number[][] = jStat.divide(mat, 2);
assertArray(divided, 'jStat.divide');
const multiplied: number[] | number[][] = jStat.multiply(mat, 2);
assertArray(multiplied, 'jStat.multiply');
const powResult: number[] | number[][] = jStat.pow(mat, 2);
assertArray(powResult, 'jStat.pow');
const expResult: number[] | number[][] = jStat.exp(mat);
assertArray(expResult, 'jStat.exp');
const logResult: number[] | number[][] = jStat.log(mat);
assertArray(logResult, 'jStat.log');
const absResult: number[] | number[][] = jStat.abs([[-1, -2], [3, 4]]);
assertArray(absResult, 'jStat.abs');
const dotResult: number = jStat.dot([1, 2, 3], [4, 5, 6]);
assertNumber(dotResult, 'jStat.dot');
const outerResult: number[][] = jStat.outer([1, 2, 3], [4, 5, 6]);
assertMatrix(outerResult, 'jStat.outer');
const norm: number = jStat.norm([1, 2, 3]);
assertNumber(norm, 'jStat.norm');
const angle: number = jStat.angle([1, 0], [0, 1]);
assertNumber(angle, 'jStat.angle');
const augmented: number[][] = jStat.aug([[1, 2], [3, 4]], [[5], [6]]);
assertMatrix(augmented, 'jStat.aug');
const determinant: number = jStat.det([[1, 2], [3, 4]]);
assertNumber(determinant, 'jStat.det');
const inverted: number[][] = jStat.inv([[1, 2], [3, 4]]);
assertMatrix(inverted, 'jStat.inv');
const sorResult: number[] | number[][] = jStat.SOR([[2, 1], [1, 2]], [[1], [1]], [[0], [0]], 0.01, 1.5);
assertArray(sorResult, 'jStat.SOR');
const lstsqFlat: number[] = jStat.lstsq([[1, 2], [3, 4], [5, 6]], [1, 2, 3]);
assertNumberArray(lstsqFlat, 'jStat.lstsq (flat)');
const lstsqMatrix: number[][] = jStat.lstsq([[1, 2], [3, 4], [5, 6]], [[1], [2], [3]]);
assertMatrix(lstsqMatrix, 'jStat.lstsq (matrix)');
const luDecomp: [number[][], number[][]] = jStat.lu([[1, 2], [3, 4]]);
assertArray(luDecomp[0], 'jStat.lu.L');
assertArray(luDecomp[1], 'jStat.lu.U');
const cholesky: number[][] = jStat.cholesky([[2, 1], [1, 2]]);
assertMatrix(cholesky, 'jStat.cholesky');
const householder: number[][] = jStat.householder([[1, 2], [3, 4]]);
assertMatrix(householder, 'jStat.householder');
const qrDecomp: [number[][], number[][]] = jStat.QR([[1, 2], [3, 4]]);
assertArray(qrDecomp[0], 'jStat.QR.Q');
assertArray(qrDecomp[1], 'jStat.QR.R');
const jacobi: [number[][], number[]] = jStat.jacobi([[1, 2], [2, 1]]);
assertArray(jacobi, 'jStat.jacobi');
assertMatrix(jacobi[0], 'jStat.jacobi.eigenvectors');
assertNumberArray(jacobi[1], 'jStat.jacobi.eigenvalues');

// Numerical methods
const rkResult: number = jStat.rungekutta((t, y) => y * 0.5, 0.1, 0.4, 0, 5, 2);
assertNumber(rkResult, 'jStat.rungekutta');

const rombergResult: [number] = jStat.romberg((x: number) => x * x, 0, 1, 1);
assertArray(rombergResult, 'jStat.romberg');
assertNumber(rombergResult[0], 'jStat.romberg[0]');

const richardsonResult: [number] = jStat.richardson([0.0, 0.5, 1.0, 1.5, 2.0], [0.0, 0.25, 1.0, 2.25, 4.0], 1.0, 0.5);
assertArray(richardsonResult, 'jStat.richardson');
assertNumber(richardsonResult[0], 'jStat.richardson[0]');

const simpsonResult: number = jStat.simpson((x) => Math.sin(x), 0, Math.PI, 100);
assertNumber(simpsonResult, 'jStat.simpson');

const hermite: number = jStat.hermite([0, 1, 2], [0, 1, 8], [0, 3, 12], 1.5);
assertNumber(hermite, 'jStat.hermite');

const lagrangeFn: number = jStat.lagrange([0, 1, 2], [0, 1, 8], 1.5);
assertNumber(lagrangeFn, 'jStat.lagrange');

// broken
// const cubicSplineFn: number = jStat.cubic_spline([0, 1, 2, 3], [0, 1, 8, 27], 1.5);
// assertNumber(cubicSplineFn, 'jStat.cubic_spline');

// not implemented
// const gaussQuad: number = jStat.gauss_quadrature((x: number) => x * x, 0, 1);
// assertNumber(gaussQuad, 'jStat.gauss_quadrature');

const pcaResult: [number[][], number[], number[][], number[][]] =
    jStat.PCA([[1, 2], [3, 4], [5, 6]]);
assertArray(pcaResult, 'jStat.PCA');
assertMatrix(pcaResult[0], 'jStat.PCA.centered');
assertNumberArray(pcaResult[1], 'jStat.PCA.eigenvalues');
assertMatrix(pcaResult[2], 'jStat.PCA.eigenvectors');
assertMatrix(pcaResult[3], 'jStat.PCA.projected');

// -------------------------------------------------------------------------
// Statistical Tests static method tests
// -------------------------------------------------------------------------

_section('Statistical Tests');

// Z tests
const zscore1: number = jStat.zscore(3, 5, 2);
assertNumber(zscore1, 'jStat.zscore (params)');
const zscore2: number = jStat.zscore(3, [1, 2, 3, 4, 5]);
assertNumber(zscore2, 'jStat.zscore (data)');
const zscore3: number = jStat.zscore(3, [1, 2, 3, 4, 5], true);
assertNumber(zscore3, 'jStat.zscore (pop)');
const ztest1: number = jStat.ztest(3, 5, 2);
assertNumber(ztest1, 'jStat.ztest (params)');
const ztest2: number = jStat.ztest(3, 5, 2, 1);
assertNumber(ztest2, 'jStat.ztest (params + sigma)');
const ztest3: number = jStat.ztest(1.96);
assertNumber(ztest3, 'jStat.ztest (z)');
const ztest4: number = jStat.ztest(1.96, 2);
assertNumber(ztest4, 'jStat.ztest (z + df)');
const ztest5: number = jStat.ztest(3, [1, 2, 3, 4, 5]);
assertNumber(ztest5, 'jStat.ztest (data)');
const ztest6: number = jStat.ztest(3, [1, 2, 3, 4, 5], 1, true);
assertNumber(ztest6, 'jStat.ztest (full)');

// T tests
const tscore1: number = jStat.tscore(3, 5, 2, 10);
assertNumber(tscore1, 'jStat.tscore (params)');
const tscore2: number = jStat.tscore(3, [1, 2, 3, 4, 5]);
assertNumber(tscore2, 'jStat.tscore (data)');
const ttest1: number = jStat.ttest(3, 5, 2, 10);
assertNumber(ttest1, 'jStat.ttest (params)');
const ttest2: number = jStat.ttest(1.96, 10);
assertNumber(ttest2, 'jStat.ttest (t + df)');
const ttest3: number = jStat.ttest(1.96, 10, 1);
assertNumber(ttest3, 'jStat.ttest (pop)');
const ttest4: number = jStat.ttest(3, [1, 2, 3, 4, 5]);
assertNumber(ttest4, 'jStat.ttest (data)');
const ttest5: number = jStat.ttest(3, [1, 2, 3, 4, 5], 1);
assertNumber(ttest5, 'jStat.ttest (pop)');

// F tests / ANOVA
const anovaFs1: number = jStat.anovafscore([1, 2], [3, 4], [5, 6]);
assertNumber(anovaFs1, 'jStat.anovafscore (flattened)');
const anovaFs2: number = jStat.anovafscore([[1, 2], [3, 4], [5, 6]]);
assertNumber(anovaFs2, 'jStat.anovafscore (arrays)');
const anovaFt1: number = jStat.anovaftest([1, 2], [3, 4], [5, 6]);
assertNumber(anovaFt1, 'jStat.anovaftest (flattened)');
const ftest: number = jStat.ftest(3.5, 5, 10);
assertNumber(ftest, 'jStat.ftest');

// Tukey tests
const qscore1: number = jStat.qscore(5, 3, 10, 10, 1.5);
assertNumber(qscore1, 'jStat.qscore (params)');
const qscore2: number = jStat.qscore([1, 2, 3], [4, 5, 6], 1.5);
assertNumber(qscore2, 'jStat.qscore (data)');
const qtest1: number = jStat.qtest(3.5, 30, 3);
assertNumber(qtest1, 'jStat.qtest (q + df + k)');
const qtest2: number = jStat.qtest(5, 3, 10, 10, 1.5, 30, 3);
assertNumber(qtest2, 'jStat.qtest (full)');
const qtest3: number = jStat.qtest([1, 2, 3], [4, 5, 6], 1.5, 30, 3);
assertNumber(qtest3, 'jStat.qtest (data)');
const tukeyhsd: Array<[[number, number], number]> = jStat.tukeyhsd([[1, 2], [3, 4], [5, 6]]);
assertArray(tukeyhsd, 'jStat.tukeyhsd');

// Confidence intervals
const normalci1: number[] = jStat.normalci(5, 0.05, 2, 30);
assertNumberArray(normalci1, 'jStat.normalci (params)');
const normalci2: number[] = jStat.normalci(5, 0.05, [1, 2, 3, 4, 5]);
assertNumberArray(normalci2, 'jStat.normalci (data)');
const tci1: number[] = jStat.tci(5, 0.05, 2, 30);
assertNumberArray(tci1, 'jStat.tci (params)');
const tci2: number[] = jStat.tci(5, 0.05, [1, 2, 3, 4, 5]);
assertNumberArray(tci2, 'jStat.tci (data)');

// Proportion tests (instance methods)
const oneSided: number = jStat([1, 2, 3]).oneSidedDifferenceOfProportions(0.5, 100, 0.4, 100);
assertNumber(oneSided, 'jStat.oneSidedDifferenceOfProportions');
const twoSided: number = jStat([1, 2, 3]).twoSidedDifferenceOfProportions(0.5, 100, 0.4, 100);
assertNumber(twoSided, 'jStat.twoSidedDifferenceOfProportions');

// -------------------------------------------------------------------------
// Distribution static method tests
// -------------------------------------------------------------------------

_section('Distribution Static Methods');

// Beta
const betaPdf: number = jStat.beta.pdf(0.5, 2, 5);
assertNumber(betaPdf, 'jStat.beta.pdf');
const betaCdf: number = jStat.beta.cdf(0.5, 2, 5);
assertNumber(betaCdf, 'jStat.beta.cdf');
const betaInv: number = jStat.beta.inv(0.5, 2, 5);
assertNumber(betaInv, 'jStat.beta.inv');
const betaMean: number = jStat.beta.mean(2, 5);
assertNumber(betaMean, 'jStat.beta.mean');
const betaMedian: number = jStat.beta.median(2, 5);
assertNumber(betaMedian, 'jStat.beta.median');
const betaMode: number = jStat.beta.mode(2, 5);
assertNumber(betaMode, 'jStat.beta.mode');
const betaSample: number = jStat.beta.sample(2, 5);
assertNumber(betaSample, 'jStat.beta.sample');
const betaVariance: number = jStat.beta.variance(2, 5);
assertNumber(betaVariance, 'jStat.beta.variance');

// Cauchy (param name: local)
const cauchyPdf: number = jStat.cauchy.pdf(0, 0, 1);
assertNumber(cauchyPdf, 'jStat.cauchy.pdf');
const cauchyCdf: number = jStat.cauchy.cdf(0, 0, 1);
assertNumber(cauchyCdf, 'jStat.cauchy.cdf');
const cauchyInv: number = jStat.cauchy.inv(0.5, 0, 1);
assertNumber(cauchyInv, 'jStat.cauchy.inv');
const cauchyMedian: number = jStat.cauchy.median(0, 1);
assertNumber(cauchyMedian, 'jStat.cauchy.median');
const cauchyMode: number = jStat.cauchy.mode(0, 1);
assertNumber(cauchyMode, 'jStat.cauchy.mode');
const cauchySample: number = jStat.cauchy.sample(0, 1);
assertNumber(cauchySample, 'jStat.cauchy.sample');

// Central F (no median)
const centralFPdf: number = jStat.centralF.pdf(2.5, 10, 20);
assertNumber(centralFPdf, 'jStat.centralF.pdf');
const centralFCdf: number = jStat.centralF.cdf(2.5, 10, 20);
assertNumber(centralFCdf, 'jStat.centralF.cdf');
const centralFInv: number = jStat.centralF.inv(0.95, 10, 20);
assertNumber(centralFInv, 'jStat.centralF.inv');
const centralFMean: number = jStat.centralF.mean(10, 20);
assertNumber(centralFMean, 'jStat.centralF.mean');
const centralFMode: number = jStat.centralF.mode(10, 20);
assertNumber(centralFMode, 'jStat.centralF.mode');
const centralFSample: number = jStat.centralF.sample(10, 20);
assertNumber(centralFSample, 'jStat.centralF.sample');
const centralFVariance: number = jStat.centralF.variance(10, 20);
assertNumber(centralFVariance, 'jStat.centralF.variance');

// Chi-square
const chiPdf: number = jStat.chisquare.pdf(3, 5);
assertNumber(chiPdf, 'jStat.chisquare.pdf');
const chiCdf: number = jStat.chisquare.cdf(3, 5);
assertNumber(chiCdf, 'jStat.chisquare.cdf');
const chiInv: number = jStat.chisquare.inv(0.95, 5);
assertNumber(chiInv, 'jStat.chisquare.inv');
const chiMean: number = jStat.chisquare.mean(5);
assertNumber(chiMean, 'jStat.chisquare.mean');
const chiMedian: number = jStat.chisquare.median(5);
assertNumber(chiMedian, 'jStat.chisquare.median');
const chiMode: number = jStat.chisquare.mode(5);
assertNumber(chiMode, 'jStat.chisquare.mode');
const chiSample: number = jStat.chisquare.sample(5);
assertNumber(chiSample, 'jStat.chisquare.sample');
const chiVariance: number = jStat.chisquare.variance(5);
assertNumber(chiVariance, 'jStat.chisquare.variance');

// Normal
const normalPdf: number = jStat.normal.pdf(0, 0, 1);
assertNumber(normalPdf, 'jStat.normal.pdf');
const normalCdf: number = jStat.normal.cdf(0, 0, 1);
assertNumber(normalCdf, 'jStat.normal.cdf');
const normalInv: number = jStat.normal.inv(0.95, 0, 1);
assertNumber(normalInv, 'jStat.normal.inv');
const normalMean: number = jStat.normal.mean(0, 1);
assertNumber(normalMean, 'jStat.normal.mean');
const normalMedian: number = jStat.normal.median(0, 1);
assertNumber(normalMedian, 'jStat.normal.median');
const normalMode: number = jStat.normal.mode(0, 1);
assertNumber(normalMode, 'jStat.normal.mode');
const normalSample: number = jStat.normal.sample(0, 1);
assertNumber(normalSample, 'jStat.normal.sample');
const normalVariance: number = jStat.normal.variance(0, 1);
assertNumber(normalVariance, 'jStat.normal.variance');

// Gamma (no median)
const gammaPdf: number = jStat.gamma.pdf(1, 2, 3);
assertNumber(gammaPdf, 'jStat.gamma.pdf');
const gammaCdf: number = jStat.gamma.cdf(1, 2, 3);
assertNumber(gammaCdf, 'jStat.gamma.cdf');
const gammaInv: number = jStat.gamma.inv(0.5, 2, 3);
assertNumber(gammaInv, 'jStat.gamma.inv');
const gammaMean: number = jStat.gamma.mean(2, 3);
assertNumber(gammaMean, 'jStat.gamma.mean');
const gammaMode: number = jStat.gamma.mode(2, 3);
assertNumber(gammaMode, 'jStat.gamma.mode');
const gammaSample: number = jStat.gamma.sample(2, 3);
assertNumber(gammaSample, 'jStat.gamma.sample');
const gammaVariance: number = jStat.gamma.variance(2, 3);
assertNumber(gammaVariance, 'jStat.gamma.variance');

// Binomial
const binPdf: number = jStat.binomial.pdf(3, 10, 0.5);
assertNumber(binPdf, 'jStat.binomial.pdf');
const binCdf: number = jStat.binomial.cdf(3, 10, 0.5);
assertNumber(binCdf, 'jStat.binomial.cdf');

// Poisson
const poisPdf: number = jStat.poisson.pdf(3, 5);
assertNumber(poisPdf, 'jStat.poisson.pdf');
const poisCdf: number = jStat.poisson.cdf(3, 5);
assertNumber(poisCdf, 'jStat.poisson.cdf');
const poisSample: number = jStat.poisson.sample(5);
assertNumber(poisSample, 'jStat.poisson.sample');

// Tukey
const tukeyCdf: number = jStat.tukey.cdf(3.5, 4, 20);
assertNumber(tukeyCdf, 'jStat.tukey.cdf');
const tukeyInv: number = jStat.tukey.inv(0.95, 4, 20);
assertNumber(tukeyInv, 'jStat.tukey.inv');


// Triangular (no inv)
const triPdf: number = jStat.triangular.pdf(3, 1, 5, 3);
assertNumber(triPdf, 'jStat.triangular.pdf');
const triCdf: number = jStat.triangular.cdf(3, 1, 5, 3);
assertNumber(triCdf, 'jStat.triangular.cdf');
const triMean: number = jStat.triangular.mean(1, 5, 3);
assertNumber(triMean, 'jStat.triangular.mean');
const triMedian: number = jStat.triangular.median(1, 5, 3);
assertNumber(triMedian, 'jStat.triangular.median');
const triMode: number = jStat.triangular.mode(1, 5, 3);
assertNumber(triMode, 'jStat.triangular.mode');
const triSample: number = jStat.triangular.sample(1, 5, 3);
assertNumber(triSample, 'jStat.triangular.sample');
const triVariance: number = jStat.triangular.variance(1, 5, 3);
assertNumber(triVariance, 'jStat.triangular.variance');

// Kumaraswamy (no sample)
const kumPdf: number = jStat.kumaraswamy.pdf(0.5, 2, 3);
assertNumber(kumPdf, 'jStat.kumaraswamy.pdf');
const kumCdf: number = jStat.kumaraswamy.cdf(0.5, 2, 3);
assertNumber(kumCdf, 'jStat.kumaraswamy.cdf');

// Pareto (no sample)
const paretoPdf: number = jStat.pareto.pdf(2, 1, 2);
assertNumber(paretoPdf, 'jStat.pareto.pdf');
const paretoCdf: number = jStat.pareto.cdf(2, 1, 2);
assertNumber(paretoCdf, 'jStat.pareto.cdf');


// Negative Binomial
const negbinPdf: number = jStat.negbin.pdf(3, 5, 0.5);
assertNumber(negbinPdf, 'jStat.negbin.pdf');
const negbinCdf: number = jStat.negbin.cdf(3, 5, 0.5);
assertNumber(negbinCdf, 'jStat.negbin.cdf');

// Hypergeometric
const hypPdf: number = jStat.hypgeom.pdf(3, 10, 5, 4);
assertNumber(hypPdf, 'jStat.hypgeom.pdf');
const hypCdf: number = jStat.hypgeom.cdf(3, 10, 5, 4);
assertNumber(hypCdf, 'jStat.hypgeom.cdf');

// Exponential
const expPdf: number = jStat.exponential.pdf(1, 2);
assertNumber(expPdf, 'jStat.exponential.pdf');
const expCdf: number = jStat.exponential.cdf(1, 2);
assertNumber(expCdf, 'jStat.exponential.cdf');

// Log-normal
const lognormalPdf: number = jStat.lognormal.pdf(1, 0, 1);
assertNumber(lognormalPdf, 'jStat.lognormal.pdf');
const lognormalCdf: number = jStat.lognormal.cdf(1, 0, 1);
assertNumber(lognormalCdf, 'jStat.lognormal.cdf');

// Student's t
const tPdf: number = jStat.studentt.pdf(1.96, 10);
assertNumber(tPdf, 'jStat.studentt.pdf');
const tCdf: number = jStat.studentt.cdf(1.96, 10);
assertNumber(tCdf, 'jStat.studentt.cdf');

// Weibull
const weibullPdf: number = jStat.weibull.pdf(1, 2, 3);
assertNumber(weibullPdf, 'jStat.weibull.pdf');
const weibullCdf: number = jStat.weibull.cdf(1, 2, 3);
assertNumber(weibullCdf, 'jStat.weibull.cdf');

// Uniform
const uniformPdf: number = jStat.uniform.pdf(0.5, 0, 1);
assertNumber(uniformPdf, 'jStat.uniform.pdf');
const uniformCdf: number = jStat.uniform.cdf(0.5, 0, 1);
assertNumber(uniformCdf, 'jStat.uniform.cdf');

// Arcsine
const arcsinePdf: number = jStat.arcsine.pdf(0.5, 0, 1);
assertNumber(arcsinePdf, 'jStat.arcsine.pdf');
const arcsineCdf: number = jStat.arcsine.cdf(0.5, 0, 1);
assertNumber(arcsineCdf, 'jStat.arcsine.cdf');

// Inverse Gamma (no median)
const invGammaPdf: number = jStat.invgamma.pdf(1, 2, 3);
assertNumber(invGammaPdf, 'jStat.invgamma.pdf');
const invGammaCdf: number = jStat.invgamma.cdf(1, 2, 3);
assertNumber(invGammaCdf, 'jStat.invgamma.cdf');

// -------------------------------------------------------------------------
// Distribution instance method tests
// -------------------------------------------------------------------------

_section('Distribution Instance Methods');

const betaIns: jStat.ContinuousDistribution = jStat.beta(2, 5);
const betaInsPdf: number = betaIns.pdf(0.5);
assertNumber(betaInsPdf, 'betaIns.pdf');
const betaInsCdf: number = betaIns.cdf(0.5);
assertNumber(betaInsCdf, 'betaIns.cdf');
const betaInsInv: number = betaIns.inv(0.5);
assertNumber(betaInsInv, 'betaIns.inv');
const betaInsMean: number = betaIns.mean();
assertNumber(betaInsMean, 'betaIns.mean');
const betaInsMedian: number = betaIns.median();
assertNumber(betaInsMedian, 'betaIns.median');
const betaInsMode: number = betaIns.mode();
assertNumber(betaInsMode, 'betaIns.mode');
const betaInsSample: number = betaIns.sample();
assertNumber(betaInsSample, 'betaIns.sample');
const betaInsVariance: number = betaIns.variance();
assertNumber(betaInsVariance, 'betaIns.variance');

// -------------------------------------------------------------------------
// JStat instance method tests
// -------------------------------------------------------------------------

_section('JStat Instance Methods');

// Core instance methods
const jstat: jStat.JStat = jStat([1, 2, 3, 4, 5]);
assertInstanceOf(jstat, jStat.jStat, 'jstat');

jstat.rows();
jstat.rows((v: number) => { });
jstat.cols();
jstat.cols((v: number) => { });
jstat.dimensions();
jstat.dimensions((v: jStat.DimensionsResult) => { });
jstat.row(0);
jstat.row(0, (v: jStat.JStat) => { });
jstat.col(0);
jstat.col(0, (v: jStat.JStat) => { });
jstat.diag();
jstat.diag((v: number[][]) => { });
jstat.antidiag();
jstat.transpose();
jstat.map((x: number) => x * 2);
jstat.cumreduce((a: number, b: number) => a + b);
jstat.alter((x: number) => x * 2);
assertInstanceOf(jstat.create(2, (r: number, c: number) => r + c), jStat.jStat, 'jstat.create(2, fn)');
assertInstanceOf(jstat.create(2, 3, (r: number, c: number) => r + c), jStat.jStat, 'jstat.create(2, 3, fn)');
assertInstanceOf(jstat.zeros(2), jStat.jStat, 'jstat.zeros(2)');
assertInstanceOf(jstat.ones(2), jStat.jStat, 'jstat.ones(2)');
assertInstanceOf(jstat.rand(3), jStat.jStat, 'jstat.rand(3)');
assertInstanceOf(jstat.identity(3), jStat.jStat, 'jstat.identity(3)');
jstat.clear();
jstat.symmetric();
jstat.symmetric((v: boolean) => { });

// Vector instance methods
jstat.sum();
jstat.sum((v: number) => { });
jstat.sum(true);
jstat.sum(true, (v: number) => { });
jstat.mean();
jstat.mean(true);
jstat.min();
jstat.min(true, (v: number) => { });
jstat.max();
jstat.max(true);
jstat.variance();
jstat.stdev();
jstat.stdev(true);
jstat.median();
jstat.mode();
jstat.mode(true, (v: number | number[] | false) => { });
jstat.deviation();
jstat.meandev();
jstat.meddev();
jstat.coeffvar();
jstat.quartiles();

// Linear algebra instance methods
const matObj: jStat.JStat = jStat([[1, 2, 3]]);
assertInstanceOf(matObj.add(2), jStat.jStat, 'matObj.add');
assertInstanceOf(matObj.subtract(1), jStat.jStat, 'matObj.subtract');
assertInstanceOf(matObj.divide(2), jStat.jStat, 'matObj.divide');
assertInstanceOf(matObj.multiply(2), jStat.jStat, 'matObj.multiply');
assertInstanceOf(matObj.pow(2), jStat.jStat, 'matObj.pow');
assertInstanceOf(matObj.exp(), jStat.jStat, 'matObj.exp');
assertInstanceOf(matObj.log(), jStat.jStat, 'matObj.log');
assertInstanceOf(matObj.abs(), jStat.jStat, 'matObj.abs');
assertNumber(matObj.dot([1, 2, 3]), 'matObj.dot');
assertNumber(matObj.norm(), 'matObj.norm');
assertNumber(matObj.angle([1, 0, 0]), 'matObj.angle');

// Special functions instance methods
jstat.gammafn();
jstat.gammaln();
jstat.factorial();
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
assertNumber(matrixObj.anovafscore(), 'matrixObj.anovafscore');

// -------------------------------------------------------------------------
// Matrix instance method tests
// -------------------------------------------------------------------------

_section('Matrix Instance Methods');

const matrixInst: jStat.JStat = jStat([[1, 2], [3, 4]]);
assertNumberArray(matrixInst.sum() as number[], 'matrixInst.sum');
assertNumber(matrixInst.sum(true), 'matrixInst.sum(pop)');
assertInstanceOf(matrixInst.sum((v: number) => { }), jStat.jStat, 'matrixInst.sum(fn)');

assertNumberArray(matrixInst.mean() as number[], 'matrixInst.mean');
assertNumber(matrixInst.mean(true), 'matrixInst.mean(pop)');
assertInstanceOf(matrixInst.mean(() => {}), jStat.jStat, 'matrixInst.mean(pop)');

assertNumberArray(matrixInst.min() as number[], 'matrixInst.min');
assertNumber(matrixInst.min(true), 'matrixInst.min(pop)');
assertInstanceOf(matrixInst.min(() => {}), jStat.jStat, 'matrixInst.min(pop)');

assertNumberArray(matrixInst.max() as number[], 'matrixInst.max');
assertNumber(matrixInst.max(true), 'matrixInst.max(pop)');
assertInstanceOf(matrixInst.max(() => {}), jStat.jStat, 'matrixInst.max(pop)');

assertNumberArray(matrixInst.variance() as number[], 'matrixInst.variance');
assertNumber(matrixInst.variance(true), 'matrixInst.variance(pop)');
assertInstanceOf(matrixInst.variance(() => {}), jStat.jStat, 'matrixInst.variance(pop)');

assertNumberArray(matrixInst.stdev() as number[], 'matrixInst.stdev');
assertNumber(matrixInst.stdev(true), 'matrixInst.stdev(pop)');
assertInstanceOf(matrixInst.stdev(() => {}), jStat.jStat, 'matrixInst.stdev(pop)');

assertMatrix(matrixInst.deviation() as number[][], 'matrixInst.deviation');
assertNumberArray(matrixInst.deviation(true) as number[], 'matrixInst.deviation(pop)');
assertInstanceOf(matrixInst.deviation(() => {}), jStat.jStat, 'matrixInst.deviation(pop)');

assertNumberArray(matrixInst.meandev() as number[], 'matrixInst.meandev');
assertNumber(matrixInst.meandev(true), 'matrixInst.meandev(pop)');
assertInstanceOf(matrixInst.meandev(() => {}), jStat.jStat, 'matrixInst.meandev(pop)');

// -------------------------------------------------------------------------
// Models tests
// -------------------------------------------------------------------------

_section('Models');

const endog = [1, -2, 3, 4, -5, 6, 7, -8, 9];
const exog: number[][] = [
    [1, 2, 3], [1, 1, 0], [1, -2, 3], [1, 3, 4], [1, -10, 2],
    [1, 4, 4], [1, 10, 2], [1, 3, 2], [1, 4, -1]
];
const model: jStat.OLSModel = jStat.models.ols(endog, exog);
assertInstanceOf(model, Object, 'OLSModel');
assertNumber(model.nobs, 'model.nobs');
assertNumberArray(model.coef, 'model.coef');
assertNumber(model.R2, 'model.R2');
assertNumber(model.adjust_R2, 'model.aR2');
assertNumberArray(model.t.se, 'model.t.stat');
assertNumberArray(model.t.p, 'model.t.p');
assertNumber(model.f.F_statistic, 'model.f.stat');
assertNumber(model.f.pvalue, 'model.f.pvalue');

// -------------------------------------------------------------------------
// Utils tests
// -------------------------------------------------------------------------

_section('Utils');

const isArr: boolean = jStat.utils.isArray([]);
assertBoolean(isArr, 'jStat.utils.isArray');
const isFn: boolean = jStat.utils.isFunction(() => { });
assertBoolean(isFn, 'jStat.utils.isFunction');
const isNum: boolean = jStat.utils.isNumber(42);
assertBoolean(isNum, 'jStat.utils.isNumber');

// -------------------------------------------------------------------------
// Chaining tests
// -------------------------------------------------------------------------

_section('Method Chaining');

// Method chaining with callbacks
const chainResult1 = jStat([1, 2, 3, 4, 5])
    .sum((val: number) => {
        const _sum: number = val;
    })
    .mean((val: number) => {
        const _mean: number = val;
    })
    .stdev((val: number) => {
        const _stdev: number = val;
    });
assertInstanceOf(chainResult1, jStat.jStat, 'chained result');

// Create and chain
const chainResult2 = jStat()
    .create(2, (r: number, c: number) => r + c)
    .min(true, (val: number) => { });
assertInstanceOf(chainResult2, jStat.jStat, 'create + chain result');

// Distribution from instance
const chainResult3 = jStat(0, 1, 11)
    .min((val: number) => { })
    .beta(2, 5)
    .pdf();
assertInstanceOf(chainResult3, jStat.jStat, 'instance -> beta -> pdf');
