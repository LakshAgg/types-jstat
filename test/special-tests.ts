import jStat from 'jstat';
import {
    _section,
    assertNumber,
    assertArray,
    assertMatrix,
    assertInstanceOf,
} from './helpers';

// ==========================================================================
// Special Functions static method tests — types/special.d.ts
// ==========================================================================

_section('Special Functions');

// Beta function family
const betaFn: number | undefined = jStat.betafn(2, 3);
assertNumber(betaFn as number, 'jStat.betafn(2,3)');

const betaLn: number = jStat.betaln(2, 3);
assertNumber(betaLn, 'jStat.betaln(2,3)');

const betaCf: number = jStat.betacf(0.5, 2, 3);
assertNumber(betaCf, 'jStat.betacf(0.5,2,3)');

const ibetaVal: number | false = jStat.ibeta(0.5, 2, 3);
assertNumber(ibetaVal as number, 'jStat.ibeta(0.5,2,3)');

const ibetaInv: number = jStat.ibetainv(0.5, 2, 3);
assertNumber(ibetaInv, 'jStat.ibetainv(0.5,2,3)');

// Gamma function family
const gammaVal: number = jStat.gammafn(5);
assertNumber(gammaVal, 'jStat.gammafn(5)');

const gammaLn: number = jStat.gammaln(5);
assertNumber(gammaLn, 'jStat.gammaln(5)');

const gammaLn2: number = jStat.loggam(5);
assertNumber(gammaLn2, 'jStat.loggam(5)');

const gamP: number = jStat.gammap(2, 3);
assertNumber(gamP, 'jStat.gammap(2,3)');

const lowRG: number = jStat.lowRegGamma(2, 3);
assertNumber(lowRG, 'jStat.lowRegGamma(2,3)');

const gamPInv: number = jStat.gammapinv(0.5, 2);
assertNumber(gamPInv, 'jStat.gammapinv(0.5,2)');

// Factorial
const factLn: number = jStat.factorialln(5);
assertNumber(factLn, 'jStat.factorialln(5)');
assertNumber(jStat.factorial(5), 'jStat.factorial(5)');

// Combinations & Permutations
assertNumber(jStat.combination(5, 2), 'jStat.combination(5,2)');
assertNumber(jStat.combinationln(5, 2), 'jStat.combinationln(5,2)');
assertNumber(jStat.permutation(5, 2), 'jStat.permutation(5,2)');

// Error functions
assertNumber(jStat.erf(1), 'jStat.erf(1)');
assertNumber(jStat.erfc(1), 'jStat.erfc(1)');
assertNumber(jStat.erfcinv(0.5), 'jStat.erfcinv(0.5)');

// Random deviates
const rndNormal: number = jStat.randn();
assertNumber(rndNormal, 'jStat.randn()');
assertMatrix(jStat.randn(3, 4), 'jStat.randn(3,4)');

const rndGamma: number = jStat.randg(2);
assertNumber(rndGamma, 'jStat.randg(2)');
assertInstanceOf(jStat.randg(2, 3, 4), jStat.jStat, 'jStat.randg(2,3,4)');


const inst = jStat([1, 2, 3]);
const gammafn = inst.gammafn();
assertInstanceOf(gammafn, jStat.jStat, 'jStat([1,2,3]).gammafn()');

const gammaln = inst.gammaln();
assertInstanceOf(gammaln, jStat.jStat, 'jStat([1,2,3]).gammaln()');

const factorialln = inst.factorialln();
assertInstanceOf(factorialln, jStat.jStat, 'jStat([1,2,3]).factorialln()');

const factorial = inst.factorial();
assertInstanceOf(factorial, jStat.jStat, 'jStat([1,2,3]).factorial()');

const randn = inst.randn(3);
assertInstanceOf(randn, jStat.jStat, 'jStat([1,2,3]).randn(3)');