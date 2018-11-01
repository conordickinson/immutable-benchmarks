import { TestSuite } from './TestSuite';

import * as timm from 'timm';

export class TimmLib extends TestSuite {
  constructor() {
    super(false);
  }
  
  set(obj, key, val) {
    return timm.set(obj, key, val);
  }
  
  setDeep(obj, key1, key2, val) {
    return timm.set(obj, key1, timm.set(obj[key1], key2, val));
  }
  
  setIn(obj, path, val) {
    return timm.setIn(obj, path, val);
  }
  
  merge(obj1, obj2) {
    return timm.merge(obj1, obj2);
  }
  
  setAt(arr, idx, val) {
    return timm.replaceAt(arr, idx, val);
  }
  
  setAtDeep(arr, idx1, idx2, val) {
    return timm.replaceAt(arr, idx1, timm.replaceAt(arr[idx1], idx2, val));
  }
}
