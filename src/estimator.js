const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  const {
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation  },
    periodType,
    reportedCases
    /* totalHospitalBeds */
  } = data;

  let { timeToElapse } = data;
  if (periodType === 'months') {
    timeToElapse = Math.trunc(timeToElapse * 30);
  } else if (periodType === 'weeks') {
    timeToElapse = Math.trunc(timeToElapse * 7);
  } else {
    timeToElapse = Math.trunc(timeToElapse * 1);
  }

  // InfectionsByRequestedTime
  const calculateInfectionsByElapsedTime = (currentlyInfected) => {
    const factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };
  // the best case estimation
  const impact = {};
  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByElapsedTime(
    impact.currentlyInfected
  );


  // the severe case estimation
  const severeImpact = {};
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByElapsedTime(
    severeImpact.currentlyInfected
  );
  
  return {
    data, // the input data you got
    impact, // your best case estimation
    severeImpact // your severe case estimation
  };
};
export default covid19ImpactEstimator;
