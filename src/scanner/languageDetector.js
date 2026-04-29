export const detectLanguage = (code) => {
  if (!code) return "Unknown";

  // JavaScript / React
  if (
    /import\s+.*from\s+['"]/i.test(code) ||
    /const\s+\w+\s*=\s*\(?.*\)?\s*=>/i.test(code)
  ) {
    return "JavaScript";
  }

  // Python
  if (/def\s+\w+\s*\(/i.test(code) || /import\s+\w+/i.test(code)) {
    return "Python";
  }

  // Java
  if (
    /public\s+class\s+\w+/i.test(code) ||
    /System\.out\.println/i.test(code)
  ) {
    return "Java";
  }

  // C / C++
  if (/#include\s*<.*>/i.test(code) || /int\s+main\s*\(/i.test(code)) {
    return "C/C++";
  }

  // SQL
  if (/SELECT\s+.*FROM/i.test(code)) {
    return "SQL";
  }

  return "Unknown";
};
