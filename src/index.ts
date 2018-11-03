process.env.NODE_ENV = 'production'; // seamless-immutable will use this

import { ImmerLib } from './ImmerLib';
import { ImmutableAssign } from './ImmutableAssign';
import { ImmutableJS } from './ImmutableJS';
import { Mutable } from './Mutable';
import { ObjectAssign } from './ObjectAssign';
import { SeamlessLib } from './SeamlessLib';
import { SimplyImmutable } from './SimplyImmutable';
import { TestSuite } from './TestSuite';
import { TimmLib } from './TimmLib';

import * as fs from 'fs';
import * as path from 'path';


import chalk from 'chalk';
import * as expect from 'expect';
import * as _ from 'lodash';
import { deepFreeze } from 'simply-immutable';

const INITIAL_OBJECT = deepFreeze({
  toggle: false,
  b: 3,
  str: 'foo',
  d: {
    d1: 6,
    d2: 'foo',
    toggle: false,
    d9: {
      b: {
        b: {
          b: 1
        }
      }
    }
  },
  e: {
    e1: 18,
    e2: 'foo'
  }
});

const DEEP_PATH = deepFreeze(['d', 'd9', 'b', 'b', 'b']);

const ARRAY_LENGTH1 = 100;
const ARRAY_LENGTH2 = 1000;

const INITIAL_ARRAY1 = new Array(ARRAY_LENGTH1);
const INITIAL_ARRAY2 = new Array(ARRAY_LENGTH2);

for (let i = 0; i < INITIAL_ARRAY1.length; ++i) {
  INITIAL_ARRAY1[i] = { a: 1, b: 2 };
}
deepFreeze(INITIAL_ARRAY1);

for (let i = 0; i < INITIAL_ARRAY2.length; ++i) {
  INITIAL_ARRAY2[i] = { a: 1, b: 2 };
}
deepFreeze(INITIAL_ARRAY2);

const INITIAL_DEEP_ARRAY1 = deepFreeze([0, 1, 2, INITIAL_ARRAY1, [5, 6, 7]]);
const INITIAL_DEEP_ARRAY2 = deepFreeze([0, 1, 2, INITIAL_ARRAY2, [5, 6, 7]]);

const R = 5e5;
const W = R / 5;

function verify(solution: TestSuite, ignoreMutationError: boolean) {
  const results: string[] = [];
  function addResult(results, condition) {
    return results.push(condition ? chalk.green.bold('P') : chalk.green.red('F'));
  }

  let obj = solution.init(INITIAL_OBJECT);
  addResult(results, solution.get(obj, 'toggle') === false);
  
  results.push('-');  // 1
  let obj2 = solution.set(obj, 'toggle', true);
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {toggle: true}));
  }
  
  addResult(results, solution.get(obj, 'toggle') === false);
  addResult(results, solution.get(obj2, 'toggle') === true);
  addResult(results, obj2 !== obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  
  results.push('-');  // 2
  obj2 = solution.set(obj, 'str', 'foo');
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {str: 'foo'}));
  }
  addResult(results, obj2 === obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  
  results.push('-');  // 3
  obj2 = solution.setDeep(obj, 'd', 'd1', 3);
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {d: { d1: 3}}));
  }
  addResult(results, solution.getDeep(obj, 'd', 'd1') === 6);
  addResult(results, solution.getDeep(obj2, 'd', 'd1') === 3);
  addResult(results, obj2 !== obj);
  addResult(results, solution.get(obj2, 'd') !== solution.get(obj, 'd'));
  addResult(results, solution.get(obj2, 'e') === solution.get(obj, 'e'));
  
  results.push('-');  // 4
  obj2 = solution.set(obj, 'b', solution.get(obj, 'b'));
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(INITIAL_OBJECT);
  }
  addResult(results, obj2 === obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  
  results.push('-');  // 5
  obj2 = solution.set(obj, 'str', 'bar');
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {str: 'bar'}));
  }
  addResult(results, obj2 !== obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  
  obj = solution.init(INITIAL_OBJECT);
  obj2 = solution.setDeep(obj, 'd', 'd1', 6);
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {d: { d1: 6}}));
  }
  addResult(results, solution.getDeep(obj, 'd', 'd1') === 6);
  addResult(results, solution.getDeep(obj2, 'd', 'd1') === 6);
  addResult(results, obj2 === obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  
  results.push('-');  // 6
  obj2 = solution.setIn(obj, DEEP_PATH, 3);
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {d: { d9: {b: {b: {b: 3}}}}}));
  }
  addResult(results, obj2 !== obj);
  addResult(results, solution.get(obj2, 'd') !== solution.get(obj, 'd'));
  addResult(results, solution.get(obj2, 'e') === solution.get(obj, 'e'));
  addResult(results, solution.getIn(obj, DEEP_PATH) === 1);
  addResult(results, solution.getIn(obj2, DEEP_PATH) === 3);
  
  results.push('-');  // 7
  obj2 = solution.merge(obj, {
    c: 5,
    f: null
  });
  if (!ignoreMutationError) {
    expect(obj).toEqual(INITIAL_OBJECT);
    expect(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), {c: 5, f: null}));
  }
  addResult(results, obj2 !== obj);
  addResult(results, solution.get(obj2, 'd') === solution.get(obj, 'd'));
  addResult(results, solution.get(obj2, 'c') === 5);
  addResult(results, solution.get(obj2, 'f') === null);
  
  results.push('-');  // 8
  let arr = solution.initArr(INITIAL_ARRAY1);
  let arr2 = solution.setAt(arr, 1, {
    b: 3
  });
  if (!ignoreMutationError) {
    expect(arr).toEqual(INITIAL_ARRAY1);
    const expectedArr2 = _.cloneDeep(INITIAL_ARRAY1);
    expectedArr2[1] = {b: 3};
    expect(arr2).toEqual(expectedArr2);
  }
  addResult(results, arr2 !== arr);
  addResult(results, solution.getAt(arr, 1).b === 2);
  addResult(results, solution.getAt(arr2, 1).b === 3);
  arr2 = solution.setAt(arr, 1, solution.getAt(arr, 1));
  if (!ignoreMutationError) {
    expect(arr).toEqual(INITIAL_ARRAY1);
    expect(arr2).toEqual(INITIAL_ARRAY1);
  }
  addResult(results, arr2 === arr);
  
  results.push('-');  // 9
  arr = solution.initArr(INITIAL_DEEP_ARRAY1);
  arr2 = solution.setAtDeep(arr, 3, 0, {
    b: 3
  });
  if (!ignoreMutationError) {
    expect(arr).toEqual(INITIAL_DEEP_ARRAY1);
    const expectedArr2 = _.cloneDeep(INITIAL_DEEP_ARRAY1);
    expectedArr2[3][0] = {b: 3};
    expect(arr2).toEqual(expectedArr2);
  }
  addResult(results, arr2 !== arr);
  addResult(results, solution.get(solution.getAtDeep(arr, 3, 0), "b") === 2);
  addResult(results, solution.getAtDeep(arr2, 3, 0).b === 3);
  arr2 = solution.setAtDeep(arr, 3, 1, solution.getAtDeep(arr, 3, 1));
  if (!ignoreMutationError) {
    expect(arr).toEqual(INITIAL_DEEP_ARRAY1);
    expect(arr2).toEqual(INITIAL_DEEP_ARRAY1);
  }
  addResult(results, arr2 === arr);
  
  return console.log("  Verification: " + (results.join('')));
}

interface Outputs {
  [k: string]: {
    [k: string]: number;
  };
}

function allTests(output: Outputs, solutionKey: string, solution: TestSuite, ignoreMutationError = false) {
  console.log(chalk.bold('\n' + solutionKey));

  output[solutionKey] = {
    ['Total Elapsed']: 0,
    ['Total Read']: 0,
    ['Total Write']: 0,
  };

  function runTest(desc: string, cb) {
    const tic = Date.now();
    cb();
    const tac = Date.now();
    const elapsed = tac - tic;
    console.log(("  " + desc + ": ") + chalk.bold(elapsed + " ms"));
    output[solutionKey][desc] = elapsed;
    return elapsed;
  }

  let arr, obj;
  verify(solution, ignoreMutationError);
  obj = solution.init(INITIAL_OBJECT);
  let totalRead = 0;
  let totalWrite = 0;
  totalRead += runTest("Object: read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.get(obj, 'toggle');
      val;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  totalWrite += runTest("Object: write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const obj2 = solution.set(obj, 'b', j);
      obj2;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  totalRead += runTest("Object: deep read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getDeep(obj, 'd', 'd1');
      val;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  totalWrite += runTest("Object: deep write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const obj2 = solution.setDeep(obj, 'd', 'd1', j);
      obj2;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  totalRead += runTest("Object: very deep read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getIn(obj, DEEP_PATH);
      val;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  totalWrite += runTest("Object: very deep write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const obj2 = solution.setIn(obj, DEEP_PATH, j);
      obj2;
    }
  });
  obj = solution.init(INITIAL_OBJECT);
  const MERGE_OBJ = {
    c: 5,
    f: null
  };
  totalWrite += runTest("Object: merge (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const obj2 = solution.merge(obj, MERGE_OBJ);
      obj2;
    }
  });

  arr = solution.initArr(INITIAL_ARRAY1);
  totalRead += runTest("Small Array: read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getAt(arr, 1);
      val;
    }
  });
  arr = solution.initArr(INITIAL_ARRAY1);
  totalWrite += runTest("Small Array: write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const arr2 = solution.setAt(arr, 1, j);
      arr2;
    }
  });
  
  arr = solution.initArr(INITIAL_DEEP_ARRAY1);
  totalRead += runTest("Small Array: deep read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getAtDeep(arr, 3, 0);
      val;
    }
  });
  arr = solution.initArr(INITIAL_DEEP_ARRAY1);
  totalWrite += runTest("Small Array: deep write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const arr2 = solution.setAtDeep(arr, 3, 0, j);
      arr2;
    }
  });

  arr = solution.initArr(INITIAL_ARRAY2);
  totalRead += runTest("Large Array: read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getAt(arr, 1);
      val;
    }
  });
  arr = solution.initArr(INITIAL_ARRAY2);
  totalWrite += runTest("Large Array: write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const arr2 = solution.setAt(arr, 1, j);
      arr2;
    }
  });
  
  arr = solution.initArr(INITIAL_DEEP_ARRAY2);
  totalRead += runTest("Large Array: deep read (x" + R + ")", function () {
    for (let j = 0; j < R; ++j) {
      const val = solution.getAtDeep(arr, 3, 0);
      val;
    }
  });
  arr = solution.initArr(INITIAL_DEEP_ARRAY2);
  totalWrite += runTest("Large Array: deep write (x" + W + ")", function () {
    for (let j = 0; j < W; ++j) {
      const arr2 = solution.setAtDeep(arr, 3, 0, j);
      arr2;
    }
  });

  const totalElapsed = totalRead + totalWrite;
  console.log("Total elapsed = " + totalRead + " ms (read) + " + totalWrite + " ms (write) = " + totalElapsed + " ms.");
  output[solutionKey]['Total Elapsed'] = totalElapsed;
  output[solutionKey]['Total Read'] = totalRead;
  output[solutionKey]['Total Write'] = totalWrite;
}

{
  const output: Outputs = {};
  allTests(output, 'Mutable', new Mutable(), true);
  allTests(output, 'Object.assign', new ObjectAssign(false));
  allTests(output, 'simply-immutable', new SimplyImmutable(false));
  allTests(output, 'immutable-assign', new ImmutableAssign(false));
  allTests(output, 'immer setAutoFreeze(false)', new ImmerLib(false));
  allTests(output, 'immutable.js', new ImmutableJS(), true);
  allTests(output, 'seamless-immutable production', new SeamlessLib());
  allTests(output, 'timm', new TimmLib());

  // Deep freeze
  allTests(output, 'Object.assign + freeze', new ObjectAssign(true));
  allTests(output, 'simply-immutable + freeze', new SimplyImmutable(true));
  allTests(output, 'immutable-assign + freeze', new ImmutableAssign(true));
  allTests(output, 'immer + freeze', new ImmerLib(true));

  // output TSV
  const solutions = Object.keys(output);
  solutions.sort((key1, key2) => {
    return output[key1]['Total Elapsed'] - output[key2]['Total Elapsed'];
  });

  const headerRow = [''].concat(Object.keys(output[solutions[0]]));
  const rows = [ headerRow ].concat(solutions.map(solutionKey => {
    return [solutionKey].concat(Object.values(output[solutionKey]).map(v => v.toString()));
  }));

  fs.writeFileSync(path.join(__dirname, '../results/results.csv'), rows.map(r => r.join('\t')).join('\n'));
}
