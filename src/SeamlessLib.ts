import * as Seamless from '../node_modules/seamless-immutable/seamless-immutable.production.min';

import { TestSuite } from './TestSuite';

export class SeamlessLib extends TestSuite {
  constructor() {
    super(false);
  }
  
  init(initialObject) {
    return Seamless(initialObject);
  }

  set(obj, key, val) {
    return obj.set(key, val);
  }
  
  setDeep(obj, key1, key2, val) {
    return obj.setIn([key1, key2], val);
  }
  
  setIn(obj, path, val) {
    return obj.setIn(path, val);
  }
  
  merge(obj1, obj2) {
    return obj1.merge(obj2);
  }
  
  initArr(initialArray) {
    return Seamless(initialArray);
  }

  setAt(arr, idx, val) {
    return arr.set(idx, val);
  }
  
  setAtDeep(arr, idx1, idx2, val) {
    return arr.setIn([idx1, idx2], val);
  }
}
