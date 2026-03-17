export const calculateVulnerabilityDensity = (vulnerabilities, lines) => {
  if (lines === 0) return 0;

  return vulnerabilities / (lines / 1000);
};

export function calculateTDI(complexity, vulnerabilityDensity) {
  return complexity * 0.5 + vulnerabilityDensity * 0.5;
}
export default calculateVulnerabilityDensity;
