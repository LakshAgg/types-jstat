import jStat from "jstat";
import { _section, assertNumber, assertMatrix, assertArray, assertInstanceOf } from "./helpers";

// ==========================================================================
// Distribution tests — types/distribution.d.ts
//
// Each distribution has:
//  - Static methods: dist.pdf(x, ...), dist.cdf(x, ...), dist.inv(p, ...),
//    dist.mean(...), dist.median(...), dist.mode(...), dist.sample(...), dist.variance(...)
//  - Instance methods via jStat.dist(a, b):
//    instance.pdf(x), instance.cdf(x), instance.inv(p), instance.mean(),
//    instance.median(), instance.mode(), instance.sample(), instance.variance()
//
// Some distributions are missing certain instance methods (no median / no sample / no inv).
// ==========================================================================

_section("Distribution Static Methods (pdf/cdf/inv/mean/mode/sample/variance)");

// Beta
assertNumber(jStat.beta.pdf(0.5, 2, 5), "jStat.beta.pdf");
assertNumber(jStat.beta.cdf(0.5, 2, 5), "jStat.beta.cdf");
assertNumber(jStat.beta.inv(0.5, 2, 5), "jStat.beta.inv");
assertNumber(jStat.beta.mean(2, 5), "jStat.beta.mean");
assertNumber(jStat.beta.median(2, 5), "jStat.beta.median");
assertNumber(jStat.beta.mode(2, 5), "jStat.beta.mode");
assertNumber(jStat.beta.sample(2, 5), "jStat.beta.sample");
assertNumber(jStat.beta.variance(2, 5), "jStat.beta.variance");

// Cauchy (local, scale)
assertNumber(jStat.cauchy.pdf(0, 0, 1), "jStat.cauchy.pdf");
assertNumber(jStat.cauchy.cdf(0, 0, 1), "jStat.cauchy.cdf");
assertNumber(jStat.cauchy.inv(0.5, 0, 1), "jStat.cauchy.inv");
assertNumber(jStat.cauchy.median(0, 1), "jStat.cauchy.median");
assertNumber(jStat.cauchy.mode(0, 1), "jStat.cauchy.mode");
assertNumber(jStat.cauchy.sample(0, 1), "jStat.cauchy.sample");

// Central F (no median)
assertNumber(jStat.centralF.pdf(2.5, 10, 20), "jStat.centralF.pdf");
assertNumber(jStat.centralF.cdf(2.5, 10, 20), "jStat.centralF.cdf");
assertNumber(jStat.centralF.inv(0.95, 10, 20), "jStat.centralF.inv");
assertNumber(jStat.centralF.mean(10, 20), "jStat.centralF.mean");
assertNumber(jStat.centralF.mode(10, 20), "jStat.centralF.mode");
assertNumber(jStat.centralF.sample(10, 20), "jStat.centralF.sample");
assertNumber(jStat.centralF.variance(10, 20), "jStat.centralF.variance");

// Chi-square
assertNumber(jStat.chisquare.pdf(3, 5), "jStat.chisquare.pdf");
assertNumber(jStat.chisquare.cdf(3, 5), "jStat.chisquare.cdf");
assertNumber(jStat.chisquare.inv(0.95, 5), "jStat.chisquare.inv");
assertNumber(jStat.chisquare.mean(5), "jStat.chisquare.mean");
assertNumber(jStat.chisquare.median(5), "jStat.chisquare.median");
assertNumber(jStat.chisquare.mode(5), "jStat.chisquare.mode");
assertNumber(jStat.chisquare.sample(5), "jStat.chisquare.sample");
assertNumber(jStat.chisquare.variance(5), "jStat.chisquare.variance");

// Normal
assertNumber(jStat.normal.pdf(0, 0, 1), "jStat.normal.pdf");
assertNumber(jStat.normal.cdf(0, 0, 1), "jStat.normal.cdf");
assertNumber(jStat.normal.inv(0.95, 0, 1), "jStat.normal.inv");
assertNumber(jStat.normal.mean(0, 1), "jStat.normal.mean");
assertNumber(jStat.normal.median(0, 1), "jStat.normal.median");
assertNumber(jStat.normal.mode(0, 1), "jStat.normal.mode");
assertNumber(jStat.normal.sample(0, 1), "jStat.normal.sample");
assertNumber(jStat.normal.variance(0, 1), "jStat.normal.variance");

// Laplace (no inv)
assertNumber(jStat.laplace.pdf(0, 0, 1), "jStat.laplace.pdf");
assertNumber(jStat.laplace.cdf(0, 0, 1), "jStat.laplace.cdf");
assertNumber(jStat.laplace.mean(0, 1), "jStat.laplace.mean");
assertNumber(jStat.laplace.median(0, 1), "jStat.laplace.median");
assertNumber(jStat.laplace.mode(0, 1), "jStat.laplace.mode");
assertNumber(jStat.laplace.sample(0, 1), "jStat.laplace.sample");
assertNumber(jStat.laplace.variance(0, 1), "jStat.laplace.variance");

// Gamma (no median)
assertNumber(jStat.gamma.pdf(1, 2, 3), "jStat.gamma.pdf");
assertNumber(jStat.gamma.cdf(1, 2, 3), "jStat.gamma.cdf");
assertNumber(jStat.gamma.inv(0.5, 2, 3), "jStat.gamma.inv");
assertNumber(jStat.gamma.mean(2, 3), "jStat.gamma.mean");
assertNumber(jStat.gamma.mode(2, 3), "jStat.gamma.mode");
assertNumber(jStat.gamma.sample(2, 3), "jStat.gamma.sample");
assertNumber(jStat.gamma.variance(2, 3), "jStat.gamma.variance");

// Inverse Gamma (no median)
assertNumber(jStat.invgamma.pdf(1, 2, 3), "jStat.invgamma.pdf");
assertNumber(jStat.invgamma.cdf(1, 2, 3), "jStat.invgamma.cdf");
assertNumber(jStat.invgamma.inv(0.5, 2, 3), "jStat.invgamma.inv");
assertNumber(jStat.invgamma.mean(2, 3), "jStat.invgamma.mean");
assertNumber(jStat.invgamma.mode(2, 3), "jStat.invgamma.mode");
assertNumber(jStat.invgamma.sample(2, 3), "jStat.invgamma.sample");
assertNumber(jStat.invgamma.variance(3, 3) as number, "jStat.invgamma.variance");

// Kumaraswamy (no sample)
assertNumber(jStat.kumaraswamy.pdf(0.5, 2, 3), "jStat.kumaraswamy.pdf");
assertNumber(jStat.kumaraswamy.cdf(0.5, 2, 3), "jStat.kumaraswamy.cdf");
assertNumber(jStat.kumaraswamy.inv(0.5, 2, 3), "jStat.kumaraswamy.inv");
assertNumber(jStat.kumaraswamy.mean(2, 3), "jStat.kumaraswamy.mean");
assertNumber(jStat.kumaraswamy.median(2, 3), "jStat.kumaraswamy.median");
assertNumber(jStat.kumaraswamy.mode(2, 3), "jStat.kumaraswamy.mode");
// assertNumber(jStat.kumaraswamy.variance(2, 3), 'jStat.kumaraswamy.variance');

// Log-normal
assertNumber(jStat.lognormal.pdf(1, 0, 1), "jStat.lognormal.pdf");
assertNumber(jStat.lognormal.cdf(1, 0, 1), "jStat.lognormal.cdf");
assertNumber(jStat.lognormal.inv(0.5, 0, 1), "jStat.lognormal.inv");
assertNumber(jStat.lognormal.mean(0, 1), "jStat.lognormal.mean");
assertNumber(jStat.lognormal.median(0, 1), "jStat.lognormal.median");
assertNumber(jStat.lognormal.mode(0, 1), "jStat.lognormal.mode");
assertNumber(jStat.lognormal.sample(0, 1), "jStat.lognormal.sample");
assertNumber(jStat.lognormal.variance(0, 1), "jStat.lognormal.variance");

// Pareto (no sample)
assertNumber(jStat.pareto.pdf(2, 1, 2), "jStat.pareto.pdf");
assertNumber(jStat.pareto.cdf(2, 1, 2), "jStat.pareto.cdf");
assertNumber(jStat.pareto.inv(0.5, 1, 2), "jStat.pareto.inv");
assertNumber(jStat.pareto.mean(1, 2), "jStat.pareto.mean");
assertNumber(jStat.pareto.median(1, 2), "jStat.pareto.median");
assertNumber(jStat.pareto.mode(1, 2), "jStat.pareto.mode");
assertNumber(jStat.pareto.variance(2, 4) as number, "jStat.pareto.variance");

// Student's t
assertNumber(jStat.studentt.pdf(1.96, 10), "jStat.studentt.pdf");
assertNumber(jStat.studentt.cdf(1.96, 10), "jStat.studentt.cdf");
assertNumber(jStat.studentt.inv(0.95, 10), "jStat.studentt.inv");
assertNumber(jStat.studentt.mean(10), "jStat.studentt.mean");
assertNumber(jStat.studentt.median(10), "jStat.studentt.median");
assertNumber(jStat.studentt.mode(10), "jStat.studentt.mode");
assertNumber(jStat.studentt.sample(10), "jStat.studentt.sample");
assertNumber(jStat.studentt.variance(10), "jStat.studentt.variance");

// Tukey (cdf and inv only)
assertNumber(jStat.tukey.cdf(3.5, 4, 20), "jStat.tukey.cdf");
assertNumber(jStat.tukey.inv(0.95, 4, 20), "jStat.tukey.inv");

// Weibull
assertNumber(jStat.weibull.pdf(1, 2, 3), "jStat.weibull.pdf");
assertNumber(jStat.weibull.cdf(1, 2, 3), "jStat.weibull.cdf");
assertNumber(jStat.weibull.inv(0.5, 2, 3), "jStat.weibull.inv");
assertNumber(jStat.weibull.mean(2, 3), "jStat.weibull.mean");
assertNumber(jStat.weibull.median(2, 3), "jStat.weibull.median");
assertNumber(jStat.weibull.mode(2, 3), "jStat.weibull.mode");
assertNumber(jStat.weibull.sample(2, 3), "jStat.weibull.sample");
assertNumber(jStat.weibull.variance(2, 3), "jStat.weibull.variance");

// Uniform
assertNumber(jStat.uniform.pdf(0.5, 0, 1), "jStat.uniform.pdf");
assertNumber(jStat.uniform.cdf(0.5, 0, 1), "jStat.uniform.cdf");
assertNumber(jStat.uniform.inv(0.5, 0, 1), "jStat.uniform.inv");
assertNumber(jStat.uniform.mean(0, 1), "jStat.uniform.mean");
// assertNumber(jStat.uniform.median(0, 2), 'jStat.uniform.median');
// assertNumber(jStat.uniform.mode(0, 1), 'jStat.uniform.mode');
assertNumber(jStat.uniform.sample(0, 1), "jStat.uniform.sample");
assertNumber(jStat.uniform.variance(0, 1), "jStat.uniform.variance");

// Arcsine
assertNumber(jStat.arcsine.pdf(0.5, 0, 1), "jStat.arcsine.pdf");
assertNumber(jStat.arcsine.cdf(0.5, 0, 1), "jStat.arcsine.cdf");
assertNumber(jStat.arcsine.inv(0.5, 0, 1), "jStat.arcsine.inv");
assertNumber(jStat.arcsine.mean(0, 1), "jStat.arcsine.mean");
assertNumber(jStat.arcsine.median(0, 1), "jStat.arcsine.median");
// assertNumber(jStat.arcsine.mode(0, 1), 'jStat.arcsine.mode');
assertNumber(jStat.arcsine.sample(0, 1), "jStat.arcsine.sample");
assertNumber(jStat.arcsine.variance(0, 1), "jStat.arcsine.variance");

// Triangular (no inv)
assertNumber(jStat.triangular.pdf(3, 1, 5, 3), "jStat.triangular.pdf");
assertNumber(jStat.triangular.cdf(3, 1, 5, 3), "jStat.triangular.cdf");
assertNumber(jStat.triangular.inv(1, 0, 2, 1), "jStat.triangular.inv");
assertNumber(jStat.triangular.mean(1, 5, 3), "jStat.triangular.mean");
assertNumber(jStat.triangular.median(1, 5, 3), "jStat.triangular.median");
assertNumber(jStat.triangular.mode(1, 5, 3), "jStat.triangular.mode");
assertNumber(jStat.triangular.sample(1, 5, 3), "jStat.triangular.sample");
assertNumber(jStat.triangular.variance(1, 5, 3), "jStat.triangular.variance");

// Exponential
assertNumber(jStat.exponential.pdf(1, 2), "jStat.exponential.pdf");
assertNumber(jStat.exponential.cdf(1, 2), "jStat.exponential.cdf");
assertNumber(jStat.exponential.inv(0.5, 2), "jStat.exponential.inv");
assertNumber(jStat.exponential.mean(2), "jStat.exponential.mean");
assertNumber(jStat.exponential.median(2), "jStat.exponential.median");
assertNumber(jStat.exponential.mode(2), "jStat.exponential.mode");
assertNumber(jStat.exponential.sample(2), "jStat.exponential.sample");
assertNumber(jStat.exponential.variance(2), "jStat.exponential.variance");

// Non-central t (pdf and cdf only)
assertNumber(jStat.noncentralt.pdf(1.96, 10, 2), "jStat.noncentralt.pdf");
assertNumber(jStat.noncentralt.cdf(1.96, 10, 2), "jStat.noncentralt.cdf");

// -------------------------------------------------------------------------
// Discrete distributions
// -------------------------------------------------------------------------

// Binomial
assertNumber(jStat.binomial.pdf(3, 10, 0.5), "jStat.binomial.pdf");
assertNumber(jStat.binomial.cdf(3, 10, 0.5), "jStat.binomial.cdf");

// Negative Binomial
assertNumber(jStat.negbin.pdf(3, 5, 0.5), "jStat.negbin.pdf");
assertNumber(jStat.negbin.cdf(3, 5, 0.5), "jStat.negbin.cdf");

// Hypergeometric
assertNumber(jStat.hypgeom.pdf(3, 10, 5, 4), "jStat.hypgeom.pdf");
assertNumber(jStat.hypgeom.cdf(3, 10, 5, 4), "jStat.hypgeom.cdf");

// Poisson
assertNumber(jStat.poisson.pdf(3, 5), "jStat.poisson.pdf");
assertNumber(jStat.poisson.cdf(3, 5), "jStat.poisson.cdf");
assertNumber(jStat.poisson.sample(5), "jStat.poisson.sample");
assertNumber(jStat.poisson.sampleSmall(5), "jStat.poisson.sampleSmall");
assertNumber(jStat.poisson.sampleLarge(5), "jStat.poisson.sampleLarge");

// -------------------------------------------------------------------------
// Distribution instance methods
// -------------------------------------------------------------------------

_section("Distribution Instance Methods");

const betaInst = jStat([1, 2, 3]).beta(2, 5);
assertInstanceOf(betaInst.pdf(), jStat.jStat, "betaInst.pdf(0.5)");
assertNumber(betaInst.pdf(0.5), "betaInst.pdf(0.5)");
assertInstanceOf(betaInst.pdf([[1, 2, 3]]), jStat.jStat, "betaInst.pdf(0.5)");
assertInstanceOf(betaInst.cdf(), jStat.jStat, "betaInst.cdf(0.5)");
assertNumber(betaInst.cdf(0.5), "betaInst.cdf(0.5)");
assertInstanceOf(betaInst.cdf([[1, 2, 3]]), jStat.jStat, "betaInst.cdf(0.5)");
assertInstanceOf(betaInst.inv(), jStat.jStat, "betaInst.inv(0.5)");
assertNumber(betaInst.inv(0.5), "betaInst.inv(0.5)");
assertInstanceOf(betaInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "betaInst.inv(0.5)");
assertNumber(betaInst.mean(), "betaInst.mean()");
assertNumber(betaInst.median(), "betaInst.median()");
assertNumber(betaInst.mode(), "betaInst.mode()");
assertNumber(betaInst.sample(), "betaInst.sample()");
assertNumber(betaInst.variance(), "betaInst.variance()");

// Chi-square instance
const chiInst = jStat([1, 2, 3]).chisquare(5);
assertInstanceOf(chiInst.pdf(), jStat.jStat, "chiInst.pdf(3)");
assertNumber(chiInst.pdf(3), "chiInst.pdf(3)");
assertInstanceOf(chiInst.pdf([[1, 2, 3]]), jStat.jStat, "chiInst.pdf(3)");
assertInstanceOf(chiInst.cdf(), jStat.jStat, "chiInst.cdf(3)");
assertNumber(chiInst.cdf(3), "chiInst.cdf(3)");
assertInstanceOf(chiInst.cdf([[1, 2, 3]]), jStat.jStat, "chiInst.cdf(3)");
assertInstanceOf(chiInst.inv(), jStat.jStat, "chiInst.inv(0.95)");
assertNumber(chiInst.inv(0.95), "chiInst.inv(0.95)");
assertInstanceOf(chiInst.inv([[0.95], [0.12], [0.23]]), jStat.jStat, "chiInst.inv(0.95)");
assertNumber(chiInst.mean(), "chiInst.mean()");
assertNumber(chiInst.median(), "chiInst.median()");
assertNumber(chiInst.mode(), "chiInst.mode()");
assertNumber(chiInst.sample(), "chiInst.sample()");
assertNumber(chiInst.variance(), "chiInst.variance()");

// Weibull instance
const wbInst = jStat([1, 2, 3]).weibull(2, 3);
assertInstanceOf(wbInst.pdf(), jStat.jStat, "wbInst.pdf(1)");
assertNumber(wbInst.pdf(1), "wbInst.pdf(1)");
assertInstanceOf(wbInst.pdf([[1, 2, 3]]), jStat.jStat, "wbInst.pdf(1)");
assertInstanceOf(wbInst.cdf(), jStat.jStat, "wbInst.cdf(1)");
assertNumber(wbInst.cdf(1), "wbInst.cdf(1)");
assertInstanceOf(wbInst.cdf([[1, 2, 3]]), jStat.jStat, "wbInst.cdf(1)");
assertInstanceOf(wbInst.inv(), jStat.jStat, "wbInst.inv(0.5)");
assertNumber(wbInst.inv(0.5), "wbInst.inv(0.5)");
assertInstanceOf(wbInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "wbInst.inv(0.5)");
assertNumber(wbInst.mean(), "wbInst.mean()");
assertNumber(wbInst.median(), "wbInst.median()");
assertNumber(wbInst.mode(), "wbInst.mode()");
assertNumber(wbInst.sample(), "wbInst.sample()");
assertNumber(wbInst.variance(), "wbInst.variance()");

// Uniform instance
const uniInst = jStat([1, 2, 3]).uniform(0, 1);
assertInstanceOf(uniInst.pdf(), jStat.jStat, "uniInst.pdf(0.5)");
assertNumber(uniInst.pdf(0.5), "uniInst.pdf(0.5)");
assertInstanceOf(uniInst.pdf([[1, 2, 3]]), jStat.jStat, "uniInst.pdf(0.5)");
assertInstanceOf(uniInst.cdf(), jStat.jStat, "uniInst.cdf(0.5)");
assertNumber(uniInst.cdf(0.5), "uniInst.cdf(0.5)");
assertInstanceOf(uniInst.cdf([[1, 2, 3]]), jStat.jStat, "uniInst.cdf(0.5)");
assertInstanceOf(uniInst.inv(), jStat.jStat, "uniInst.inv(0.5)");
assertNumber(uniInst.inv(0.5), "uniInst.inv(0.5)");
assertInstanceOf(uniInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "uniInst.inv(0.5)");
assertNumber(uniInst.mean(), "uniInst.mean()");
assertNumber(uniInst.sample(), "uniInst.sample()");
assertNumber(uniInst.variance(), "uniInst.variance()");

// Exponential instance
const expInst = jStat([1, 2, 3]).exponential(1);
assertInstanceOf(expInst.pdf(), jStat.jStat, "expInst.pdf(1)");
assertNumber(expInst.pdf(1), "expInst.pdf(1)");
assertInstanceOf(expInst.pdf([[1, 2, 3]]), jStat.jStat, "expInst.pdf(1)");
assertInstanceOf(expInst.cdf(), jStat.jStat, "expInst.cdf(1)");
assertNumber(expInst.cdf(1), "expInst.cdf(1)");
assertInstanceOf(expInst.cdf([[1, 2, 3]]), jStat.jStat, "expInst.cdf(1)");
assertInstanceOf(expInst.inv(), jStat.jStat, "expInst.inv(0.5)");
assertNumber(expInst.inv(0.5), "expInst.inv(0.5)");
assertInstanceOf(expInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "expInst.inv(0.5)");
assertNumber(expInst.mean(), "expInst.mean()");
assertNumber(expInst.median(), "expInst.median()");
assertNumber(expInst.mode(), "expInst.mode()");
assertNumber(expInst.sample(), "expInst.sample()");
assertNumber(expInst.variance(), "expInst.variance()");

// Log-normal instance
const lnInst = jStat([1, 2, 3]).lognormal(0, 1);
assertInstanceOf(lnInst.pdf(), jStat.jStat, "lnInst.pdf(1)");
assertNumber(lnInst.pdf(1), "lnInst.pdf(1)");
assertInstanceOf(lnInst.pdf([[1, 2, 3]]), jStat.jStat, "lnInst.pdf(1)");
assertInstanceOf(lnInst.cdf(), jStat.jStat, "lnInst.cdf(1)");
assertNumber(lnInst.cdf(1), "lnInst.cdf(1)");
assertInstanceOf(lnInst.cdf([[1, 2, 3]]), jStat.jStat, "lnInst.cdf(1)");
assertInstanceOf(lnInst.inv(), jStat.jStat, "lnInst.inv(0.5)");
assertNumber(lnInst.inv(0.5), "lnInst.inv(0.5)");
assertInstanceOf(lnInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "lnInst.inv(0.5)");
assertNumber(lnInst.mean(), "lnInst.mean()");
assertNumber(lnInst.median(), "lnInst.median()");
assertNumber(lnInst.mode(), "lnInst.mode()");
assertNumber(lnInst.sample(), "lnInst.sample()");
assertNumber(lnInst.variance(), "lnInst.variance()");

// Student's t instance
const tInst = jStat([1, 2, 3]).studentt(10);
assertInstanceOf(tInst.pdf(), jStat.jStat, "tInst.pdf(1.96)");
assertNumber(tInst.pdf(1.96), "tInst.pdf(1.96)");
assertInstanceOf(tInst.pdf([[1, 2, 3]]), jStat.jStat, "tInst.pdf(1.96)");
assertInstanceOf(tInst.cdf(), jStat.jStat, "tInst.cdf(1.96)");
assertNumber(tInst.cdf(1.96), "tInst.cdf(1.96)");
assertInstanceOf(tInst.cdf([[1, 2, 3]]), jStat.jStat, "tInst.cdf(1.96)");
assertInstanceOf(tInst.inv(), jStat.jStat, "tInst.inv(0.95)");
assertNumber(tInst.inv(0.95), "tInst.inv(0.95)");
assertInstanceOf(tInst.inv([[0.95], [0.12], [0.23]]), jStat.jStat, "tInst.inv(0.95)");
assertNumber(tInst.mean(), "tInst.mean()");
assertNumber(tInst.median(), "tInst.median()");
assertNumber(tInst.mode(), "tInst.mode()");
assertNumber(tInst.sample(), "tInst.sample()");
assertNumber(tInst.variance(), "tInst.variance()");

// Cauchy instance
const cauInst = jStat([1, 2, 3]).cauchy(0, 1);
assertInstanceOf(cauInst.pdf(), jStat.jStat, "cauInst.pdf(0)");
assertNumber(cauInst.pdf(0), "cauInst.pdf(0)");
assertInstanceOf(cauInst.pdf([[1, 2, 3]]), jStat.jStat, "cauInst.pdf(0)");
assertInstanceOf(cauInst.cdf(), jStat.jStat, "cauInst.cdf(0)");
assertNumber(cauInst.cdf(0), "cauInst.cdf(0)");
assertInstanceOf(cauInst.cdf([[1, 2, 3]]), jStat.jStat, "cauInst.cdf(0)");
assertInstanceOf(cauInst.inv(), jStat.jStat, "cauInst.inv(0.5)");
assertNumber(cauInst.inv(0.5), "cauInst.inv(0.5)");
assertInstanceOf(cauInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "cauInst.inv(0.5)");
assertNumber(cauInst.median(), "cauInst.median()");
assertNumber(cauInst.mode(), "cauInst.mode()");
assertNumber(cauInst.sample(), "cauInst.sample()");

// Arcsine instance
const arcInst = jStat([1, 2, 3]).arcsine(0, 1);
assertInstanceOf(arcInst.pdf(), jStat.jStat, "arcInst.pdf(0.5)");
assertNumber(arcInst.pdf(0.5), "arcInst.pdf(0.5)");
assertInstanceOf(arcInst.pdf([[1, 2, 3]]), jStat.jStat, "arcInst.pdf(0.5)");
assertInstanceOf(arcInst.cdf(), jStat.jStat, "arcInst.cdf(0.5)");
assertNumber(arcInst.cdf(0.5), "arcInst.cdf(0.5)");
assertInstanceOf(arcInst.cdf([[1, 2, 3]]), jStat.jStat, "arcInst.cdf(0.5)");
assertInstanceOf(arcInst.inv(), jStat.jStat, "arcInst.inv(0.5)");
assertNumber(arcInst.inv(0.5), "arcInst.inv(0.5)");
assertInstanceOf(arcInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "arcInst.inv(0.5)");
assertNumber(arcInst.mean(), "arcInst.mean()");
assertNumber(arcInst.median(), "arcInst.median()");
assertNumber(arcInst.sample(), "arcInst.sample()");
assertNumber(arcInst.variance(), "arcInst.variance()");

// Triangular instance
const triInst = jStat([1, 2, 3]).triangular(1, 5, 3);
assertInstanceOf(triInst.pdf(), jStat.jStat, "triInst.pdf(3)");
assertNumber(triInst.pdf(3), "triInst.pdf(3)");
assertInstanceOf(triInst.pdf([[1, 2, 3]]), jStat.jStat, "triInst.pdf(3)");
assertInstanceOf(triInst.cdf(), jStat.jStat, "triInst.cdf(3)");
assertNumber(triInst.cdf(3), "triInst.cdf(3)");
assertInstanceOf(triInst.cdf([[1, 2, 3]]), jStat.jStat, "triInst.cdf(3)");
assertNumber(triInst.mean(), "triInst.mean()");
assertNumber(triInst.median(), "triInst.median()");
assertNumber(triInst.mode(), "triInst.mode()");
assertNumber(triInst.sample(), "triInst.sample()");
assertNumber(triInst.variance(), "triInst.variance()");

// Poisson instance
const poisInst = jStat([1, 2, 3]).poisson(5);
assertInstanceOf(poisInst.pdf(), jStat.jStat, "poisInst.pdf(3)");
assertNumber(poisInst.pdf(3), "poisInst.pdf(3)");
assertInstanceOf(poisInst.pdf([[1, 2, 3]]), jStat.jStat, "poisInst.pdf(3)");
assertInstanceOf(poisInst.cdf(), jStat.jStat, "poisInst.cdf(3)");
assertNumber(poisInst.cdf(3), "poisInst.cdf(3)");
assertInstanceOf(poisInst.cdf([[1, 2, 3]]), jStat.jStat, "poisInst.cdf(3)");
assertNumber(poisInst.sample(), "poisInst.sample()");

// Tukey instance
const tkInst = jStat([1, 2, 3]).tukey(4, 20);
assertInstanceOf(tkInst.cdf(), jStat.jStat, "tkInst.cdf(3.5)");
assertNumber(tkInst.cdf(3.5), "tkInst.cdf(3.5)");
assertInstanceOf(tkInst.cdf([[1, 2, 3]]), jStat.jStat, "tkInst.cdf(3.5)");
assertInstanceOf(tkInst.inv([[0.12], [0.23]]), jStat.jStat, "tkInst.inv(0.95)");
assertNumber(tkInst.inv(0.95), "tkInst.inv(0.95)");
assertInstanceOf(tkInst.inv([[0.95], [0.12], [0.23]]), jStat.jStat, "tkInst.inv(0.95)");

// Laplace instance (ContinuousNoInv)
const lapInst = jStat([1, 2, 3]).laplace(0, 1);
assertInstanceOf(lapInst.pdf(), jStat.jStat, "lapInst.pdf(0)");
assertNumber(lapInst.pdf(0), "lapInst.pdf(0)");
assertInstanceOf(lapInst.pdf([[1, 2, 3]]), jStat.jStat, "lapInst.pdf(0)");
assertInstanceOf(lapInst.cdf(), jStat.jStat, "lapInst.cdf(0)");
assertNumber(lapInst.cdf(0), "lapInst.cdf(0)");
assertInstanceOf(lapInst.cdf([[1, 2, 3]]), jStat.jStat, "lapInst.cdf(0)");
assertNumber(lapInst.mean(), "lapInst.mean()");
assertNumber(lapInst.median(), "lapInst.median()");
assertNumber(lapInst.mode(), "lapInst.mode()");
assertNumber(lapInst.sample(), "lapInst.sample()");
assertNumber(lapInst.variance(), "lapInst.variance()");

// Central F instance (ContinuousNoMedian)
const cfInst = jStat([1, 2, 3]).centralF(10, 20);
assertInstanceOf(cfInst.pdf(), jStat.jStat, "cfInst.pdf(2.5)");
assertNumber(cfInst.pdf(2.5), "cfInst.pdf(2.5)");
assertInstanceOf(cfInst.pdf([[1, 2, 3]]), jStat.jStat, "cfInst.pdf(2.5)");
assertInstanceOf(cfInst.cdf(), jStat.jStat, "cfInst.cdf(2.5)");
assertNumber(cfInst.cdf(2.5), "cfInst.cdf(2.5)");
assertInstanceOf(cfInst.cdf([[1, 2, 3]]), jStat.jStat, "cfInst.cdf(2.5)");
assertInstanceOf(cfInst.inv(), jStat.jStat, "cfInst.inv(0.95)");
assertNumber(cfInst.inv(0.95), "cfInst.inv(0.95)");
assertInstanceOf(cfInst.inv([[0.95], [0.12], [0.23]]), jStat.jStat, "cfInst.inv(0.95)");
assertNumber(cfInst.mean(), "cfInst.mean()");
assertNumber(cfInst.mode(), "cfInst.mode()");
assertNumber(cfInst.sample(), "cfInst.sample()");
assertNumber(cfInst.variance(), "cfInst.variance()");

// Gamma instance (ContinuousNoMedian)
const gamInst = jStat([1, 2, 3]).gamma(2, 3);
assertInstanceOf(gamInst.pdf(), jStat.jStat, "gamInst.pdf(1)");
assertNumber(gamInst.pdf(1), "gamInst.pdf(1)");
assertInstanceOf(gamInst.pdf([[1, 2, 3]]), jStat.jStat, "gamInst.pdf(1)");
assertInstanceOf(gamInst.cdf(), jStat.jStat, "gamInst.cdf(1)");
assertNumber(gamInst.cdf(1), "gamInst.cdf(1)");
assertInstanceOf(gamInst.cdf([[1, 2, 3]]), jStat.jStat, "gamInst.cdf(1)");
assertInstanceOf(gamInst.inv(), jStat.jStat, "gamInst.inv(0.5)");
assertNumber(gamInst.inv(0.5), "gamInst.inv(0.5)");
assertInstanceOf(gamInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "gamInst.inv(0.5)");
assertNumber(gamInst.mean(), "gamInst.mean()");
assertNumber(gamInst.mode(), "gamInst.mode()");
assertNumber(gamInst.sample(), "gamInst.sample()");
assertNumber(gamInst.variance(), "gamInst.variance()");

// Kumaraswamy instance (ContinuousNoSample)
const kumInst = jStat([1, 2, 3]).kumaraswamy(2, 3);
assertInstanceOf(kumInst.pdf(), jStat.jStat, "kumInst.pdf(0.5)");
assertNumber(kumInst.pdf(0.5), "kumInst.pdf(0.5)");
assertInstanceOf(kumInst.pdf([[1, 2, 3]]), jStat.jStat, "kumInst.pdf(0.5)");
assertInstanceOf(kumInst.cdf(), jStat.jStat, "kumInst.cdf(0.5)");
assertNumber(kumInst.cdf(0.5), "kumInst.cdf(0.5)");
assertInstanceOf(kumInst.cdf([[1, 2, 3]]), jStat.jStat, "kumInst.cdf(0.5)");
assertInstanceOf(kumInst.inv(), jStat.jStat, "kumInst.inv(0.5)");
assertNumber(kumInst.inv(0.5), "kumInst.inv(0.5)");
assertInstanceOf(kumInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "kumInst.inv(0.5)");
assertNumber(kumInst.mean(), "kumInst.mean()");
assertNumber(kumInst.median(), "kumInst.median()");
assertNumber(kumInst.mode(), "kumInst.mode()");

// Pareto instance (ContinuousNoSample)
const parInst = jStat([1, 2, 3]).pareto(1, 3);
assertInstanceOf(parInst.pdf(), jStat.jStat, "parInst.pdf(2)");
assertNumber(parInst.pdf(2), "parInst.pdf(2)");
assertInstanceOf(parInst.pdf([[1, 2, 3]]), jStat.jStat, "parInst.pdf(2)");
assertInstanceOf(parInst.cdf(), jStat.jStat, "parInst.cdf(2)");
assertNumber(parInst.cdf(2), "parInst.cdf(2)");
assertInstanceOf(parInst.cdf([[1, 2, 3]]), jStat.jStat, "parInst.cdf(2)");
assertInstanceOf(parInst.inv([[0.12], [0.23]]), jStat.jStat, "parInst.inv(0.5)");
assertNumber(parInst.inv(0.5), "parInst.inv(0.5)");
assertInstanceOf(parInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "parInst.inv(0.5)");
assertNumber(parInst.mean(), "parInst.mean()");
assertNumber(parInst.median(), "parInst.median()");
assertNumber(parInst.mode(), "parInst.mode()");
assertNumber(parInst.variance(), "parInst.variance()");

// Inverse Gamma instance (ContinuousNoMedian)
const igInst = jStat([1, 2, 3]).invgamma(3, 3);
assertInstanceOf(igInst.pdf(), jStat.jStat, "igInst.pdf(1)");
assertNumber(igInst.pdf(1), "igInst.pdf(1)");
assertInstanceOf(igInst.pdf([[1, 2, 3]]), jStat.jStat, "igInst.pdf(1)");
assertInstanceOf(igInst.cdf(), jStat.jStat, "igInst.cdf(1)");
assertNumber(igInst.cdf(1), "igInst.cdf(1)");
assertInstanceOf(igInst.cdf([[1, 2, 3]]), jStat.jStat, "igInst.cdf(1)");
assertInstanceOf(igInst.inv([[0.12], [0.23]]), jStat.jStat, "igInst.inv(0.5)");
assertNumber(igInst.inv(0.5), "igInst.inv(0.5)");
assertInstanceOf(igInst.inv([[0.5], [0.12], [0.23]]), jStat.jStat, "igInst.inv(0.5)");
assertNumber(igInst.mean(), "igInst.mean()");
assertNumber(igInst.mode(), "igInst.mode()");
assertNumber(igInst.sample(), "igInst.sample()");
assertNumber(igInst.variance(), "igInst.variance()");

// DiscreteBasic instances (binomial, negbin, hypgeom)
const binInst = jStat([1, 2, 3]).binomial(10, 0.5);
assertInstanceOf(binInst.pdf(), jStat.jStat, "binInst.pdf(5)");
assertNumber(binInst.pdf(5), "binInst.pdf(5)");
assertInstanceOf(binInst.pdf([[1, 2, 3]]), jStat.jStat, "binInst.pdf(5)");
assertInstanceOf(binInst.cdf(), jStat.jStat, "binInst.cdf(5)");
assertNumber(binInst.cdf(5), "binInst.cdf(5)");
assertInstanceOf(binInst.cdf([[1, 2, 3]]), jStat.jStat, "binInst.cdf(5)");

const negInst = jStat([1, 2, 3]).negbin(5, 0.5);
assertInstanceOf(negInst.pdf(), jStat.jStat, "negInst.pdf(3)");
assertNumber(negInst.pdf(3), "negInst.pdf(3)");
assertInstanceOf(negInst.pdf([[1, 2, 3]]), jStat.jStat, "negInst.pdf(3)");
assertInstanceOf(negInst.cdf(), jStat.jStat, "negInst.cdf(3)");
assertNumber(negInst.cdf(3), "negInst.cdf(3)");
assertInstanceOf(negInst.cdf([[1, 2, 3]]), jStat.jStat, "negInst.cdf(3)");

const hypInst = jStat([1, 2, 3]).hypgeom(10, 5, 4);
assertInstanceOf(hypInst.pdf(), jStat.jStat, "hypInst.pdf(2)");
assertNumber(hypInst.pdf(2), "hypInst.pdf(2)");
assertInstanceOf(hypInst.pdf([[1, 2, 3]]), jStat.jStat, "hypInst.pdf(2)");
assertInstanceOf(hypInst.cdf(), jStat.jStat, "hypInst.cdf(2)");
assertNumber(hypInst.cdf(2), "hypInst.cdf(2)");
assertInstanceOf(hypInst.cdf([[1, 2, 3]]), jStat.jStat, "hypInst.cdf(2)");

// Non-central t instance (NoncentralTInstance)
const nctInst = jStat([1, 2, 3]).noncentralt(10, 2);
assertInstanceOf(nctInst.pdf(), jStat.jStat, "nctInst.pdf(1.96)");
assertNumber(nctInst.pdf(1.96), "nctInst.pdf(1.96)");
assertInstanceOf(nctInst.pdf([[1, 2, 3]]), jStat.jStat, "nctInst.pdf(1.96)");
assertInstanceOf(nctInst.cdf(), jStat.jStat, "nctInst.cdf(1.96)");
assertNumber(nctInst.cdf(1.96), "nctInst.cdf(1.96)");
assertInstanceOf(nctInst.cdf([[1, 2, 3]]), jStat.jStat, "nctInst.cdf(1.96)");
