import jStat from 'jstat';

// ==========================================================================
// Runtime value tests for core.d.ts
// ==========================================================================

let failures = 0;
let passed = 0;

/**
 * Checks if a value is array-like: either a real Array or an object with a `length` property.
 */
function isArray(value: unknown): value is unknown[] {
    if (Object.prototype.toString.call(value) === '[object Array]') return true;
    if (typeof value !== 'object' || value === null) return false;
    return typeof (value as any).length === 'number';
}

function assert(condition: boolean, msg: string): void {
    if (!condition) {
        console.error(`  FAIL: ${msg}`);
        failures++;
    } else {
        passed++;
    }
}

function assertNumber(value: unknown, name: string): void {
    assert(typeof value === 'number', `${name}: should be a number`);
    assert(!Number.isNaN(value), `${name}: should not be NaN`);
}

function assertArray(value: unknown, name: string): void {
    assert(isArray(value), `${name}: should be an array`);
}

function assertMatrix(value: unknown, name: string, rows?: number, cols?: number): void {
    assert(isArray(value), `${name}: should be a matrix (array of arrays)`);
    if (rows !== undefined) {
        assert((value as any[]).length === rows, `${name}: should have ${rows} rows, got ${(value as any[]).length}`);
    }
    if (cols !== undefined) {
        for (const row of value as any[]) {
            if (!isArray(row) || row.length !== cols)
                assert(false, `${name}: each row should have ${cols} columns`);
        }
    }
}

// ==========================================================================
// Constructor tests
// ==========================================================================
console.log('\n━━━ Constructor Tests ━━━');

// Array constructor
const c1 = jStat([1, 2, 3, 4, 5]);
assertArray(c1.toArray(), 'jStat([1,2,3,4,5]) → toArray');
assertNumber(c1.toArray()[0], 'jStat([1,2,3,4,5]) → toArray');
assert((c1.toArray() as number[]).length === 5, 'array ctor length');

// Matrix constructor
const c2 = jStat([[1, 2], [3, 4]]);
const c2Arr = c2.toArray();
assert(isArray(c2Arr), 'jStat([[1,2],[3,4]]) → toArray is array');

// Sequence constructor (min, stop, count)
const c3 = jStat(0, 1, 5);
assertArray(c3.toArray(), 'jStat(0,1,5) → toArray');
const c3arr = c3.toArray() as number[];
assert(c3arr.length === 5, 'jStat(0,1,5) length is 5');
// Expected: [0, 0.25, 0.5, 0.75, 1]
assert(Math.abs(c3arr[0] - 0) < 1e-10, 'jStat(0,1,5)[0] ≈ 0');
assert(Math.abs(c3arr[4] - 1) < 1e-10, 'jStat(0,1,5)[4] ≈ 1');

// Sequence with transform
const c4 = jStat(0, 1, 3, (v) => v * 2);
const c4arr = c4.toArray() as number[];
assert(c4arr.length === 3, 'seq with fn length');
assert(Math.abs(c4arr[0] - 0) < 1e-10, 'seq fn first element');
assert(Math.abs(c4arr[2] - 2) < 1e-10, 'seq fn last element (1*2)');

// Array with transform
const c5 = jStat([1, 2, 3], (x) => x * 2);
const c5arr = c5.toArray() as number[];
assert(c5arr[0] === 2, 'array + transform: 1*2');
assert(c5arr[1] === 4, 'array + transform: 2*2');
assert(c5arr[2] === 6, 'array + transform: 3*2');

// Empty constructor
const c6 = jStat();
assert(isArray(c6.toArray()), 'empty jStat → toArray is array');

// ==========================================================================
// Static: rows, cols, dimensions
// ==========================================================================
console.log('\n━━━ rows, cols, dimensions ━━━');

assertNumber(jStat.rows([[1, 2], [3, 4]]), 'rows([[1,2],[3,4]])');
assert(jStat.rows([[1, 2], [3, 4]]) === 2, 'rows should be 2');

assertNumber(jStat.cols([[1, 2], [3, 4]]), 'cols([[1,2],[3,4]])');
assert(jStat.cols([[1, 2], [3, 4]]) === 2, 'cols should be 2');

// Edge case: empty matrix → rows=1, cols=1
assert(jStat.rows([]) === 1, 'rows([]) should be 1 (edge case)');
assert(jStat.cols([[]]) === 1, 'cols([[]]) should be 1 (edge case)');

// dimensions returns { rows, cols }
const dims = jStat.dimensions([[1, 2, 3], [4, 5, 6]]);
assert(dims.rows === 2, 'dimensions rows');
assert(dims.cols === 3, 'dimensions cols');

// ==========================================================================
// Static: row, col
// ==========================================================================
console.log('\n━━━ row, col ━━━');

const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// Single row
const r0 = jStat.row(m, 0);
assertArray(r0, 'row(m,0) is array');
assert(r0[0] === 1 && r0[1] === 2 && r0[2] === 3, 'row 0 values');

// Multiple rows
const r01 = jStat.row(m, [0, 2]);
assertMatrix(r01, 'row(m,[0,2])', 2, 3);
assert((r01 as number[][])[0][0] === 1, 'multi row[0][0]');
assert((r01 as number[][])[1][2] === 9, 'multi row[1][2]');

// Single column (wrapped in single-element arrays)
const c0 = jStat.col(m, 0);
assertMatrix(c0, 'col(m,0)');
assert((c0 as number[][])[0][0] === 1, 'col[0][0]');
assert((c0 as number[][])[1][0] === 4, 'col[1][0]');
assert((c0 as number[][])[2][0] === 7, 'col[2][0]');

// Multiple columns
const c02 = jStat.col(m, [0, 2]);
assertMatrix(c02, 'col(m,[0,2])', 3, 2);

// ==========================================================================
// Static: diag, antidiag
// ==========================================================================
console.log('\n━━━ diag, antidiag ━━━');

const diagResult = jStat.diag(m);
assertMatrix(diagResult, 'diag(m)');
assert((diagResult as number[][])[0][0] === 1, 'diag[0][0]');
assert((diagResult as number[][])[1][0] === 5, 'diag[1][0]');
assert((diagResult as number[][])[2][0] === 9, 'diag[2][0]');

const antiResult = jStat.antidiag(m);
assertMatrix(antiResult, 'antidiag(m)');
assert((antiResult as number[][])[0][0] === 3, 'antidiag[0][0] (top-right)');
assert((antiResult as number[][])[1][0] === 5, 'antidiag[1][0]');
assert((antiResult as number[][])[2][0] === 7, 'antidiag[2][0] (bottom-left)');

// ==========================================================================
// Static: transpose
// ==========================================================================
console.log('\n━━━ transpose ━━━');

// Matrix transpose
const mt = jStat.transpose([[1, 2], [3, 4], [5, 6]]);
assertMatrix(mt, 'transpose 3x2 → 2x3', 2, 3);
assert((mt as number[][])[0][0] === 1, 'mt[0][0]');
assert((mt as number[][])[0][1] === 3, 'mt[0][1]');
assert((mt as number[][])[0][2] === 5, 'mt[0][2]');
assert((mt as number[][])[1][0] === 2, 'mt[1][0]');

// Vector → column vector
const vt = jStat.transpose([1, 2, 3]);
assertMatrix(vt, 'transpose([1,2,3]) → column vector');
assert((vt as number[][]).length === 3, 'vector transpose length 3');
assert(((vt as number[][])[0] as number[])[0] === 1, 'col vec[0]');
assert(((vt as number[][])[2] as number[])[0] === 3, 'col vec[2]');

// ==========================================================================
// Static: diagonal (from 1D to square matrix)
// ==========================================================================
console.log('\n━━━ diagonal ━━━');

const diagMat = jStat.diagonal([1, 2, 3]);
assertMatrix(diagMat, 'diagonal([1,2,3])', 3, 3);
assert((diagMat as number[][])[0][0] === 1, 'diag mat[0][0]');
assert((diagMat as number[][])[1][1] === 2, 'diag mat[1][1]');
assert((diagMat as number[][])[2][2] === 3, 'diag mat[2][2]');
assert((diagMat as number[][])[0][1] === 0, 'diag mat[0][1] off-diag');

// ==========================================================================
// Static: identity
// ==========================================================================
console.log('\n━━━ identity ━━━');

const id3 = jStat.identity(3);
assertMatrix(id3, 'identity(3)', 3, 3);
assert((id3 as number[][])[0][0] === 1, 'id[0][0]');
assert((id3 as number[][])[1][1] === 1, 'id[1][1]');
assert((id3 as number[][])[2][2] === 1, 'id[2][2]');
assert((id3 as number[][])[0][1] === 0, 'id[0][1] off-diag');

// Rectangular identity
const id2x4 = jStat.identity(2, 4);
assertMatrix(id2x4, 'identity(2,4)', 2, 4);
assert((id2x4 as number[][])[0][0] === 1, '2x4 id[0][0]');
assert((id2x4 as number[][])[1][1] === 1, '2x4 id[1][1]');

// ==========================================================================
// Static: zeros, ones
// ==========================================================================
console.log('\n━━━ zeros, ones ━━━');

const z3 = jStat.zeros(3);
assertMatrix(z3, 'zeros(3)', 3, 3);
assert((z3 as number[][])[2][2] === 0, 'zeros all 0');

const zr = jStat.zeros(2, 4);
assertMatrix(zr, 'zeros(2,4)', 2, 4);

const o3 = jStat.ones(2);
assertMatrix(o3, 'ones(2)', 2, 2);
assert((o3 as number[][])[0][0] === 1, 'ones all 1');

const or = jStat.ones(3, 2);
assertMatrix(or, 'ones(3,2)', 3, 2);

// ==========================================================================
// Static: rand (value range check)
// ==========================================================================
console.log('\n━━━ rand ━━━');

const randomMatrix = jStat.rand(3, 2);
assertMatrix(randomMatrix, 'rand(3,2)', 3, 2);
const rArr = randomMatrix as number[][];
for (const row of rArr) {
    for (const v of row) {
        assert(v >= 0 && v < 1, `rand value in [0,1): ${v}`);
    }
}

// ==========================================================================
// Static: seq
// ==========================================================================
console.log('\n━━━ seq ━━━');

const seq1 = jStat.seq(0, 1, 5);
assert(isArray(seq1), 'seq is array');
assert((seq1 as number[]).length === 5, 'seq length');
assert(Math.abs((seq1 as number[])[0] - 0) < 1e-10, 'seq start');
assert(Math.abs((seq1 as number[])[4] - 1) < 1e-10, 'seq end');

const seq2 = jStat.seq(10, 20, 5);
const seq2arr = seq2 as number[];
assert(seq2arr.length === 5, 'seq(10,20,5) length');
assert(Math.abs(seq2arr[0] - 10) < 1e-10, 'seq(10,20,5) start');
assert(Math.abs(seq2arr[4] - 20) < 1e-10, 'seq(10,20,5) end');
assert(Math.abs(seq2arr[2] - 15) < 1e-10, 'seq(10,20,5) middle');

// seq with transform
const seq3 = jStat.seq(0, 4, 5, (v, i) => v * 2);
const seq3arr = seq3 as number[];
assert(Math.abs(seq3arr[0] - 0) < 1e-10, 'seq with fn');
assert(Math.abs(seq3arr[4] - 8) < 1e-10, 'seq with fn last');

// ==========================================================================
// Static: arange
// ==========================================================================
console.log('\n━━━ arange ━━━');

const ar1 = jStat.arange(5);
assert(isArray(ar1), 'arange(5) is array');
assert((ar1 as number[]).length === 5, 'arange(5) length');
assert((ar1 as number[])[0] === 0 && (ar1 as number[])[4] === 4, 'arange(5) values');

const ar2 = jStat.arange(1, 5);
const ar2arr = ar2 as number[];
assert(ar2arr[0] === 1 && ar2arr[3] === 4, 'arange(1,5) values');

const ar3 = jStat.arange(1, 5, 0.5);
const ar3arr = ar3 as number[];
assert(ar3arr.length === 8, 'arange(1,5,0.5) length');
assert(ar3arr[0] === 1 && ar3arr[7] === 4.5, 'arange(1,5,0.5) boundaries');

// Empty edge cases
const arEmpty = jStat.arange(5, 1, 1); // start > end with positive step → []
assert(isArray(arEmpty) && (arEmpty as number[]).length === 0, 'arange(5,1,1) empty');

// ==========================================================================
// Static: copy
// ==========================================================================
console.log('\n━━━ copy ━━━');

const original: number[][] = [[1, 2], [3, 4]];
const copied = jStat.copy(original);
assertMatrix(copied, 'copy(m)', 2, 2);
assert((copied as number[][])[0][0] === original[0][0], 'copy values match');
assert((copied as number[][])[0] !== original[0], 'copy: row[0] is different reference');

const vec = [1, 2, 3];
const vecCopy = jStat.copy(vec);
assert(isArray(vecCopy), 'copy([1,2,3]) is array');
assert((vecCopy as number[])[1] === 2, 'copy vec value');

// ==========================================================================
// Static: map, cumreduce
// ==========================================================================
console.log('\n━━━ map, cumreduce ━━━');

const mapped = jStat.map([1, 2, 3], (x) => x * 2);
assertArray(mapped, 'map result is array');
const mappedArr = mapped as number[];
assert(mappedArr[0] === 2 && mappedArr[1] === 4 && mappedArr[2] === 6, 'map [1,2,3] *2');

// map on matrix
const mMapped = jStat.map([[1, 2], [3, 4]], (x, r, c) => x + r + c);
assertMatrix(mMapped, 'map matrix', 2, 2);
assert((mMapped as number[][])[0][0] === 1, 'map matrix[0][0] = 1+0+0');
assert((mMapped as number[][])[1][1] === 6, 'map matrix[1][1] = 4+1+1');

// cumreduce on vector
const cumSum = jStat.cumreduce([1, 2, 3, 4], (acc, curr) => acc + curr);
assertArray(cumSum, 'cumreduce result');
const cumArr = cumSum as number[];
assert(cumArr[0] === 1 && cumArr[1] === 3 && cumArr[2] === 6 && cumArr[3] === 10, 'cumreduce cumsum');

// ==========================================================================
// Static: alter
// ==========================================================================
console.log('\n━━━ alter ━━━');

const alterVec = [1, 2, 3];
const alterResult = jStat.alter(alterVec, (x) => x * 10);
assert(alterResult === alterVec, 'alter mutates in-place (same reference)');
assert((alterResult as number[])[0] === 10 && (alterResult as number[])[2] === 30, 'alter values');

const alterMat = [[1, 2], [3, 4]];
const alterMatResult = jStat.alter(alterMat, (x) => x + 100);
assert(alterMatResult === alterMat, 'alter matrix in-place');
assert((alterMatResult as number[][])[0][0] === 101, 'alter mat value');

// ==========================================================================
// Static: create
// ==========================================================================
console.log('\n━━━ create ━━━');

const cSq = jStat.create(3, (r, c) => r * 3 + c + 1);
assertMatrix(cSq, 'create(3, fn)', 3, 3);
assert((cSq as number[][])[0][0] === 1 && (cSq as number[][])[2][2] === 9, 'create values');

const cRect = jStat.create(2, 4, (r, c) => r + c * 10);
assertMatrix(cRect, 'create(2,4,fn)', 2, 4);
assert((cRect as number[][])[1][3] === 31, 'create(2,4) fn[1][3]');

// ==========================================================================
// Static: symmetric
// ==========================================================================
console.log('\n━━━ symmetric ━━━');

assert(jStat.symmetric([[1, 2], [2, 1]]) === true, 'symmetric [[1,2],[2,1]]');
assert(jStat.symmetric([[1, 2], [3, 4]]) === false, 'symmetric [[1,2],[3,4]]');
assert(jStat.symmetric([[1, 2, 3], [2, 5, 6], [3, 6, 9]]) === true, 'symmetric 3x3');
assert(jStat.symmetric([[1, 2], [3, 4], [5, 6]]) === false, 'symmetric non-square');

// ==========================================================================
// Static: slice
// ==========================================================================
console.log('\n━━━ slice ━━━');

const sm = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// Single cell: { row: N, col: N }
const cell = jStat.slice(sm, { row: 0, col: 2 });
assertNumber(cell, 'slice single cell');
assert(cell === 3, 'slice({row:0,col:2}) === 3');

// Row slice: { row: N, col?: ... }
const rowSlice = jStat.slice(sm, { row: 1, col: { start: 1 } });
assertArray(rowSlice, 'slice row with col range');
const rowSliceArr = rowSlice as number[];
assert(rowSliceArr[0] === 5 && rowSliceArr[1] === 6, 'slice row[1] col[1:]');

// Column slice: { col: N }
const colSlice = jStat.slice(sm, { col: 1 });
assertMatrix(colSlice, 'slice {col:1}');
assert(colSlice[0] === 2 && colSlice[2] === 8, 'slice col[1]');

// Sub-matrix: { row: {end:2}, col: {start:1} }
const subMat = jStat.slice(sm, { row: { end: 2 }, col: { start: 1 } });
assertMatrix(subMat, 'slice sub-matrix', 2, 2);
assert((subMat as number[][])[0][0] === 2 && (subMat as number[][])[1][1] === 6, 'sub-matrix values');

// No args → deep copy
const copied2 = jStat.slice(sm);
assertMatrix(copied2, 'slice() → deep copy', 3, 3);
assert((copied2 as number[][])[0][0] === 1, 'copy value');

// ==========================================================================
// Static: sliceAssign
// ==========================================================================
console.log('\n━━━ sliceAssign ━━━');

const sa1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const assignCell = jStat.sliceAssign(sa1, { row: 0, col: 0 }, 99);
assert(assignCell === 99, 'sliceAssign cell returns assigned value');
assert(sa1[0][0] === 99, 'sliceAssign cell mutated');

const sa2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const assignRow = jStat.sliceAssign(sa2, { row: 1, col: { start: 1 } }, [10, 20]);
assertMatrix(assignRow, 'sliceAssign row');
assert(sa2[1][1] === 10 && sa2[1][2] === 20, 'sliceAssign row mutated');

const sa3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const assignSub = jStat.sliceAssign(sa3, { row: { start: 1 }, col: { start: 1 } }, [[10, 20], [30, 40]]);
assertMatrix(assignSub, 'sliceAssign sub-matrix', 3, 3);
assert(sa3[1][1] === 10 && sa3[2][2] === 40, 'sliceAssign sub-matrix mutated');

// ==========================================================================
// Static: clear
// ==========================================================================
console.log('\n━━━ clear ━━━');

const clearMat = [[1, 2], [3, 4]];
const clearResult = jStat.clear(clearMat);
assert(clearResult === clearMat, 'clear returns same reference');
assert(clearMat[0][0] === 0 && clearMat[1][1] === 0, 'clear zeros all entries');

// ==========================================================================
// Instance methods
// ==========================================================================
console.log('\n━━━ Instance Methods ━━━');

const inst = jStat([[1, 2], [3, 4]]);

// Instance rows(), cols()
assertNumber(inst.rows(), 'instance.rows()');
assert(inst.rows() === 2, 'instance.rows() === 2');
assert(inst.cols() === 2, 'instance.cols() === 2');

// Instance dimensions
const instDims = inst.dimensions();
assert(instDims.rows === 2 && instDims.cols === 2, 'instance dimensions');

// Instance transpose
const instT = inst.transpose();
assertMatrix(instT, 'instance transpose');
assert((instT as number[][])[0][0] === 1 && (instT as number[][])[1][0] === 2, 'instance transpose');

// Instance diag
const instDiag = inst.diag();
assertMatrix(instDiag, 'instance diag');
assert((instDiag as number[][])[0][0] === 1 && (instDiag as number[][])[1][0] === 4, 'instance diag');

// Instance zeros, ones, rand, identity
const iz = inst.zeros(2, 3);
assertMatrix(iz, 'instance.zeros(2,3)', 2, 3);
const io = inst.ones(2);
assertMatrix(io, 'instance.ones(2)', 2, 2);
const ir = inst.rand(2, 2);
assertMatrix(ir, 'instance.rand(2,2)', 2, 2);
const ii = inst.identity(3);
assertMatrix(ii, 'instance.identity(3)', 3, 3);

// Instance clear
const ic = jStat([[1, 2]]);
const icResult = ic.clear();
assert(icResult[0] === ic[0], 'instance clear same ref');
assert(ic[0][0] === 0, 'instance clear value');

// Instance symmetric
assert(jStat([[1,2,3], [2,4,5], [3,5,6]]).symmetric() === true, 'instance symmetric 2x2');

// Instance map
const mappedInst = jStat([1, 2, 3]).map((x) => x * 3);
assert(mappedInst.toArray()[0] === 3, 'instance map');
assert(mappedInst.toArray()[2] === 9, 'instance map');

// Instance cumreduce
const crInst = jStat([1, 2, 3]).cumreduce((a, b) => a + b);
const crArr = crInst.toArray() as number[];
assert(crArr[0] === 1 && crArr[2] === 6, 'instance cumreduce');

// Instance alter
const alInst = jStat([1, 2, 3]);
const alResult = alInst.alter((x) => x + 5);
assert(alResult === alInst, 'instance alter same ref');
assert(alInst.toArray()[0] === 6, 'instance alter');

// Instance create
const instCreate = inst.create(2, 2, (r, c) => r + c);
assert(instCreate.toArray().length === 2, 'instance create');

// Instance row/col
const instRow = jStat([[1, 2], [3, 4]]).row(0);
const instRowArr = instRow.toArray() as number[];
assert(instRowArr[0] === 1 && instRowArr[1] === 2, 'instance row');

const instCol = jStat([[1, 2], [3, 4]]).col(0);
const instColArr = instCol.toArray() as number[][];
assert(instColArr[0][0] === 1 && instColArr[1][0] === 3, 'instance col');

// Instance antidiag
const instAnti = jStat([[1, 2], [3, 4]]).antidiag();
assertMatrix(instAnti, 'instance antidiag');
assert((instAnti as number[][])[0][0] === 2, 'instance antidiag[0][0]');

// Instance toArray
const arr = jStat([10, 20, 30]).toArray();
assert(isArray(arr) && (arr as number[]).length === 3, 'instance toArray');
assert((arr as number[])[0] === 10 && (arr as number[])[2] === 30, 'toArray values');

// ==========================================================================
// Summary
// ==========================================================================
console.log(`\n━━━ Core Results: ${passed} passed, ${failures} failed ━━━`);
if (failures > 0) {
    throw new Error(`Core tests failed: ${failures} failures`);
}
