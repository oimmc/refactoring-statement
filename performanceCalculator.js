module.exports = class PerformanceCalculator {
  getAmount(perf) {
  }
  getVolumeCredits(perf) {
    return Math.max(perf.audience - 30, 0);
  }
}