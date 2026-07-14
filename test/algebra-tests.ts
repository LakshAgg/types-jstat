import jStat from 'jstat';
import {
    _section,
    assertNumber,
    assertMatrix,
    assertArray,
    assertNumberArray,
    assertInstanceOf,
    assert,
} from './helpers';

// ==========================================================================
// Linear Algebra static method tests — types/algebra.d.ts
// ==========================================================================

_section('Linear Algebra');

const a: number[] = [1, 2, 3];
const b: number[] = [4, 5, 6];
const m1: number[][] = [[1, 2], [3, 4]];
const m2: number[][] = [[5, 6], [7, 8]];

// Vector + scalar
assertNumberArray(jStat.add([1, 2], 1), 'jStat.add(vec, scalar)');
assertNumberArray(jStat.subtract([1, 2], 1), 'jStat.subtract(vec, scalar)');
assertNumberArray(jStat.divide([4, 6], 2), 'jStat.divide(vec, scalar)');
assertNumberArray(jStat.multiply([1, 2], 3), 'jStat.multiply(vec, scalar)');

// Vector + vector
assertNumberArray(jStat.add([1, 2], [3, 4]), 'jStat.add(vec, vec)');
assertNumberArray(jStat.subtract([5, 6], [1, 2]), 'jStat.subtract(vec, vec)');

// Matrix + scalar
assertNumberArray(jStat.add([[1, 2]], 1), 'jStat.add(mat, scalar)');
assertNumberArray(jStat.subtract([[1, 2]], 1), 'jStat.subtract(mat, scalar)');
assertNumberArray(jStat.divide([[2, 4]], 2), 'jStat.divide(mat, scalar)');
assertNumberArray(jStat.multiply([[1, 2]], 2), 'jStat.multiply(mat, scalar)');

// Matrix + matrix
assertNumberArray(jStat.add([[1]], [[2]]), 'jStat.add(mat, mat)');
assertNumberArray(jStat.subtract([[3]], [[1]]), 'jStat.subtract(mat, mat)');
assertNumber(jStat.divide([[1]], [[1]]) as number, 'jStat.divide(mat, mat)');

// Vector + vector (divide)
assertMatrix(jStat.divide([4, 6], [2, 3]) as number[][], 'jStat.divide(vec, vec)');

// multiply vec × col → scalar
assertNumber(jStat.multiply([[1, 2]], [[3], [4]]), 'jStat.multiply(vec, vec) → scalar');
assertMatrix(jStat.multiply([[1], [2], [3]], [[3, 4, 3]]), 'jStat.multiply(vec, vec) → scalar');

// pow / exp / log / abs
assertArray(jStat.pow([1, 4, 9], 0.5), 'jStat.pow(vec, 0.5)');
assertArray(jStat.pow([[1, 4], [9, 16]], 2), 'jStat.pow(mat, 2)');
assertArray(jStat.exp([0, 1]), 'jStat.exp(vec)');
assertArray(jStat.log([1, Math.E]), 'jStat.log(vec)');
assertArray(jStat.log([[1]]), 'jStat.log(mat)');
assertArray(jStat.abs([-1, -2, 3]), 'jStat.abs(vec)');
assertArray(jStat.abs([[-1, 2], [-3, 4]]), 'jStat.abs(mat)');

// dot / outer
assertNumber(jStat.dot([1, 2, 3], [4, 5, 6]), 'jStat.dot');
assertMatrix(jStat.outer([1, 2], [3, 4]), 'jStat.outer');

// norm / angle
assertNumber(jStat.norm([3, 4]), 'jStat.norm([3,4])');
assertNumber(jStat.norm([1, 2, 2], 1), 'jStat.norm(p=1)');
assertNumber(jStat.norm([[1, 2]]), 'jStat.norm(row vec)');
assertNumber(jStat.norm([[1, 2], [3, 4]]), 'jStat.norm(2D matrix)');

assertNumber(jStat.angle([1, 0], [0, 1]), 'jStat.angle([1,0],[0,1])');

// aug
assertMatrix(jStat.aug([[1, 2], [3, 4]], [[5], [6]]), 'jStat.aug');

// det / inv
assertNumber(jStat.det([[1, 2], [3, 4]]), 'jStat.det');
assertMatrix(jStat.inv([[1, 2], [3, 4]]), 'jStat.inv');

// gauss_elimination
assertArray(jStat.gauss_elimination([[2, 1], [1, 3]], [[5, 7]]), 'jStat.gauss_elimination');

// gauss_jordan
assertMatrix(jStat.gauss_jordan([[2, 1], [1, 3]], [[5], [7]]), 'jStat.gauss_jordan');

// gauss_jacobi / gauss_seidel
assertArray(jStat.gauss_jacobi([[4, 1], [1, 3]], [[5], [7]], [[0], [0]], 1e-6), 'jStat.gauss_jacobi');
assertArray(jStat.gauss_seidel([[4, 1], [1, 3]], [[5], [7]], [[0], [0]], 1e-6), 'jStat.gauss_seidel');

// SOR
assertArray(jStat.SOR([[2, 1], [1, 2]], [[1], [1]], [[0], [0]], 1e-6, 1.5), 'jStat.SOR');

// lstsq
assertArray(jStat.lstsq([[1, 2], [3, 4], [5, 6]], [1, 2, 3]), 'jStat.lstsq(vec)');
assertMatrix(jStat.lstsq([[1, 2], [3, 4], [5, 6]], [[1], [2], [3]]), 'jStat.lstsq(mat)');

// lu
const [luL, luU]: [number[][], number[][]] = jStat.lu([[2, 1], [1, 3]]);
assertArray(luL, 'jStat.lu.L');
assertArray(luU, 'jStat.lu.U');

// cholesky
assertMatrix(jStat.cholesky([[4, 0], [0, 9]]), 'jStat.cholesky');

// householder
assertMatrix(jStat.householder([[1, 2], [3, 4]]), 'jStat.householder');

// QR
const [qrQ, qrR]: [number[][], number[][]] = jStat.QR([[1, 2], [3, 4]]);
assertArray(qrQ, 'jStat.QR.Q');
assertArray(qrR, 'jStat.QR.R');

// jacobi
const [eigVec, eigVal]: [number[][], number[]] = jStat.jacobi([[2, 1], [1, 2]]);
assertMatrix(eigVec, 'jStat.jacobi.eigenvectors');
assertArray(eigVal, 'jStat.jacobi.eigenvalues');

// rungekutta
assertNumber(
    jStat.rungekutta((t: number, y: number) => y * 0.5, 0.1, 1, 0, 1, 4),
    'jStat.rungekutta(4th order)'
);
assertNumber(
    jStat.rungekutta((t: number, y: number) => -y, 0.01, 1, 0, 1, 2),
    'jStat.rungekutta(2nd order)'
);

// romberg
const rom: [number] = jStat.romberg((x: number) => x * x, 0, 1, 4);
assertArray(rom, 'jStat.romberg');
assertNumber(rom[0], 'jStat.romberg[0]');

// richardson
const rich: [number] = jStat.richardson(
    [0.0, 0.5, 1.0, 1.5, 2.0],
    [0.0, 0.25, 1.0, 2.25, 4.0],
    1.0,
    0.5
);
assertArray(rich, 'jStat.richardson');
assertNumber(rich[0], 'jStat.richardson[0]');

// simpson
assertNumber(jStat.simpson((x: number) => Math.sin(x), 0, Math.PI, 100), 'jStat.simpson');

// hermite
assertNumber(jStat.hermite([0, 1, 2], [0, 1, 8], [0, 3, 12], 1.5), 'jStat.hermite');

// lagrange
assertNumber(jStat.lagrange([0, 1, 2], [0, 1, 8], 1.5), 'jStat.lagrange');

// PCA
const pca: [number[][], number[], number[][], number[][]] = jStat.PCA([
    [1, 2],
    [3, 4],
    [5, 6],
]);
assertArray(pca[0], 'jStat.PCA[0] (centered X)');
assertArray(pca[1], 'jStat.PCA[1] (eigenvalues)');
assertMatrix(pca[2], 'jStat.PCA[2] (eigenvectors)');
assertMatrix(pca[3], 'jStat.PCA[3] (projected)');

// ==========================================================================
// Linear Algebra instance method tests
// ==========================================================================

_section('Linear Algebra Instance Methods');

const inst = jStat([
    [1, 2],
    [3, 4],
]);
const instVec = jStat([1, 2, 3]);

// add
assertInstanceOf(inst.add(2), jStat.jStat, 'inst.add(scalar)');
assert(inst.add(2, () => {}) === inst, 'inst.add(scalar, cb) returns this');

// subtract
assertInstanceOf(inst.subtract(1), jStat.jStat, 'inst.subtract(scalar)');
assert(inst.subtract(1, () => {}) === inst, 'inst.subtract(scalar, cb) returns this');

// divide
assertInstanceOf(inst.divide(2), jStat.jStat, 'inst.divide(scalar)');
assert(inst.divide(2, () => {}) === inst, 'inst.divide(scalar, cb) returns this');

// multiply
assertInstanceOf(inst.multiply(3), jStat.jStat, 'inst.multiply(scalar)');
assert(inst.multiply(3, () => {}) === inst, 'inst.multiply(scalar, cb) returns this');

// dot
assertInstanceOf(inst.dot([[1, 2], [2,1]]) as jStat.JStat, jStat.jStat, 'inst.dot(vec)');
assertNumber(instVec.dot([1, 2, 3]) as number, 'instVec.dot(vec)');

// pow
assertInstanceOf(inst.pow(2), jStat.jStat, 'inst.pow(scalar)');
assert(inst.pow(2, () => {}) === inst, 'inst.pow(scalar, cb) returns this');

// exp
assertInstanceOf(inst.exp(), jStat.jStat, 'inst.exp()');
assert(inst.exp(1, () => {}) === inst, 'inst.exp(1, cb) returns this');

// log
assertInstanceOf(inst.log(), jStat.jStat, 'inst.log()');
assert(inst.log(1, () => {}) === inst, 'inst.log(1, cb) returns this');

// abs
assertInstanceOf(inst.abs(), jStat.jStat, 'inst.abs()');
assert(inst.abs(1, () => {}) === inst, 'inst.abs(1, cb) returns this');

// norm
assertNumber(inst.norm(), 'inst.norm()');
assertNumber(instVec.norm(), 'instVec.norm()');

// angle
assertNumber(instVec.angle([4, 5, 6]), 'instVec.angle(vec)');