
// Estimator
const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  const {
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation },
    periodType,
    reportedCases,
    totalHospitalBeds
  } = data;
  let { timeToElapse } = data;
  // normalize days; check for weeks and months if used
  if (periodType === 'months') {
    timeToElapse = Math.trunc(timeToElapse * 30);
  } else if (periodType === 'weeks') {
    timeToElapse = Math.trunc(timeToElapse * 7);
  } else {
    timeToElapse = Math.trunc(timeToElapse * 1);
  }
  // calculate InfectionsByElapsedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
    const factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };
  // calculate AvailableBeds
  const calculateAvailableBeds = (severeCasesByRequestedTime) => {
    const bedsAvailable = totalHospitalBeds * 0.35;
    const result = bedsAvailable;
    return Math.trunc(result - severeCasesByRequestedTime);
  };
  // calculate dollarsInFlight
  const calculateDollarsInFlight = (infectionsByRequestedTime) => {
    const infections = infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation;
    const result = infections / timeToElapse;
    return Math.trunc(result);
  };
  const impact = {};
  const severeImpact = {};
  // challenge one
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    impact.currentlyInfected); // the best case estimation
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    severeImpact.currentlyInfected); // the severe case estimation
  // challenge two
  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15); // Round up the outcome
  impact.hospitalBedsByRequestedTime = calculateAvailableBeds(
    impact.severeCasesByRequestedTime); // the best case estimation
   severeImpact.severeCasesByRequestedTime = Math.trunc(
     severeImpact.infectionsByRequestedTime * 0.15); // Round up the outcome
  severeImpact.hospitalBedsByRequestedTime = calculateAvailableBeds(
    severeImpact.severeCasesByRequestedTime); // the severe case estimation
  // challenge three
  impact.casesForICUByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.05); // Round up the outcome
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.02); // Round up the outcome
  impact.dollarsInFlight = calculateDollarsInFlight(
    impact.infectionsByRequestedTime); // the best case estimation
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05); // Round up the outcome
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02); // Round up the outcome
  severeImpact.dollarsInFlight = calculateDollarsInFlight(
    severeImpact.infectionsByRequestedTime); // the severe case estimation
  return {
    data, // the input data you got
    impact, // your best case estimation
    severeImpact // your severe case estimation
  };
}
export default covid19ImpactEstimator;