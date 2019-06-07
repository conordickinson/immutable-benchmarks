import { runTestSuite, Outputs } from '../lib/TestRunner';
import { ImmerLib } from './ImmerLib';
import { ImmutableAssign } from './ImmutableAssign';
import { ImmutableJS } from './ImmutableJS';
import { Mutable } from './Mutable';
import { ObjectAssign } from './ObjectAssign';
import { SeamlessLib } from './SeamlessLib';
import { SimplyImmutable } from './SimplyImmutable';
import { TimmLib } from './TimmLib';

import * as fs from 'fs';
import * as path from 'path';

const output: Record<string, Outputs> = {};
output['Mutable'] = runTestSuite('Mutable', new Mutable(), true);
output['Object.assign'] = runTestSuite('Object.assign', new ObjectAssign(false));
output['simply-immutable'] = runTestSuite('simply-immutable', new SimplyImmutable(false));
output['immutable-assign'] = runTestSuite('immutable-assign', new ImmutableAssign(false));
output['immer'] = runTestSuite('immer', new ImmerLib(false));
output['immutable.js'] = runTestSuite('immutable.js', new ImmutableJS(), true);
output['seamless-immutable'] = runTestSuite('seamless-immutable', new SeamlessLib());
output['timm'] = runTestSuite('timm', new TimmLib());

// Deep freeze
output['freeze:Object.assign'] = runTestSuite('freeze:Object.assign', new ObjectAssign(true));
output['freeze:simply-immutable'] = runTestSuite('freeze:simply-immutable', new SimplyImmutable(true));
output['freeze:immutable-assign'] = runTestSuite('freeze:immutable-assign', new ImmutableAssign(true));
output['freeze:immer'] = runTestSuite('freeze:immer', new ImmerLib(true));

// output TSV
const solutions = Object.keys(output);
solutions.sort((key1, key2) => {
  return output[key1]['Total Elapsed'] - output[key2]['Total Elapsed'];
});

const headerRow = [''].concat(Object.keys(output[solutions[0]]));
const rows = [ headerRow ].concat(solutions.map(solutionKey => {
  return [solutionKey].concat(Object.values(output[solutionKey]).map(v => v.toString()));
}));

fs.writeFileSync(path.join(__dirname, '../results/results.csv'), rows.map(r => r.join('\t')).join('\n'));
