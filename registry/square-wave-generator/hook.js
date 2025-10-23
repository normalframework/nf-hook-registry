const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk }) => {
  for (const point of points) {
    let newval = point.latestValue.value ? 0 : 1;
    sdk.logEvent(`setting value of ${point.name} to ${newval}`)
    await point.write(newval)
  }
};
