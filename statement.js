const TragedyCalculator = require('./TragedyCalculator');
const ComedyCalculator = require('./ComedyCalculator');

function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  result += getPerformancesDetails(invoice, plays);
  result += `Amount owed is ${formatUSD(getTotalAmount(invoice, plays))}\n`;
  result += `You earned ${getVolumeCredits(invoice, plays)} credits\n`;
  return result;
}

module.exports = statement;

function getPerformancesDetails(invoice, plays) {
  let details = "";
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    let calcultor = createCalculator(play.type);
    thisAmount = calcultor.getAmount(perf);
    details += `  ${play.name}: ${formatUSD(thisAmount)} (${
      perf.audience
    } seats)\n`;
  }
  return details;
}

function createCalculator(type) {
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

function getTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    thisAmount = createCalculator(play.type).getAmount(perf);
    totalAmount += thisAmount;
  }
  return totalAmount;
}

function getVolumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    volumeCredits += createCalculator(play.type).getVolumeCredits(perf)
  }
  return volumeCredits;
}

function formatUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}
