"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'production'; // seamless-immutable will use this
const chalk_1 = __importDefault(require("chalk"));
const deep_freeze_strict_1 = __importDefault(require("deep-freeze-strict"));
const expect_1 = __importDefault(require("expect"));
const _ = __importStar(require("lodash"));
const INITIAL_OBJECT = deep_freeze_strict_1.default({
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
const DEEP_PATH = deep_freeze_strict_1.default(['d', 'd9', 'b', 'b', 'b']);
const ARRAY_LENGTH1 = 100;
const ARRAY_LENGTH2 = 1000;
const INITIAL_ARRAY1 = new Array(ARRAY_LENGTH1);
const INITIAL_ARRAY2 = new Array(ARRAY_LENGTH2);
for (let i = 0; i < INITIAL_ARRAY1.length; ++i) {
    INITIAL_ARRAY1[i] = { a: 1, b: 2 };
}
deep_freeze_strict_1.default(INITIAL_ARRAY1);
for (let i = 0; i < INITIAL_ARRAY2.length; ++i) {
    INITIAL_ARRAY2[i] = { a: 1, b: 2 };
}
deep_freeze_strict_1.default(INITIAL_ARRAY2);
const INITIAL_DEEP_ARRAY1 = deep_freeze_strict_1.default([0, 1, 2, INITIAL_ARRAY1, [5, 6, 7]]);
const INITIAL_DEEP_ARRAY2 = deep_freeze_strict_1.default([0, 1, 2, INITIAL_ARRAY2, [5, 6, 7]]);
const R = 5e5;
const W = R / 5;
function verify(suite, ignoreMutationError) {
    const results = [];
    function addResult(results, condition) {
        return results.push(condition ? chalk_1.default.green.bold('P') : chalk_1.default.green.red('F'));
    }
    let obj = suite.init(INITIAL_OBJECT);
    addResult(results, suite.get(obj, 'toggle') === false);
    results.push('-'); // 1
    let obj2 = suite.set(obj, 'toggle', true);
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { toggle: true }));
    }
    addResult(results, suite.get(obj, 'toggle') === false);
    addResult(results, suite.get(obj2, 'toggle') === true);
    addResult(results, obj2 !== obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    results.push('-'); // 2
    obj2 = suite.set(obj, 'str', 'foo');
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { str: 'foo' }));
    }
    addResult(results, obj2 === obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    results.push('-'); // 3
    obj2 = suite.setDeep(obj, 'd', 'd1', 3);
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { d: { d1: 3 } }));
    }
    addResult(results, suite.getDeep(obj, 'd', 'd1') === 6);
    addResult(results, suite.getDeep(obj2, 'd', 'd1') === 3);
    addResult(results, obj2 !== obj);
    addResult(results, suite.get(obj2, 'd') !== suite.get(obj, 'd'));
    addResult(results, suite.get(obj2, 'e') === suite.get(obj, 'e'));
    results.push('-'); // 4
    obj2 = suite.set(obj, 'b', suite.get(obj, 'b'));
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(INITIAL_OBJECT);
    }
    addResult(results, obj2 === obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    results.push('-'); // 5
    obj2 = suite.set(obj, 'str', 'bar');
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { str: 'bar' }));
    }
    addResult(results, obj2 !== obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    obj = suite.init(INITIAL_OBJECT);
    obj2 = suite.setDeep(obj, 'd', 'd1', 6);
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { d: { d1: 6 } }));
    }
    addResult(results, suite.getDeep(obj, 'd', 'd1') === 6);
    addResult(results, suite.getDeep(obj2, 'd', 'd1') === 6);
    addResult(results, obj2 === obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    results.push('-'); // 6
    obj2 = suite.setIn(obj, DEEP_PATH, 3);
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { d: { d9: { b: { b: { b: 3 } } } } }));
    }
    addResult(results, obj2 !== obj);
    addResult(results, suite.get(obj2, 'd') !== suite.get(obj, 'd'));
    addResult(results, suite.get(obj2, 'e') === suite.get(obj, 'e'));
    addResult(results, suite.getIn(obj, DEEP_PATH) === 1);
    addResult(results, suite.getIn(obj2, DEEP_PATH) === 3);
    results.push('-'); // 7
    obj2 = suite.merge(obj, {
        c: 5,
        f: null
    });
    if (!ignoreMutationError) {
        expect_1.default(obj).toEqual(INITIAL_OBJECT);
        expect_1.default(obj2).toEqual(_.merge(_.cloneDeep(INITIAL_OBJECT), { c: 5, f: null }));
    }
    addResult(results, obj2 !== obj);
    addResult(results, suite.get(obj2, 'd') === suite.get(obj, 'd'));
    addResult(results, suite.get(obj2, 'c') === 5);
    addResult(results, suite.get(obj2, 'f') === null);
    results.push('-'); // 8
    let arr = suite.initArr(INITIAL_ARRAY1);
    let arr2 = suite.setAt(arr, 1, {
        b: 3
    });
    if (!ignoreMutationError) {
        expect_1.default(arr).toEqual(INITIAL_ARRAY1);
        const expectedArr2 = _.cloneDeep(INITIAL_ARRAY1);
        expectedArr2[1] = { b: 3 };
        expect_1.default(arr2).toEqual(expectedArr2);
    }
    addResult(results, arr2 !== arr);
    addResult(results, suite.getAt(arr, 1).b === 2);
    addResult(results, suite.getAt(arr2, 1).b === 3);
    arr2 = suite.setAt(arr, 1, suite.getAt(arr, 1));
    if (!ignoreMutationError) {
        expect_1.default(arr).toEqual(INITIAL_ARRAY1);
        expect_1.default(arr2).toEqual(INITIAL_ARRAY1);
    }
    addResult(results, arr2 === arr);
    results.push('-'); // 9
    arr = suite.initArr(INITIAL_DEEP_ARRAY1);
    arr2 = suite.setAtDeep(arr, 3, 0, {
        b: 3
    });
    if (!ignoreMutationError) {
        expect_1.default(arr).toEqual(INITIAL_DEEP_ARRAY1);
        const expectedArr2 = _.cloneDeep(INITIAL_DEEP_ARRAY1);
        expectedArr2[3][0] = { b: 3 };
        expect_1.default(arr2).toEqual(expectedArr2);
    }
    addResult(results, arr2 !== arr);
    addResult(results, suite.get(suite.getAtDeep(arr, 3, 0), "b") === 2);
    addResult(results, suite.getAtDeep(arr2, 3, 0).b === 3);
    arr2 = suite.setAtDeep(arr, 3, 1, suite.getAtDeep(arr, 3, 1));
    if (!ignoreMutationError) {
        expect_1.default(arr).toEqual(INITIAL_DEEP_ARRAY1);
        expect_1.default(arr2).toEqual(INITIAL_DEEP_ARRAY1);
    }
    addResult(results, arr2 === arr);
    return console.log("  Verification: " + (results.join('')));
}
function runTestSuite(name, suite, ignoreMutationError = false) {
    console.log(chalk_1.default.bold('\n' + name));
    const output = {
        ['Total Elapsed']: 0,
        ['Total Read']: 0,
        ['Total Write']: 0,
    };
    function runTest(desc, cb) {
        const tic = Date.now();
        cb();
        const tac = Date.now();
        const elapsed = tac - tic;
        console.log(("  " + desc + ": ") + chalk_1.default.bold(elapsed + " ms"));
        output[desc] = elapsed;
        return elapsed;
    }
    let arr, obj;
    verify(suite, ignoreMutationError);
    obj = suite.init(INITIAL_OBJECT);
    let totalRead = 0;
    let totalWrite = 0;
    totalRead += runTest("Object: read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.get(obj, 'toggle');
            val;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    totalWrite += runTest("Object: write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const obj2 = suite.set(obj, 'b', j);
            obj2;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    totalRead += runTest("Object: deep read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getDeep(obj, 'd', 'd1');
            val;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    totalWrite += runTest("Object: deep write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const obj2 = suite.setDeep(obj, 'd', 'd1', j);
            obj2;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    totalRead += runTest("Object: very deep read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getIn(obj, DEEP_PATH);
            val;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    totalWrite += runTest("Object: very deep write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const obj2 = suite.setIn(obj, DEEP_PATH, j);
            obj2;
        }
    });
    obj = suite.init(INITIAL_OBJECT);
    const MERGE_OBJ = {
        c: 5,
        f: null
    };
    totalWrite += runTest("Object: merge (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const obj2 = suite.merge(obj, MERGE_OBJ);
            obj2;
        }
    });
    arr = suite.initArr(INITIAL_ARRAY1);
    totalRead += runTest("Small Array: read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getAt(arr, 1);
            val;
        }
    });
    arr = suite.initArr(INITIAL_ARRAY1);
    totalWrite += runTest("Small Array: write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const arr2 = suite.setAt(arr, 1, j);
            arr2;
        }
    });
    arr = suite.initArr(INITIAL_DEEP_ARRAY1);
    totalRead += runTest("Small Array: deep read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getAtDeep(arr, 3, 0);
            val;
        }
    });
    arr = suite.initArr(INITIAL_DEEP_ARRAY1);
    totalWrite += runTest("Small Array: deep write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const arr2 = suite.setAtDeep(arr, 3, 0, j);
            arr2;
        }
    });
    arr = suite.initArr(INITIAL_ARRAY2);
    totalRead += runTest("Large Array: read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getAt(arr, 1);
            val;
        }
    });
    arr = suite.initArr(INITIAL_ARRAY2);
    totalWrite += runTest("Large Array: write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const arr2 = suite.setAt(arr, 1, j);
            arr2;
        }
    });
    arr = suite.initArr(INITIAL_DEEP_ARRAY2);
    totalRead += runTest("Large Array: deep read (x" + R + ")", function () {
        for (let j = 0; j < R; ++j) {
            const val = suite.getAtDeep(arr, 3, 0);
            val;
        }
    });
    arr = suite.initArr(INITIAL_DEEP_ARRAY2);
    totalWrite += runTest("Large Array: deep write (x" + W + ")", function () {
        for (let j = 0; j < W; ++j) {
            const arr2 = suite.setAtDeep(arr, 3, 0, j);
            arr2;
        }
    });
    const totalElapsed = totalRead + totalWrite;
    console.log("Total elapsed = " + totalRead + " ms (read) + " + totalWrite + " ms (write) = " + totalElapsed + " ms.");
    output['Total Elapsed'] = totalElapsed;
    output['Total Read'] = totalRead;
    output['Total Write'] = totalWrite;
    return output;
}
exports.runTestSuite = runTestSuite;
