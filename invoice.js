const createCalculator = require('./createCalculator');

module.exports = class Invoice {
  constructor(props) {
    Object.assign(this, props);
  }

  getTotalAmount(plays) {
    let totalAmount = 0;
    for (let perf of this.performances) {
      const play = plays[perf.playID];
      let thisAmount = 0;
      thisAmount = createCalculator(play.type).getAmount(perf);
      totalAmount += thisAmount;
    }
    return totalAmount;
  }

  getVolumeCredits(plays) {
    let volumeCredits = 0;
    for (let perf of this.performances) {
      const play = plays[perf.playID];
      volumeCredits += createCalculator(play.type).getVolumeCredits(perf);
    }
    return volumeCredits;
  }
};
