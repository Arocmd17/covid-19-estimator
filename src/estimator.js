const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input, // the input data you got
    impact: input.reportedCases * 10 * 2 ** 9, // your best case estimation
    severeImpact: input.reportedCases * 50 * 2 ** 9 // your severe case estimation 
  };
};
export default covid19ImpactEstimator;
