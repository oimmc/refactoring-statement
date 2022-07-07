const TragedyCalculator = require("./tragedyCalculator");
const ComedyCalculator = require("./comedyCalculator");

module.exports = function createCalculator(type) {
  let calcultor;
  switch (type) {
    case "tragedy":
      calcultor = new TragedyCalculator;
      break;
    case "comedy":
      calcultor = new ComedyCalculator;
      break;
    default:
      throw new Error(`unknown type: ${type}`);
  }
  return calcultor;
}