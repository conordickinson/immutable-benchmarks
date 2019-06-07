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
const deep_freeze_strict_1 = __importDefault(require("deep-freeze-strict"));
const _ = __importStar(require("lodash"));
class TestSuite {
    constructor(useFreeze) {
        this.useFreeze = useFreeze;
    }
    init(initialObject) {
        var obj = _.cloneDeep(initialObject);
        if (this.useFreeze) {
            obj = deep_freeze_strict_1.default(obj);
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
            obj = deep_freeze_strict_1.default(obj);
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
