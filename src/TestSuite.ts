import * as deepFreeze from 'deep-freeze-strict';
import * as _ from 'lodash';

export abstract class TestSuite {
  constructor(readonly useFreeze: boolean) {
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

  abstract set(obj, key, val);

  getDeep(obj, key1, key2) {
    return obj[key1][key2];
  }

  abstract setDeep(obj, key1, key2, val);

  getIn(obj, path: Readonly<any[]>) {
    let out = obj;
    let key;
    for (let j = 0, len = path.length; j < len; j++) {
      key = path[j];
      out = out[key];
    }
    return out;
  }

  abstract setIn(obj, path, val);

  abstract merge(obj1, obj2);

  initArr(initialArray) {
    var obj = _.cloneDeep(initialArray);
    if (this.useFreeze) {
      obj = deepFreeze(obj);
    }
    return obj;
  }

  getAt(arr: Readonly<any[]>, idx: number) {
    return arr[idx];
  }

  abstract setAt(arr: Readonly<any[]>, idx: number, val: any);

  getAtDeep(arr: Readonly<any[][]>, idx1: number, idx2: number) {
    return arr[idx1][idx2];
  }

  abstract setAtDeep(arr: Readonly<any[][]>, idx1: number, idx2: number, val: any);
}
