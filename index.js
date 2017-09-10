module.exports = init;

function init() {
  let startTime = process.hrtime();
  let lastTime = undefined;
  return function() {
    const diff = process.hrtime(lastTime || startTime);
    lastTime = process.hrtime();
    return diff[0] * 1e3 + diff[1] / 1e6;
  };
}
