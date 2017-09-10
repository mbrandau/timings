# timings

Monitor the time you spent on certain tasks.

## Usage

Install and save the package to your project using `npm i --save timings`

1. Require it using `const timings = require('timings');`
2. Create a tracker by calling `const myAwesomeTracker = timings();`
3. Get the time difference between calls `let diff = myAwesomeTracker();`

```js
const timings = require('timings');

const tracker1 = timings(); // Create a new tracker
const tracker2 = timings(); // Create another tracker

let avgTime = 0;

tracker1(); // Set tracker to start here
for (let i = 0; i < runs; i++) {
  tracker2();
  myTimeConsumingTask();
  avgTime += tracker2();
}
console.log('Loop finished in ${tracker1()}ms'); // Get the time difference to last tracker1() call
// Example output: Loop finished in 7470.15955ms

avgTime /= 1000;
console.log('Average time was ${avgTime}ms');
// Example output: Average time was 7.436942545999994ms
```
