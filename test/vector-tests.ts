import jStat from "jstat";
import { _section, assertNumber, assertNumberArray, assertArray, assertMatrix, assertInstanceOf } from "./helpers";

// ==========================================================================
// Vector static method tests — types/vector.d.ts
// ==========================================================================

_section("Vector Static Methods");

const vec: number[] = [1, 2, 3, 4, 5];
const even: number[] = [2, 4, 6, 8, 10];

// sum
assertNumber(jStat.sum(vec), "jStat.sum");
assertNumber(jStat.sumrow(vec), "jStat.sumrow (alias of sum)");

// sumsqrd
assertNumber(jStat.sumsqrd(vec), "jStat.sumsqrd");

// sumsqerr
assertNumber(jStat.sumsqerr(vec), "jStat.sumsqerr");

// product
assertNumber(jStat.product(vec), "jStat.product");

// min / max
assertNumber(jStat.min(vec), "jStat.min");
assertNumber(jStat.max(vec), "jStat.max");

// mean / meansqerr
assertNumber(jStat.mean(vec), "jStat.mean");
assertNumber(jStat.meansqerr(vec), "jStat.meansqerr");

// geomean
assertNumber(jStat.geomean([1, 2, 4]), "jStat.geomean");

// median
assertNumber(jStat.median(vec), "jStat.median");
assertNumber(jStat.median([1, 2, 3, 4]), "jStat.median (even len)");

// cumulative operations
assertNumberArray(jStat.cumsum(vec), "jStat.cumsum");
assertNumberArray(jStat.cumprod([1, 2, 3, 4]), "jStat.cumprod");

// diff
assertNumberArray(jStat.diff(vec), "jStat.diff");

// rank
assertNumberArray(jStat.rank(vec), "jStat.rank");
const ranked: number[] = jStat.rank([3, 1, 2, 1]);
assertNumberArray(ranked, "jStat.rank with ties");

// mode
const modeSingle: number | number[] = jStat.mode([1, 2, 2, 3]);
assertNumber(modeSingle as number, "jStat.mode (unique)");
const modeMulti: number | number[] = jStat.mode([1, 2, 3]);
assertArray(modeMulti as number[], "jStat.mode (no mode)");

// range
assertNumber(jStat.range(vec), "jStat.range");

// variance / stdev (population and sample)
assertNumber(jStat.variance(vec), "jStat.variance (pop)");
assertNumber(jStat.variance(vec, false), "jStat.variance(false)");
assertNumber(jStat.variance(vec, true), "jStat.variance(sample)");

assertNumber(jStat.stdev(vec), "jStat.stdev (pop)");
assertNumber(jStat.stdev(vec, true), "jStat.stdev(sample)");

// pooled
assertNumber(
  jStat.pooledvariance([
    [1, 2],
    [3, 4],
  ]),
  "jStat.pooledvariance",
);
assertNumber(
  jStat.pooledstdev([
    [1, 2],
    [3, 4],
  ]),
  "jStat.pooledstdev",
);

// deviation
assertNumberArray(jStat.deviation(vec), "jStat.deviation");

// meandev / meddev
assertNumber(jStat.meandev(vec), "jStat.meandev");
assertNumber(jStat.meddev(vec), "jStat.meddev");

// skewness / kurtosis
assertNumber(jStat.skewness(vec), "jStat.skewness");
assertNumber(jStat.kurtosis(vec), "jStat.kurtosis");

// coeffvar
assertNumber(jStat.coeffvar(vec), "jStat.coeffvar");

// quartiles
assertNumberArray(jStat.quartiles(vec), "jStat.quartiles");

// quantiles
assertNumberArray(jStat.quantiles(vec, [0.25, 0.5, 0.75]), "jStat.quantiles");
assertNumberArray(jStat.quantiles(vec, [0.1, 0.9], 3 / 8, 3 / 8), "jStat.quantiles custom alpha/beta");

// percentile
assertNumber(jStat.percentile(vec, 0.5), "jStat.percentile(0.5)");
assertNumber(jStat.percentile(vec, 0.5, true), "jStat.percentile(exclusive)");

// percentileOfScore
assertNumber(jStat.percentileOfScore(vec, 3), "jStat.percentileOfScore(3)");
assertNumber(jStat.percentileOfScore(vec, 3, "strict"), "jStat.percentileOfScore(strict)");
assertNumber(jStat.percentileOfScore(vec, 3, "weak"), "jStat.percentileOfScore(weak)");

// histogram
assertNumberArray(jStat.histogram(vec, 4), "jStat.histogram(4)");
assertNumberArray(jStat.histogram(vec), "jStat.histogram (default bins)");

// covariance / correlation
assertNumber(jStat.covariance([1, 2, 3], [4, 5, 6]), "jStat.covariance");
assertNumber(jStat.corrcoeff([1, 2, 3], [4, 5, 6]), "jStat.corrcoeff");
assertNumber(jStat.spearmancoeff([1, 2, 3], [4, 5, 6]), "jStat.spearmancoeff");

// unique
assertNumberArray(jStat.unique([3, 1, 2, 1, 3]), "jStat.unique");

const jstat1d = jStat([1, 2, 2, 3, 4, 10]);
const jstat2d = jStat([
  [1, 2, 3, 4, 4],
  [1, 3, 3, 4, 4],
  [1, 2, 3, 4, 4],
]);
const fn = (v: number) => {};

function testMethod() {
  const methods = {
    sum: [assertNumber, assertNumberArray],
    sumsqrd: [assertNumber, assertNumberArray],
    sumsqerr: [assertNumber, assertNumberArray],
    sumrow: [assertNumber, assertNumberArray],
    product: [assertNumber, assertNumberArray],
    min: [assertNumber, assertNumberArray],
    max: [assertNumber, assertNumberArray],
    mean: [assertNumber, assertNumberArray],
    meansqerr: [assertNumber, assertNumberArray],
    geomean: [assertNumber, assertNumberArray],
    median: [assertNumber, assertNumberArray],
    cumsum: [assertNumberArray, assertMatrix, assertNumberArray, assertMatrix],
    cumprod: [assertNumberArray, assertMatrix, assertNumberArray, assertMatrix],
    diff: [assertNumberArray, assertMatrix],
    rank: [assertNumberArray, assertMatrix],
    mode: [assertNumber, assertNumberArray],
    range: [assertNumber, assertNumberArray],
    variance: [assertNumber, assertNumberArray],
    deviation: [assertNumberArray, assertMatrix],
    stdev: [assertNumber, assertNumberArray],
    meandev: [assertNumber, assertNumberArray],
    meddev: [assertNumber, assertNumberArray],
    coeffvar: [assertNumber, assertNumberArray],
    quartiles: [assertNumberArray, assertMatrix],
    histogram: [assertNumberArray, assertMatrix],
    skewness: [assertNumber, assertNumberArray],
    kurtosis: [assertNumber, assertNumberArray],
    unique: [assertNumberArray, assertMatrix],
  };
  for (const method in methods) {
    const [assertFn, assertArrayFn, assertFlatterFn, assertArrayFlattenFn] = methods[method as keyof typeof methods] as any;

    assertFn(jstat1d[method as keyof typeof methods](), `jStat.${method} (1D)`);
    (assertFlatterFn || assertFn)(jstat1d[method as keyof typeof methods](true), `jStat.${method} (1D, true)`);
    assertInstanceOf(jstat1d[method as keyof typeof methods](() => {}) as any, jStat.jStat, `jStat.${method} (1D, cb)`);
    assertInstanceOf(jstat1d[method as keyof typeof methods](true, () => {}) as any, jStat.jStat, `jStat.${method} (1D true, cb)`);

    assertArrayFn(jstat2d[method as keyof typeof methods](), `jStat.${method} (2D)`);
    (assertArrayFlattenFn || assertFn)(jstat2d[method as keyof typeof methods](true), `jStat.${method} (2D, flatten)`);
    assertInstanceOf(jstat2d[method as keyof typeof methods](() => {}) as any, jStat.jStat, `jStat.${method} (2D, cb)`);
    assertInstanceOf(jstat2d[method as keyof typeof methods](true, () => {}) as any, jStat.jStat, `jStat.${method} (2D, flatten, cb)`);
  }
}
testMethod();

assertNumberArray(jstat1d.quantiles([1, 2, 3]) as number[], "jStat.quantiles (1D)");
assertInstanceOf(
  jstat1d.quantiles([1, 2, 3], () => {}),
  jStat.jStat,
  "jStat.quantiles (1D, cb)",
);

assertNumber(jstat1d.percentileOfScore(2) as number, "jStat.percentileOfScore (1D)");
assertNumberArray(jstat2d.percentileOfScore(2) as number[], "jStat.percentileOfScore (2D)");
assertInstanceOf(
  jstat1d.percentileOfScore(1, () => {}),
  jStat.jStat,
  "jStat.percentileOfScore (1D, cb)",
);
