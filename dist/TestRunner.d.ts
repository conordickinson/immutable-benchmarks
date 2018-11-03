import { TestSuite } from './TestSuite';
export interface Outputs {
    [k: string]: number;
}
export declare function runTestSuite(name: string, suite: TestSuite, ignoreMutationError?: boolean): Outputs;
