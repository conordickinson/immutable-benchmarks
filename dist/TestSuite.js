"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepFreeze = require("deep-freeze-strict");
const _ = require("lodash");
class TestSuite {
    constructor(useFreeze) {
        this.useFreeze = useFreeze;
    }
    init(initialObject) {
        var obj = _.cloneDeep(initialObject);
        if (this.useFreeze) {
            obj = deepFreeze(obj);
        }
        return obj;
    }
    get(obj, key) {
        return obj[key];
    }
    getDeep(obj, key1, key2) {
        return obj[key1][key2];
    }
    getIn(obj, path) {
        let out = obj;
        let key;
        for (let j = 0, len = path.length; j < len; j++) {
            key = path[j];
            out = out[key];
        }
        return out;
    }
    initArr(initialArray) {
        var obj = _.cloneDeep(initialArray);
        if (this.useFreeze) {
            obj = deepFreeze(obj);
        }
        return obj;
    }
    getAt(arr, idx) {
        return arr[idx];
    }
    getAtDeep(arr, idx1, idx2) {
        return arr[idx1][idx2];
    }
}
exports.TestSuite = TestSuite;
