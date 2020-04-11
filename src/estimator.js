const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71,
  },
  periodType: 'days',
  timeToElapse: 19.7,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614,
};

function periodType(data) {
  switch (data.periodType) {
    case 'days':
      return Math.ceil(data.timeToElapse / 3);
    case 'weeks':
      return Math.ceil(data.timeToElapse / 3) * 7;
    case 'months':
      return Math.ceil(data.timeToElapse / 3) * 30;
    default:
      return 'NIL';
      break;
  }
}
const covid19ImpactEstimator = (data) => {
  const infectionsByRequestedTime = periodType(data);
  // const input = data;
  const impact = data.reportedCases * 10 * 2 ** infectionsByRequestedTime;
  const severeImpact = data.reportedCases * 50 * 2 ** infectionsByRequestedTime;
  return {
    data, // the input data you got
    impact, // your best case estimation
    severeImpact // your severe case estimation 
  };
};
export default covid19ImpactEstimator;
