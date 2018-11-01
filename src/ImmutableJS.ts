import * as Immutable from 'immutable';
import { TestSuite } from './TestSuite';

export class ImmutableJS extends TestSuite {
  constructor() {
    super(false);
  }
  
  init(initialObject) {
    return Immutable.fromJS(initialObject);
  }

  get(obj, key) {
    return obj.get(key);
  }

  set(obj, key, val) {
    return obj.set(key, val);
  }

  getDeep(obj, key1, key2) {
    return obj.getIn([key1, key2]);
  }

  setDeep(obj, key1, key2, val) {
    return obj.setIn([key1, key2], val);
  }

  getIn(obj, path) {
    return obj.getIn(path);
  }

  setIn(obj, path, val) {
    return obj.setIn(path, val);
  }

  merge(obj1, obj2) {
    return obj1.merge(obj2);
  }

  initArr(initialArray) {
    return Immutable.fromJS(initialArray);
  }

  getAt(arr, idx) {
    return arr.get(idx);
  }

  setAt(arr, idx, val) {
    return arr.set(idx, val);
  }

  getAtDeep(arr, idx1, idx2) {
    return arr.getIn([idx1, idx2]);
  }

  setAtDeep(arr, idx1, idx2, val) {
    return arr.setIn([idx1, idx2], val);
  }
}
