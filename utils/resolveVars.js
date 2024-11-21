require('dotenv').config();

function resolveVars(inputString) {
  return inputString.replace(/\${(.*?)}/g, (match, varName) => {
    switch (varName) {
      case 'PL_INSTANCE':
        return process.env.PL_INSTANCE || match;
      case 'LOCAL_USER':
        return process.env.LOCAL_USER || match;
      case 'LOCAL_PASSWORD':
        return process.env.LOCAL_PASSWORD || match;
      default:
        return match;
    }
  });
}

module.exports = { resolveVars };
