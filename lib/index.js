module.exports = (name, options) => {
  if (typeof name !== "string") throw new TypeError("Expected a string,  got ");
  options = Object.assign({}, options);

  return "ddd";
};
