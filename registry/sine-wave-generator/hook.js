const NormalSdk = require("@normalframework/applications-sdk");

async function getValue(points, label) {
  const point = points.byLabel(label).first();
  if (point) {
    const [value] = await point.read();
    return value.value ?? 0;
  } else {
    return 0;
  }
}

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, sdk, groupVariables }) => {
  const pi = Math.PI;
  sdk.timeManager.advance();

  const amplitude = await getValue(points, "amplitude");
  const freqHz = await getValue(points, "freqHz");
  const phase = await getValue(points, "phase");
  const offset = await getValue(points, "offset");
  const startTime = await getValue(points, "startTime");
  const currentTime = sdk.timeManager.last / 1000;

  let y;
  if (currentTime < startTime) {
    y = offset;
  } else {
    y = offset + amplitude * Math.sin(2 * pi * freqHz * (currentTime - startTime) + phase);
  }

  await groupVariables.byLabel("out").first().write(y);
};
