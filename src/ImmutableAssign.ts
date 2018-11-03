import { TestSuite } from '../lib/TestSuite';

import * as iassign from 'immutable-assign';

export class ImmutableAssign extends TestSuite {
  constructor(useFreeze: boolean) {
    super(useFreeze);
  }
  
  set(obj, key, val) {
    // Paul Note
    if (obj[key] === val) {
      return obj;
    }
    
    return iassign(
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
    
    return iassign(
      obj,
      (obj, ctx) => obj[ctx.key1],
      oKey1=> {
        oKey1[key2] = val;
        return oKey1;
      },
      { key1: key1 },
    );
  }
      
  setIn(obj, path, val) {
    // Paul Note
    var keyText = "";
    for (var i = 0; i < path.length; i++) {
      keyText += "['" + path[i] + "']";
    }
    
    return iassign(
      obj,
      new Function('obj', 'ctx', 'return obj' + keyText) as any,
      prop => {
        prop = val;
        return prop;
      },
    );
  }

  merge(obj1, obj2) {
    return iassign(
      obj1,
      obj1 => {
        for (var key in obj2) {
          obj1[key] = obj2[key];
        }
        return obj1;
      },
    );
  }
          
  setAt(arr, idx, val) {
    // Paul Note
    if (arr[idx] === val) {
      return arr;
    }
    
    return iassign(
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
    
    return iassign(
      arr,
      (arr, ctx) => arr[ctx.idx1][ctx.idx2],
      () => val,
      {
        idx1: idx1,
        idx2: idx2
      },
    );
  }
}
