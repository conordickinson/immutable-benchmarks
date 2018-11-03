import { TestSuite } from '../lib/TestSuite';

export class Mutable extends TestSuite {
  constructor() {
    super(false); // override useFreeze
  }
  
  set(obj, key, val) {
    obj[key] = val;
    return obj;
  }
  
  setDeep(obj, key1, key2, val) {
    obj[key1][key2] = val;
    return obj;
  }
  
  setIn(obj, path, val) {
    let idx, j, ptr, ref1;
    ptr = obj;
    for (idx = j = 0, ref1 = path.length - 1; 0 <= ref1 ? j < ref1 : j > ref1; idx = 0 <= ref1 ? ++j : --j) {
        ptr = ptr[path[idx]];
    }
    ptr[path[path.length - 1]] = val;
    return obj;
  }
  
  merge(obj1, obj2) {
    const ref1 = Object.keys(obj2);
    const results1: any[] = [];
    for (let j = 0, len = ref1.length; j < len; j++) {
      const key = ref1[j];
      results1.push(obj1[key] = obj2[key]);
    }
    return results1;
  }
  
  setAt(arr, idx, val) {
    arr[idx] = val;
    return arr;
  }
  
  setAtDeep(arr, idx1, idx2, val) {
    arr[idx1][idx2] = val;
    return arr;
  }
}
