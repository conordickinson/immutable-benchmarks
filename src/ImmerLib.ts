import { TestSuite } from '../lib/TestSuite';

import * as immer from 'immer';

const produce = immer.default;

export class ImmerLib extends TestSuite {
  constructor(useFreeze: boolean) {
    super(useFreeze);
  }

  init(initialObject) {
    immer.setAutoFreeze(this.useFreeze);
    return super.init(initialObject);
  }
  
  set(obj, key, val) {
    // Paul Note
    if (obj[key] === val) {
      return obj;
    }

    return produce(
      obj,
      obj => {
        obj[key] = val;
        return obj;
      },
    );
  }
  
  setDeep(obj, key1, key2, val) {
    // Paul Note
    if (obj[key1][key2] === val) {
      return obj;
    }

    return produce(
      obj,
      obj => {
        obj[key1][key2] = val;
        return obj;
      },
    );
  }
  
  setIn(obj, path, val) {
    return produce(obj, obj => {
      let ptr = obj;
      for (let idx = 0, j = 0, ref1 = path.length - 1; 0 <= ref1 ? j < ref1 : j > ref1; idx = 0 <= ref1 ? ++j : --j) {
        ptr = ptr[path[idx]];
      }
      ptr[path[path.length - 1]] = val;
    });
  }
  
  merge(obj1, obj2) {
    return produce(
      obj1,
      obj1 => {
        for (const key in obj2) {
          obj1[key] = obj2[key];
        }
        return obj1;
      },
    );
  }
  
  setAt(arr, idx, val) {
    // Paul Note
    if (arr[idx] === val)
      return arr;

    return produce(
      arr,
      arr => {
        arr[idx] = val;
        return arr;
      },
    );
  }
  
  setAtDeep(arr, idx1, idx2, val) {
    if (arr[idx1][idx2] === val) {
      return arr;
    }

    return produce(
      arr,
      arr => {
        arr[idx1][idx2] = val;
        return arr;
      },
    );
  }
}
