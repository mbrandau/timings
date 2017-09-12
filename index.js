module.exports = createTracker;
module.exports.getTimings = getTimings;
module.exports.getAverage = getAverage;

const timings = {};

function createTracker(trackerName) {
  let startTime = process.hrtime();
  let lastTime = undefined;
  return function(itemName) {
    const diff = process.hrtime(lastTime || startTime);
    lastTime = process.hrtime();
    const diffMillis = diff[0] * 1e3 + diff[1] / 1e6;

    if (trackerName && itemName) {
      if (timings[trackerName]) {
        if (!timings[trackerName][itemName]) timings[trackerName][itemName] = [diffMillis];
        else timings[trackerName][itemName].push(diffMillis);
      } else {
        timings[trackerName] = {};
        timings[trackerName][itemName] = [diffMillis];
      }
    }

    return diffMillis;
  };
}

function getTimings(tracker, item) {
  if (tracker) {
    if (item) return timings[tracker][item];
    return timings[tracker];
  }
  return timings;
}

function getAverage(tracker, item) {
  if (!timings[tracker] || !timings[tracker][item]) return null;
  let avg = 0;
  const array = timings[tracker][item];
  for (var i = 0; i < array.length; i++) avg += array[i];
  return {
    times: array.length,
    average: avg / array.length
  };
}
