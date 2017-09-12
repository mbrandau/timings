# @mbrandau/timings

[![Build Status](https://img.shields.io/travis/mbrandau/timings.svg)](https://travis-ci.org/mbrandau/timings) [![David](https://img.shields.io/david/mbrandau/timings.svg)](https://david-dm.org/mbrandau/timings) [![Coveralls](https://img.shields.io/coveralls/mbrandau/timings.svg)](https://coveralls.io/github/mbrandau/timings) [![GitHub issues](https://img.shields.io/github/issues/mbrandau/timings.svg)](https://github.com/mbrandau/timings/issues)

Monitor the time you spent on certain tasks.

## Usage

Install and save the package to your project using `npm i --save @mbrandau/timings`

### Requiring the package
```js
const timings = require('@mbrandau/timings');
```

### Creating a tracker
```js
const basicTracker = timings(); // Create a new tracker
const namedTracker = timings('myTracker'); // Create another tracker with a name to save the times
```

### Basic usage
```js
basicTracker(); // Call the tracker method each time you want to start to track a duration
myTimeConsumingTask();
const duration = basicTracker(); // Get the time difference to last basicTracker() call in milliseconds

console.log(`Loop finished in ${duration}ms`);
```

### Saving the times and get average values
```js
for (let i = 0; i < 1000; i++) {
  namedTracker();
  myTimeConsumingTask();
  namedTracker('myTimeConsumingTask'); // By calling the tracker method of a named tracker
                                       // with a item name, the duration will be saved
                                       // and put into an array with all the other durations
                                       // of the same tracker and item name to calculate
                                       // average values.
}

const avgResult = timings.getAverage('myTracker', 'myTimeConsumingTask');

console.log(`Average duration was ${avgResult.average}ms based on ${avgResult.times} collected durations`);
```

## Documentation

### timings.getTimings(trackerName, itemName)

Returns an array of collected durations of the specific item.

#### Usage example
```js
const durations = timings.getTimings('myTracker', 'myTimeConsumingTask');
```

### timings.getAverage(trackerName, itemName)

Returns an object with the properties `times` and `average`.

#### Usage example
```js
const result = timings.getAverage('myTracker', 'myTimeConsumingTask');

// result:
{
  times: 1000, // Amount of durations used to calculate the average value
  average: 648.19489136 // The average value of all used durations in milliseconds
}
```
