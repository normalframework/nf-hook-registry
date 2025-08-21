const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk }) => {
  let point = points[0]
  let newval = point.latestValue.value ? 0 : 1;
  sdk.logEvent(`setting value to ${newval}`)
  await point.write(newval)
};
