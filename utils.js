const stringifyObject = (object) => {
  return Object.entries(object).reduce((str, [key, val]) => {
    return (str += `${key}=${val}\n`);
  }, '');
};

module.exports = { stringifyObject }
