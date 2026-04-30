export const detectLanguage = (code) => {
  if (!code || typeof code !== 'string') return "Unknown";

  // 1. Initialize the massive scoreboard
  const scores = {
    "JavaScript/TypeScript": 0,
    Python: 0,
    Java: 0,
    "C/C++": 0,
    SQL: 0,
    Go: 0,
    Rust: 0,
    Ruby: 0,
    PHP: 0,
    Swift: 0,
    Kotlin: 0,
    HTML: 0,
  };

  // 2. JavaScript / TypeScript Clues
  scores["JavaScript/TypeScript"] += (code.match(/import\s+.*from\s+['"]/g) || []).length * 3;
  scores["JavaScript/TypeScript"] += (code.match(/const\s+\w+\s*=\s*\(?.*\)?\s*=>/g) || []).length * 3;
  scores["JavaScript/TypeScript"] += (code.match(/console\.log\(/g) || []).length * 2;
  scores["JavaScript/TypeScript"] += (code.match(/let\s+\w+\s*=/g) || []).length * 2;
  scores["JavaScript/TypeScript"] += (code.match(/interface\s+\w+\s*\{/g) || []).length * 3; // TS specific

  // 3. Python Clues
  scores.Python += (code.match(/def\s+\w+\s*\(/g) || []).length * 3;
  scores.Python += (code.match(/print\(/g) || []).length * 2;
  scores.Python += (code.match(/import\s+[a-zA-Z0-9_]+\n/g) || []).length * 2;
  scores.Python += (code.match(/elif\s+.*:/g) || []).length * 3;
  scores.Python += (code.match(/__init__/g) || []).length * 3;

  // 4. Java Clues
  scores.Java += (code.match(/public\s+class\s+\w+/g) || []).length * 3;
  scores.Java += (code.match(/System\.out\.println/g) || []).length * 3;
  scores.Java += (code.match(/public\s+static\s+void\s+main/g) || []).length * 5; 
  scores.Java += (code.match(/String\[\]\s+args/g) || []).length * 3;

  // 5. C / C++ Clues
  scores["C/C++"] += (code.match(/#include\s*<.*>/g) || []).length * 4;
  scores["C/C++"] += (code.match(/int\s+main\s*\(/g) || []).length * 3;
  scores["C/C++"] += (code.match(/std::cout/g) || []).length * 3;
  scores["C/C++"] += (code.match(/printf\(/g) || []).length * 2;

  // 6. SQL Clues
  scores.SQL += (code.match(/SELECT\s+.*FROM/gi) || []).length * 3;
  scores.SQL += (code.match(/INSERT\s+INTO/gi) || []).length * 3;
  scores.SQL += (code.match(/UPDATE\s+.*\s+SET/gi) || []).length * 3;

  // 7. Go Clues
  scores.Go += (code.match(/package\s+[a-z]+/g) || []).length * 4;
  scores.Go += (code.match(/func\s+\w+\s*\(/g) || []).length * 3;
  scores.Go += (code.match(/fmt\.Print/g) || []).length * 3;
  scores.Go += (code.match(/err\s*!=\s*nil/g) || []).length * 3; // The classic Go error check

  // 8. Rust Clues
  scores.Rust += (code.match(/fn\s+\w+\s*\(/g) || []).length * 3;
  scores.Rust += (code.match(/let\s+mut\s+/g) || []).length * 3;
  scores.Rust += (code.match(/println!/g) || []).length * 4;
  scores.Rust += (code.match(/use\s+std::/g) || []).length * 3;

  // 9. Ruby Clues
  scores.Ruby += (code.match(/def\s+\w+/g) || []).length * 2; // Shared with Python, lower points
  scores.Ruby += (code.match(/\bend\b/g) || []).length * 1;
  scores.Ruby += (code.match(/puts\s+/g) || []).length * 3;
  scores.Ruby += (code.match(/require\s+['"]/g) || []).length * 3;

  // 10. PHP Clues
  scores.PHP += (code.match(/<\?php/g) || []).length * 5; // Guaranteed PHP
  scores.PHP += (code.match(/\$[a-zA-Z_]+/g) || []).length * 1; // PHP variables start with $
  scores.PHP += (code.match(/echo\s+/g) || []).length * 3;

  // 11. Swift Clues
  scores.Swift += (code.match(/import\s+(Foundation|UIKit|SwiftUI)/g) || []).length * 4;
  scores.Swift += (code.match(/func\s+\w+\s*\(/g) || []).length * 2;
  scores.Swift += (code.match(/let\s+\w+\s*:/g) || []).length * 2;
  scores.Swift += (code.match(/guard\s+let/g) || []).length * 3;

  // 12. Kotlin Clues
  scores.Kotlin += (code.match(/fun\s+\w+\s*\(/g) || []).length * 4;
  scores.Kotlin += (code.match(/val\s+\w+\s*:/g) || []).length * 2;
  scores.Kotlin += (code.match(/println\(/g) || []).length * 1;

  // 13. HTML Clues
  scores.HTML += (code.match(/<!DOCTYPE html>/gi) || []).length * 5;
  scores.HTML += (code.match(/<div|<\/div>/gi) || []).length * 2;
  scores.HTML += (code.match(/className=|class=/gi) || []).length * 1;

  // Calculate the winner
  let detectedLang = "Unknown";
  let maxScore = 0;

  for (const [lang, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang;
    }
  }

  // If the max score is extremely low (less than 2), it means it's likely just plain text or a log file
  return maxScore >= 2 ? detectedLang : "Unknown";
};