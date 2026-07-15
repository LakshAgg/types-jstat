import jStat from "jstat";
import {
    _section,
    assertNumber,
    assertMatrix,
    assertArray,
    assertInstanceOf,
    assertObject,
    assertNumberArray,
} from "./helpers";

// ==========================================================================
// Regression static method tests — types/regression.d.ts
// ==========================================================================

_section("Regression Helpers (Legacy API)");

// Sample data: simple linear regression with known relationship
// y = 2 + 3*x  (intercept=2, slope=3) plus noise
const x: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const y: number[] = [5.2, 8.1, 10.9, 14.2, 16.8, 20.1, 22.9, 26.3, 28.7];

// -- Design matrix builders --

// buildxmatrix: variadic columns → X matrix with intercept
const x1 = [1, 2, 3, 4, 5];
const x2 = [10, 20, 30, 40, 50];
const designMatrix1: jStat.JStat = jStat.buildxmatrix(x1, x2);
assertInstanceOf(designMatrix1, jStat.jStat, "jStat.buildxmatrix(...arrays)");

// builddxmatrix: 2D array → X matrix with intercept
const columns: number[][] = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
];
const designMatrix2: jStat.JStat = jStat.builddxmatrix(columns);
assertInstanceOf(designMatrix2, jStat.jStat, "jStat.builddxmatrix(columns)");

// buildjxmatrix: jStat instance → X matrix with intercept
const jMatCols: jStat.JStat = jStat([
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40],
    [5, 50],
]);
const designMatrix3: jStat.JStat = jStat.buildjxmatrix(jMatCols);
assertInstanceOf(designMatrix3, jStat.jStat, "jStat.buildjxmatrix(jMat)");

// buildymatrix: vector → transposed Y matrix
const yMatrix: jStat.JStat = jStat.buildymatrix(y);
assertInstanceOf(yMatrix, jStat.jStat, "jStat.buildymatrix(array)");

// buildjymatrix: jStat → transposed Y
const jMatY: jStat.JStat = jStat(y);
const jMatYTransposed: jStat.JStat = jStat.buildjymatrix(jMatY);
assertInstanceOf(jMatYTransposed, jStat.jStat, "jStat.buildjymatrix(jMat)");

// -- Matrix operations --

const jA: jStat.JStat = jStat([
    [1, 2],
    [3, 4],
]);
const jB: jStat.JStat = jStat([
    [5, 6],
    [7, 8],
]);

// matrixmult
const product: jStat.JStat | undefined = jStat.matrixmult(jA, jB);
assertInstanceOf(product!, jStat.jStat, "jStat.matrixmult(A, B)");

// matrixsubtract
const diff: jStat.JStat = jStat.matrixsubtract(jA, jB);
assertInstanceOf(diff, jStat.jStat, "jStat.matrixsubtract(A, B)");

// -- XᵀX helpers --

const jMatX: jStat.JStat = jStat([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
]);

// xtranspx: Xᵀ · X
const xtX: jStat.JStat = jStat.xtranspx(jMatX);
assertInstanceOf(xtX, jStat.jStat, "jStat.xtranspx(jMatX)");

// xtranspxinv: (Xᵀ · X)⁻¹
const xtXinv: number[][] = jStat.xtranspxinv(jMatX);
assertMatrix(xtXinv, "jStat.xtranspxinv(jMatX)");

// -- Regression --

const jMatYCol: jStat.JStat = jStat.buildymatrix([2, 5, 8, 11, 14]);

// regress: legacy OLS returning beta coefficients
const beta: jStat.JStat = jStat.regress(jMatX, jMatYCol);
assertInstanceOf(beta, jStat.jStat, "jStat.regress(jMatX, jMatY)");

// regresst: legacy regression with ANOVA + t-stats
const result: jStat.RegressionResult = jStat.regresst(jMatX, jMatYCol, 2);
assertObject(result, "jStat.regresst(jMatX, jMatY, 2)");

// regresst without sides
const resultOneSided: jStat.RegressionResult = jStat.regresst(jMatX, jMatYCol);
assertObject(resultOneSided, "jStat.regresst(jMatX, jMatY)");

// -- regresst result fields --

// yBar: predicted values
assertInstanceOf(result.yBar, jStat.jStat, "result.yBar");

// regress: coefficient vector
assertInstanceOf(result.regress, jStat.jStat, "result.regress");

// stats: per-coefficient statistics
assertArray(result.stats, "result.stats");
assertNumberArray(result.stats[0][0], "result.stats[0].beta");
assertNumber(result.stats[0][1], "result.stats[0].sd");
assertNumber(result.stats[0][2], "result.stats[0].t");
assertNumber(result.stats[0][3], "result.stats[0].p");

// anova: ANOVA table
assertNumber(result.anova.ssr, "result.anova.ssr");
assertNumber(result.anova.msr, "result.anova.msr");
assertNumber(result.anova.sse, "result.anova.sse");
assertNumber(result.anova.mse, "result.anova.mse");
assertNumber(result.anova.sst, "result.anova.sst");
assertNumber(result.anova.mst, "result.anova.mst");
assertNumber(result.anova.r2, "result.anova.r2");
assertNumber(result.anova.r2adj, "result.anova.r2adj");
assertNumber(result.anova.fratio, "result.anova.fratio");
assertNumber(result.anova.pvalue, "result.anova.pvalue");
assertNumber(result.anova.rmse, "result.anova.rmse");
assertInstanceOf(result.anova.residuals, jStat.jStat, "result.anova.residuals");

// -- jMatYBar: predicted values ŷ = X · β̂ --

const betaVector: jStat.JStat = jStat([[1], [2]]);
const predicted: jStat.JStat = jStat.jMatYBar(jMatX, betaVector);
assertInstanceOf(predicted, jStat.jStat, "jStat.jMatYBar(jMatX, beta)");

// -- residuals: y − ŷ --

const jMatYObserved: jStat.JStat = jStat([10, 20, 30, 40, 55]);
const residuals: jStat.JStat = jStat.residuals(jMatYObserved, predicted);
assertInstanceOf(residuals, jStat.jStat, "jStat.residuals(jMatY, jMatYBar)");

// -- Sum of squares --

const yMean: number = jStat.mean(y);

// ssr: sum of squares regression
const ssrVal: number = jStat.ssr(predicted.transpose()[0], yMean);
assertNumber(ssrVal, "jStat.ssr(jMatYBar, yAverage)");

// sse: sum of squared errors
const sseVal: number = jStat.sse(jMatYObserved[0], predicted.transpose()[0]);
assertNumber(sseVal, "jStat.sse(jMatY, jMatYBar)");

// sst: total sum of squares
const sstVal: number = jStat.sst(jMatYObserved[0], yMean);
assertNumber(sstVal, "jStat.sst(jMatY, yAverage)");
