export const calculateCyclomaticComplexity = (code) => {
  const keywords = ["if", "else if", "for", "while", "case", "catch"];

  let complexity = 1;

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");

    const matches = code.match(regex);

    if (matches) {
      complexity += matches.length;
    }
  });

  // handle logical operators separately
  const logicalOperators = code.match(/&&|\|\|/g);
  if (logicalOperators) {
    complexity += logicalOperators.length;
  }

  return complexity;
};
