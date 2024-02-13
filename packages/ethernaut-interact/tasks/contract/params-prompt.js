const loadAbi = require('./load-abi');
const debug = require('common/debug');
const prompt = require('common/prompt');

module.exports = async function ({ abi, fn }) {
  if (!abi) return;

  try {
    const _abi = loadAbi(abi);

    const fnName = fn.split('(')[0];
    const abiFn = _abi.find((abiFn) => abiFn.name === fnName);

    let params = [];
    for (const input of abiFn.inputs) {
      const response = await prompt({
        type: 'input',
        message: `Enter ${input.name} (${input.type})`,
      });

      params.push(response);
    }

    return params.join(',');
  } catch (err) {
    debug.log(err, 'interact');
  }
};
