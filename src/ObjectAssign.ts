import { TestSuite } from '../lib/TestSuite';

export class ObjectAssign extends TestSuite {
  constructor(useFreeze: boolean) {
    super(useFreeze);
  }
  
  set(obj, key, val) {
    if (obj[key] === val) {
      return obj;
    }
    
    obj = Object.assign({}, obj);
    obj[key] = val;
    return obj;
  }
  
  setDeep(obj, key1, key2, val) {
    if (obj[key1][key2] === val) {
      return obj;
    }
    
    obj = Object.assign({}, obj);
    obj[key1] = Object.assign({}, obj[key1]);
    obj[key1][key2] = val;
    return obj;
  }
  
  setIn(obj, path, val) {
    obj = Object.assign({}, obj);
    var prop = obj;
    for (var i = 0; i < path.length; ++i) {
      var pathPart = path[i];
      if (i < path.length - 1) {
        prop[pathPart] = Object.assign({}, prop[pathPart]);
        prop = prop[pathPart];
      }
      else {
        prop[pathPart] = val;
      }
    }
    
    return obj;
  }
  
  merge(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
  }
  
  setAt(arr, idx, val) {
    if (arr[idx] === val) {
      return arr;
    }
    
    arr = arr.slice(0);
    arr[idx] = val;
    return arr;
  }
  
  setAtDeep(arr, idx1, idx2, val) {
    if (arr[idx1][idx2] === val) {
      return arr;
    }
    
    arr = arr.slice(0);
    arr[idx1] = arr[idx1].slice(0);
    arr[idx1][idx2] = val;
    return arr;
  }
}
