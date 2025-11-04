const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk }) => {
  const pi = Math.PI;

  const amplitude = points.byLabel("amplitude").first();
  const freqHz = points.byLabel("frequency").first();
  const phase = points.byLabel("phase").first();
  const offset = points.byLabel("offset").first();

  return () => {
    const currentTime = sdk.TimeManager.time;
    let y;

    if (currentTime < startTime) {
      y = offset;
    } else {
      y = offset + amplitude * Math.sin(2 * pi * freqHz * (currentTime - startTime) + phase);
    }

    return { y };
  };
};
