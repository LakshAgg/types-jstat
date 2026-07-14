import jStat from "jstat";
import { _section, assertNumber, assertNumberArray, assertMatrix, assertBoolean, assertArray, assertInstanceOf, assertObject } from "./helpers";

// ==========================================================================
// Constructor tests
// ==========================================================================

_section("Core Constructor Tests");

const c1: jStat.JStat = jStat([1, 2, 3, 4, 5]);
assertInstanceOf(c1, jStat.jStat, "jStat([1,2,3,4,5])");

const c2: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
]);
assertInstanceOf(c2, jStat.jStat, "jStat([[1,2],[3,4]])");

const c3: jStat.JStat = jStat(0, 1, 5);
assertInstanceOf(c3, jStat.jStat, "jStat(0,1,5)");

const c4: jStat.JStat = jStat(0, 1, 3, (v: number, i: number) => v * 2);
assertInstanceOf(c4, jStat.jStat, "jStat(0,1,3,fn)");

const c5: jStat.JStat = jStat([1, 2, 3], (x: number) => x * 2);
assertInstanceOf(c5, jStat.jStat, "jStat([1,2,3], fn)");

const c6: jStat.JStat = jStat();
assertInstanceOf(c6, jStat.jStat, "jStat()");

// toArray
assertArray(c1.toArray(), "c1.toArray()");
const arr3: number[] = c3.toArray() as number[];
assertNumberArray(arr3, "jStat(0,1,5).toArray()");

// ==========================================================================
// Static: rows, cols, dimensions
// ==========================================================================

_section("rows, cols, dimensions");

const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

const rowCount: number = jStat.rows(matrix);
assertNumber(rowCount, "jStat.rows(matrix)");

const colCount: number = jStat.cols(matrix);
assertNumber(colCount, "jStat.cols(matrix)");

const dims: jStat.DimensionsResult = jStat.dimensions(matrix);
assertObject(dims, "jStat.dimensions(matrix)");
assertNumber(dims.rows, "dims.rows");
assertNumber(dims.cols, "dims.cols");

// Edge cases
assertNumber(jStat.rows([]), "jStat.rows([])");
assertNumber(jStat.cols([[]]), "jStat.cols([[]])");

// ==========================================================================
// Static: row, col
// ==========================================================================

_section("row, col");

const m: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const r0: number[] = jStat.row(m, 0);
assertNumberArray(r0, "jStat.row(m, 0)");

const r02: number[][] = jStat.row(m, [0, 2]);
assertMatrix(r02, "jStat.row(m, [0,2])");

const c0: number[][] = jStat.col(m, 0);
assertMatrix(c0, "jStat.col(m, 0)");

const c02: number[][] = jStat.col(m, [0, 2]);
assertMatrix(c02, "jStat.col(m, [0,2])");

// ==========================================================================
// Static: diag, antidiag, diagonal
// ==========================================================================

_section("diag, antidiag, diagonal");

const diagResult: number[][] = jStat.diag(m);
assertMatrix(diagResult, "jStat.diag(m)");

const antiResult: number[][] = jStat.antidiag(m);
assertMatrix(antiResult, "jStat.antidiag(m)");

const diagMat: number[][] = jStat.diagonal([1, 2, 3]);
assertMatrix(diagMat, "jStat.diagonal([1,2,3])");

// ==========================================================================
// Static: transpose
// ==========================================================================

_section("transpose");

const mt: number[][] = jStat.transpose([
  [1, 2],
  [3, 4],
  [5, 6],
]);
assertMatrix(mt, "jStat.transpose 3x2→2x3");

const vt = jStat.transpose([1, 2, 3]);
assertMatrix(vt, "jStat.transpose([1,2,3]) → flat");

const vtRow = jStat.transpose([[1], [2], [3]]);
assertNumberArray(vtRow, "jStat.transpose([1,2,3]) → flat");

// Note: source also supports transpose(vector)→number[][]
const vtCol: number[][] = jStat.transpose([1, 2, 3]);
assertMatrix(vtCol, "jStat.transpose([1,2,3]) → column");

// ==========================================================================
// Static: identity, zeros, ones, rand
// ==========================================================================

_section("identity, zeros, ones, rand");

const id3: number[][] = jStat.identity(3);
assertMatrix(id3, "jStat.identity(3)");

const id2x4: number[][] = jStat.identity(2, 4);
assertMatrix(id2x4, "jStat.identity(2,4)");

const z3: number[][] = jStat.zeros(3);
assertMatrix(z3, "jStat.zeros(3)");

const zr: number[][] = jStat.zeros(2, 4);
assertMatrix(zr, "jStat.zeros(2,4)");

const o3: number[][] = jStat.ones(2);
assertMatrix(o3, "jStat.ones(2)");

const or: number[][] = jStat.ones(3, 2);
assertMatrix(or, "jStat.ones(3,2)");

const rm0: number[][] = jStat.rand(3);
assertMatrix(rm0, "jStat.rand(3)");

const rm: number[][] = jStat.rand(3, 2);
assertMatrix(rm, "jStat.rand(3,2)");

// ==========================================================================
// Static: seq, arange
// ==========================================================================

_section("seq, arange");

const seq1: number[] = jStat.seq(0, 1, 5);
assertNumberArray(seq1, "jStat.seq(0,1,5)");

const seq2: number[] = jStat.seq(10, 20, 5);
assertNumberArray(seq2, "jStat.seq(10,20,5)");

const seqFn: number[] = jStat.seq(0, 4, 5, (v: number, i: number) => v * 2);
assertNumberArray(seqFn, "jStat.seq with fn");

const ar1: number[] = jStat.arange(5);
assertNumberArray(ar1, "jStat.arange(5)");

const ar2: number[] = jStat.arange(1, 5);
assertNumberArray(ar2, "jStat.arange(1,5)");

const ar3: number[] = jStat.arange(1, 5, 0.5);
assertNumberArray(ar3, "jStat.arange(1,5,0.5)");

const arEmpty: number[] = jStat.arange(5, 1, 1);
assertNumberArray(arEmpty, "jStat.arange(5,1,1) empty");

// ==========================================================================
// Static: copy, map, cumreduce, alter, create
// ==========================================================================

_section("copy, map, cumreduce, alter, create");

const orig: number[][] = [
  [1, 2],
  [3, 4],
];
const copied: number[][] = jStat.copy(orig);
assertMatrix(copied, "jStat.copy(matrix)");

const vecCopy: number[] = jStat.copy([1, 2, 3]);
assertNumberArray(vecCopy, "jStat.copy([1,2,3])");

const mapped: number[] | number[][] = jStat.map([1, 2, 3], (x: number) => x * 2);
assertArray(mapped, "jStat.map([1,2,3], fn)");

const mMapped: number[][] | number[] = jStat.map(
  [
    [1, 2],
    [3, 4],
  ],
  (x: number, r: number, c: number) => x + r + c,
);
assertMatrix(mMapped as number[][], "jStat.map(matrix, fn)");

const cumSum: number[] | number[][] = jStat.cumreduce([1, 2, 3, 4], (a: number, b: number) => a + b);
assertArray(cumSum, "jStat.cumreduce([1,2,3,4], fn)");

const alterVec: number[] = jStat.alter([1, 2, 3], (x: number) => x * 10);
assertNumberArray(alterVec, "jStat.alter([1,2,3], fn)");

const alterMat: number[][] = jStat.alter(
  [
    [1, 2],
    [3, 4],
  ],
  (x: number) => x + 100,
);
assertMatrix(alterMat, "jStat.alter(matrix, fn)");

const cSq: number[][] = jStat.create(3, (r: number, c: number) => r * 3 + c + 1);
assertMatrix(cSq, "jStat.create(3, fn)");

const cRect: number[][] = jStat.create(2, 4, (r: number, c: number) => r + c * 10);
assertMatrix(cRect, "jStat.create(2,4,fn)");

// ==========================================================================
// Static: symmetric, clear
// ==========================================================================

_section("symmetric, clear");

assertBoolean(
  jStat.symmetric([
    [1, 2],
    [2, 1],
  ]),
  "jStat.symmetric(symmetric)",
);
assertBoolean(
  !jStat.symmetric([
    [1, 2],
    [3, 4],
  ]),
  "jStat.symmetric(not symmetric)",
);

const clearMat: number[][] = jStat.clear([
  [1, 2],
  [3, 4],
]);
assertMatrix(clearMat, "jStat.clear(matrix)");

const clearVec: number[] = jStat.clear([1, 2, 3]);
assertNumberArray(clearVec, "jStat.clear([1,2,3])");

// ==========================================================================
// Static: slice, sliceAssign
// ==========================================================================

_section("slice, sliceAssign");

const sm: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Single cell
const cell: number = jStat.slice(sm, { row: 0, col: 2 });
assertNumber(cell, "jStat.slice({row:0,col:2})");

// Row slice
const rowSlice: number[] = jStat.slice(sm, { row: 1, col: { start: 1 } });
assertNumberArray(rowSlice, "jStat.slice({row:1,col:{start:1}})");

// Column slice
const colSlice: number[] = jStat.slice(sm, { row: { end: 2 }, col: 0 });
assertNumberArray(colSlice, "jStat.slice({row:{end:2},col:0})");

// Sub-matrix
const subMat: number[][] = jStat.slice(sm, { row: { end: 2 }, col: { start: 1 } });
assertMatrix(subMat, "jStat.slice sub-matrix");

// sliceAssign — single cell
const sa1: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const assignCell: number = jStat.sliceAssign(sa1, { row: 0, col: 0 }, 99);
assertNumber(assignCell, "jStat.sliceAssign cell");

// sliceAssign — row
const sa2: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const assignRow: number[][] = jStat.sliceAssign(sa2, { row: 1, col: { start: 1 } }, [10, 20]);
assertMatrix(assignRow, "jStat.sliceAssign row");

// sliceAssign — sub-matrix
const sa3: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const assignSub: number[][] = jStat.sliceAssign(sa3, { row: { start: 1 }, col: { start: 1 } }, [
  [10, 20],
  [30, 40],
]);
assertMatrix(assignSub, "jStat.sliceAssign sub-matrix");

// ==========================================================================
// Instance methods
// ==========================================================================

_section("Instance Methods");

const inst: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
]);

const iRows: number = inst.rows();
assertNumber(iRows, "inst.rows()");
assertInstanceOf(
  inst.rows((v: number) => {}),
  jStat.jStat,
  "inst.rows(cb)",
);

const iCols: number = inst.cols();
assertNumber(iCols, "inst.cols()");
assertInstanceOf(
  inst.cols((v: number) => {}),
  jStat.jStat,
  "inst.cols(cb)",
);

const iDims: jStat.DimensionsResult = inst.dimensions();
assertObject(iDims, "inst.dimensions()");
assertInstanceOf(
  inst.dimensions((v: jStat.DimensionsResult) => {}),
  jStat.jStat,
  "inst.dimensions(cb)",
);

const iTransposed: jStat.JStat = inst.transpose();
assertInstanceOf(iTransposed, jStat.jStat, "inst.transpose()");

const iDiag: jStat.JStat = inst.diag();
assertInstanceOf(iDiag, jStat.jStat, "inst.diag()");

const iAntiDiag: jStat.JStat = inst.antidiag();
assertInstanceOf(iAntiDiag, jStat.jStat, "inst.antidiag()");

assertInstanceOf(
  inst.map((x: number) => x * 2),
  jStat.jStat,
  "inst.map(fn)",
);
assertInstanceOf(
  inst.cumreduce((a: number, b: number) => a + b),
  jStat.jStat,
  "inst.cumreduce(fn)",
);
assertInstanceOf(
  inst.alter((x: number) => x + 5),
  jStat.jStat,
  "inst.alter(fn)",
);
assertInstanceOf(
  inst.create(2, (r: number, c: number) => r + c),
  jStat.jStat,
  "inst.create(2,fn)",
);
assertInstanceOf(
  inst.create(2, 2, (r: number, c: number) => r + c),
  jStat.jStat,
  "inst.create(2,2,fn)",
);
assertInstanceOf(inst.zeros(2), jStat.jStat, "inst.zeros(2)");
assertInstanceOf(inst.zeros(2, 3), jStat.jStat, "inst.zeros(2,3)");
assertInstanceOf(inst.ones(2), jStat.jStat, "inst.ones(2)");
assertInstanceOf(inst.ones(2, 3), jStat.jStat, "inst.ones(2, 3)");
assertInstanceOf(inst.rand(2), jStat.jStat, "inst.rand(2)");
assertInstanceOf(inst.rand(2, 2), jStat.jStat, "inst.rand(2,2)");
assertInstanceOf(inst.identity(3), jStat.jStat, "inst.identity(3)");
assertInstanceOf(inst.identity(3, 3), jStat.jStat, "inst.identity(3, 3)");

const iClear: jStat.JStat = inst.clear();
assertInstanceOf(iClear, jStat.jStat, "inst.clear()");
assertBoolean(inst.symmetric(), "inst.symmetric(fn)");

// row/col instance
const iRow: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
]).row(0);
assertInstanceOf(iRow, jStat.jStat, "inst.row(0)");
const iRowCb: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
]).row(0, (v: jStat.JStat) => {});
assertInstanceOf(iRowCb, jStat.jStat, "inst.row(0, fn)");

const iCol: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
]).col(0);
assertInstanceOf(iCol, jStat.jStat, "inst.col(0)");


// instance toArray
const iArr: number[] | number[][] = jStat([10, 20, 30]).toArray();
assertArray(iArr, "inst.toArray()");
