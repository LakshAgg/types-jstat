import jStat from "jstat";
import { _section, assertNumber, assertNumberArray, assertBoolean, assertArray, assertInstanceOf, assertMatrix } from "./helpers";

// ==========================================================================
// Statistical Tests static method tests — types/tests.d.ts
// ==========================================================================

_section("Statistical Tests");

// -- z-score --
const z1: number = jStat.zscore(3, 5, 2);
assertNumber(z1, "jStat.zscore(value, mean, sd)");

const z2: number = jStat.zscore(3, [1, 2, 3, 4, 5]);
assertNumber(z2, "jStat.zscore(value, data)");

const z3: number = jStat.zscore(3, [1, 2, 3, 4, 5], true);
assertNumber(z3, "jStat.zscore(value, data, flag)");

// -- z-test --
const zt1: number = jStat.ztest(3, 5, 2);
assertNumber(zt1, "jStat.ztest(value, mean, sd)");

const zt2: number = jStat.ztest(3, 5, 2, 1);
assertNumber(zt2, "jStat.ztest(value, mean, sd, 1)");

const zt3: number = jStat.ztest(1.96);
assertNumber(zt3, "jStat.ztest(zscore)");

const zt4: number = jStat.ztest(1.96, 2);
assertNumber(zt4, "jStat.ztest(zscore, sides)");

const zt5: number = jStat.ztest(3, [1, 2, 3, 4, 5]);
assertNumber(zt5, "jStat.ztest(value, data)");

const zt6: number = jStat.ztest(3, [1, 2, 3, 4, 5], 1, true);
assertNumber(zt6, "jStat.ztest(value, data, 1, true)");

// -- t-score --
const ts1: number = jStat.tscore(3, 5, 2, 10);
assertNumber(ts1, "jStat.tscore(value, mean, sd, n)");

const ts2: number = jStat.tscore(3, [1, 2, 3, 4, 5]);
assertNumber(ts2, "jStat.tscore(value, data)");

// -- t-test --
const tt1: number = jStat.ttest(3, 5, 2, 10);
assertNumber(tt1, "jStat.ttest(value, mean, sd, n)");

const tt2: number = jStat.ttest(1.96, 10);
assertNumber(tt2, "jStat.ttest(tscore, n)");

const tt3: number = jStat.ttest(1.96, 10, 1);
assertNumber(tt3, "jStat.ttest(tscore, n, 1)");

const tt4: number = jStat.ttest(3, [1, 2, 3, 4, 5]);
assertNumber(tt4, "jStat.ttest(value, data)");

const tt5: number = jStat.ttest(3, [1, 2, 3, 4, 5], 1);
assertNumber(tt5, "jStat.ttest(value, data, 1)");

// -- ANOVA F --
const af1: number = jStat.anovafscore([1, 2], [3, 4], [5, 6]);
assertNumber(af1, "jStat.anovafscore(...arrays)");

const af2: number = jStat.anovafscore([
  [1, 2],
  [3, 4],
  [5, 6],
]);
assertNumber(af2, "jStat.anovafscore([arrays])");

// -- ANOVA F test (p-value) --
const ap1: number = jStat.anovaftest([1, 2], [3, 4], [5, 6]);
assertNumber(ap1, "jStat.anovaftest(...arrays)");

const afVal: number = jStat.anovaftest(3.5, 2, 9);
assertNumber(afVal, "jStat.anovaftest(f, df1, df2)");

// -- F-test --
assertNumber(jStat.ftest(3.5, 5, 10), "jStat.ftest(f, df1, df2)");

// -- Tukey q-score --
const q1: number = jStat.qscore(5, 3, 10, 10, 1.5);
assertNumber(q1, "jStat.qscore(m1, m2, n1, n2, sd)");

const q2: number = jStat.qscore([1, 2, 3], [4, 5, 6], 1.5);
assertNumber(q2, "jStat.qscore(arr1, arr2, sd)");

// -- Tukey q-test (p-value) --
const qtv1: number = jStat.qtest(3.5, 30, 3);
assertNumber(qtv1, "jStat.qtest(q, n, k)");

const qtv2: number = jStat.qtest([1, 2, 3], [4, 5, 6], 1.5, 30, 3);
assertNumber(qtv2, "jStat.qtest(arr1, arr2, sd, n, k)");

const qtv3: number = jStat.qtest(5, 3, 10, 10, 1.5, 30, 3);
assertNumber(qtv3, "jStat.qtest(m1, m2, n1, n2, sd, n, k)");

// -- Tukey HSD (pairwise) --
const hsd: Array<[[number, number], number]> = jStat.tukeyhsd([
  [1, 2],
  [3, 4],
  [5, 6],
]);
assertArray(hsd, "jStat.tukeyhsd");

// -- Confidence intervals --
const ci1: number[] = jStat.normalci(5, 0.05, 2, 30);
assertNumberArray(ci1, "jStat.normalci(value, alpha, sd, n)");

const ci2: number[] = jStat.normalci(5, 0.05, [1, 2, 3, 4, 5]);
assertNumberArray(ci2, "jStat.normalci(value, alpha, data)");

const ci3: number[] = jStat.tci(5, 0.05, 2, 30);
assertNumberArray(ci3, "jStat.tci(value, alpha, sd, n)");

const ci4: number[] = jStat.tci(5, 0.05, [1, 2, 3, 4, 5]);
assertNumberArray(ci4, "jStat.tci(value, alpha, data)");

// -- significant --
assertBoolean(jStat.significant(0.03, 0.05), "jStat.significant(0.03, 0.05)");
assertBoolean(!jStat.significant(0.07, 0.05), "jStat.significant(0.07, 0.05)");

// -------------------------------------------------------------------------
// Instance method tests (statistical tests as instance methods)
// -------------------------------------------------------------------------

_section("Instance Statistical Tests");

const inst: jStat.JStat = jStat([1, 2, 3, 4, 5]);

// zscore / ztest / tscore / ttest (instance)
assertNumber(inst.zscore(3), "inst.zscore(val)");
assertNumber(inst.zscore(3, true), "inst.zscore(val, flag)");
assertNumber(inst.ztest(3), "inst.ztest(val)");
assertNumber(inst.ztest(3, 1), "inst.ztest(val, 1)");
assertNumber(inst.ztest(3, 2, true), "inst.ztest(val, 2, true)");
assertNumber(inst.tscore(3), "inst.tscore(val)");
assertNumber(inst.ttest(3), "inst.ttest(val)");
assertNumber(inst.ttest(3, 1), "inst.ttest(val, 1)");

// anovafscore (instance on matrix)
const matInst: jStat.JStat = jStat([
  [1, 2],
  [3, 4],
  [5, 6],
]);
assertNumber(matInst.anovafscore(), "matInst.anovafscore()");
assertNumber(matInst.anovaftes(), "matInst.anovaftes()");

// Proportion tests (instance)
assertNumber(jStat([1, 2, 3]).oneSidedDifferenceOfProportions(0.5, 100, 0.4, 100), "inst.oneSidedDifferenceOfProportions");
assertNumber(jStat([1, 2, 3]).twoSidedDifferenceOfProportions(0.5, 100, 0.4, 100), "inst.twoSidedDifferenceOfProportions");

// Confidence intervals (instance)
assertNumberArray(inst.normalci(5, 0.05), "inst.normalci(5, 0.05)");
assertNumberArray(inst.tci(5, 0.05), "inst.tci(5, 0.05)");

// -------------------------------------------------------------------------
// Model tests
// -------------------------------------------------------------------------

_section("Models");

const endog: number[] = [1, -2, 3, 4, -5, 6, 7, -8, 9];
const exog: number[][] = [
  [1, 2, 3],
  [1, 1, 0],
  [1, -2, 3],
  [1, 3, 4],
  [1, -10, 2],
  [1, 4, 4],
  [1, 10, 2],
  [1, 3, 2],
  [1, 4, -1],
];
const model: jStat.OLSModel = jStat.models.ols(endog, exog);
assertInstanceOf(model, Object, "OLSModel");

assertNumber(model.nobs, "model.nobs");
assertNumber(model.df_model, "model.df_model");
assertNumber(model.df_resid, "model.df_resid");
assertArray(model.coef, "model.coef");
assertArray(model.predict, "model.predict");
assertArray(model.resid, "model.resid");
assertNumber(model.ybar, "model.ybar");
assertNumber(model.SST, "model.SST");
assertNumber(model.SSE, "model.SSE");
assertNumber(model.SSR, "model.SSR");
assertNumber(model.R2, "model.R2");
assertNumber(model.adjust_R2, "model.adjust_R2");
assertMatrix(model.exog, "model.exog");
assertNumberArray(model.endog, "model.endog (number[])");

// model.t
assertArray(model.t.se, "model.t.se");
assertArray(model.t.t, "model.t.t");
assertArray(model.t.p, "model.t.p");
assertNumber(model.t.sigmaHat, "model.t.sigmaHat");
assertArray(model.t.interval95, "model.t.interval95");

// model.f
assertNumber(model.f.F_statistic, "model.f.F_statistic");
assertNumber(model.f.pvalue, "model.f.pvalue");

// -------------------------------------------------------------------------
// Utils tests
// -------------------------------------------------------------------------

_section("Utils");

assertBoolean(jStat.utils.isArray([]), "jStat.utils.isArray([])");
assertBoolean(!jStat.utils.isArray({}), "jStat.utils.isArray({})");
assertBoolean(
  jStat.utils.isFunction(() => {}),
  "jStat.utils.isFunction(fn)",
);
assertBoolean(jStat.utils.isNumber(42), "jStat.utils.isNumber(42)");
assertBoolean(!jStat.utils.isNumber("x"), 'jStat.utils.isNumber("x")');
