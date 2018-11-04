# immutable-benchmark-lib

Based on the benchmarks in immutable-assign.

Provides a library to use in your own immutable project (see https://github.com/conordickinson/simply-immutable/benchmark), as well as running tests on a set of popular immutable libraries.

Look at results/results.csv to see the latest updated timing results.

Summarized data here:

|  | Total Elapsed | Total Read | Total Write |
| --- |
| Mutable | 119 | 69 | 50 |
| simply-immutable | 730 | 75 | 655 |
| timm | 1013 | 132 | 881 |
| Object.assign | 1382 | 73 | 1309 |
| immutable.js | 1482 | 486 | 996 |
| immutable-assign | 2414 | 71 | 2343 |
| immer | 5287 | 95 | 5192 |
| freeze:simply-immutable | 11947 | 165 | 11782 |
| freeze:Object.assign | 22349 | 147 | 22202 |
| freeze:immutable-assign | 32544 | 149 | 32395 |
| seamless-immutable | 33530 | 147 | 33383 |
| freeze:immer | 36483 | 147 | 36336 |
