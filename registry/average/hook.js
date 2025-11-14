const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({ points, groupVariables }) => {
  let sum = 0;
  for (const point of points) {
    const [val] = await point.read();
    sum += val.value;
  }
  const avg = sum / points.length;
  const out = groupVariables.byLabel('out').first();
  await out.write(avg);
};
