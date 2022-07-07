const Invoice = require('./invoice');
const createCalculator = require('./createCalculator');

function statement(invoice, plays) {
  const invoiceInstance = new Invoice(invoice);
  let result = `Statement for ${invoiceInstance.customer}\n`;
  result += getPerformancesDetails(invoice, plays);
  result += `Amount owed is ${formatUSD(invoiceInstance.getTotalAmount(plays))}\n`;
  result += `You earned ${invoiceInstance.getVolumeCredits(plays)} credits\n`;
  return result;
}

module.exports = statement;

function getPerformancesDetails(invoice, plays) {
  let details = "";
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = createCalculator(play.type).getAmount(perf);
    details += `  ${play.name}: ${formatUSD(thisAmount)} (${
      perf.audience
    } seats)\n`;
  }
  return details;
}

function formatUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}
