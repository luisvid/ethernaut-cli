const loadAbi = require('./load-abi');
const {
  getFunctionSignature,
  getPopulatedFunctionSignature,
} = require('../../internal/signatures');
const debug = require('common/debug');
const prompt = require('common/prompt');

module.exports = async function ({ abi }) {
  if (!abi) return;

  try {
    const _abi = loadAbi(abi);
    const isFunction = (fn) => fn.type === 'function';
    const abiFns = _abi.filter((el) => isFunction(el));
    const choices = abiFns.map((fn) => ({
      title: getPopulatedFunctionSignature(fn),
      value: getFunctionSignature(fn),
    }));

    return await prompt({
      type: 'autocomplete',
      message: 'Pick a function',
      limit: 15,
      choices,
    });
  } catch (err) {
    debug.log(err, 'interact');
  }
};
