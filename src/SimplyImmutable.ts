import { modifyImmutable } from 'simply-immutable';
import { TestSuite } from './TestSuite';

export class SimplyImmutable extends TestSuite {
  constructor(useFreeze: boolean) {
    super(useFreeze);
  }
  
  set(obj, key, val) {
    return modifyImmutable(obj, [key], val);
  }
  
  setDeep(obj, key1, key2, val) {
    return modifyImmutable(obj, [key1, key2], val);
  }
  
  setIn(obj, path, val) {
    return modifyImmutable(obj, path, val);
  }
  
  merge(obj1, obj2) {
    const r = Object.assign({}, obj1, obj2);
    return modifyImmutable(obj1, [], r);
  }
  
  setAt(arr: any[], idx: number, val: any) {
    return modifyImmutable(arr, [idx], val);
  }
  
  setAtDeep(arr: any[][], idx1: number, idx2: number, val: any) {
    return modifyImmutable(arr, [idx1, idx2], val);
  }
}
