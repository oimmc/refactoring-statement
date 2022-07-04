
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
    case 'tragedy':
      thisAmount = getTragedyAmount(perf);
      break;
    case 'comedy':
      thisAmount = getComedyAmount(perf);
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
    }
    if ('tragedy' === play.type) {
      volumeCredits += getTragedyVolumeCredits(perf);
    }
    if ('comedy' === play.type) {
      volumeCredits += getComedyVolumeCredits(perf)
    }
    result += `  ${play.name}: ${formatUSD(thisAmount)} (${ perf.audience } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${formatUSD(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

module.exports = statement;

function formatUSD (number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function getComedyVolumeCredits (perf) {
  return Math.max(perf.audience - 30, 0) + Math.floor(perf.audience / 5);
}

function getTragedyVolumeCredits(perf) {
  return Math.max(perf.audience - 30, 0);
}

function getComedyAmount(perf) {
  let result = 30000;
  if (perf.audience > 20) {
    result += 10000 + 500 * (perf.audience - 20);
  }
  result += 300 * perf.audience;
  return result;
}

function getTragedyAmount(perf) {
  let result = 40000;
  if (perf.audience > 30) {
    result += 1000 * (perf.audience - 30);
  }
  return result;
}

