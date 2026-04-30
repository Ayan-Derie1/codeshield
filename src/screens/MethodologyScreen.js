import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";

export const MethodologyScreen = ({ navigation }) => {
  // List of officially supported languages for the grid
  const supportedLanguages = [
    "JavaScript", "TypeScript", "Python", "Java", 
    "C / C++", "Rust", "Go", "PHP", 
    "Ruby", "Swift", "Kotlin", "Pascal"
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Standard Header */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Codeshield</Text>
        <View style={styles.headerRight}>
          <Pressable 
            onPress={() => navigation.navigate("Home")}
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          >
            <Text style={styles.headerLink}>Home</Text>
          </Pressable>
          <Pressable 
            onPress={() => navigation.navigate("Scan")}
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          >
            <Text style={styles.headerLink}>Analyse code</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContainer}>
          
          <Text style={styles.pageTitle}>ANALYSIS METHODOLOGY</Text>
          <Text style={styles.pageSubtitle}>
            CodeShield utilizes a secure, stateless architecture to evaluate source code in-memory. 
            Below are the core algorithms and heuristics driving our analysis engine.
          </Text>

          {/* Card 1: Cyclomatic Complexity */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Cyclomatic Complexity (V(G))</Text>
            <Text style={styles.cardText}>
              Developed by Thomas J. McCabe, this metric measures the number of linearly independent paths through a program's source code.
            </Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>V(G) = E - N + 2P</Text>
            </View>
            <Text style={styles.cardText}>
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>E</Text> = Edges | <Text style={{fontWeight: "bold", color: "#FFF"}}>N</Text> = Nodes | <Text style={{fontWeight: "bold", color: "#FFF"}}>P</Text> = Connected components
            </Text>
          </View>

          {/* Card 2: Vulnerability Density */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Vulnerability Density (VD)</Text>
            <Text style={styles.cardText}>
              Normalizes security red flags against the total size of the codebase for fair comparison.
            </Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>VD = ( Σv / LOC ) × 1000</Text>
            </View>
          </View>

          {/* Card 3: Technical Debt Index */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>3. Technical Debt Index (TDI)</Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>TDI = (V(G) × Wc) + (VD × Wv)</Text>
            </View>
            <Text style={styles.cardText}>
              <Text style={{color: "#4CAF50", fontWeight: "bold"}}>0-20:</Text> Low Risk | <Text style={{color: "#E6B800", fontWeight: "bold"}}>21-50:</Text> Medium | <Text style={{color: "#E53935", fontWeight: "bold"}}>51+:</Text> High
            </Text>
          </View>

          {/* NEW Card 4: Language Support */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>4. Language Coverage</Text>
            <Text style={styles.cardText}>
              Our engine is optimized with specialized parsers for the following high-level languages:
            </Text>
            
            <View style={styles.languageGrid}>
              {supportedLanguages.map((lang) => (
                <View key={lang} style={styles.languageBadge}>
                  <Text style={styles.languageBadgeText}>{lang}</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Universal Compatibility</Text>
              <Text style={styles.infoText}>
                CodeShield also supports <Text style={{fontWeight: "bold", color: "#FFF"}}>non-official</Text> or legacy programming languages. 
                In these cases, our engine falls back to a <Text style={{fontStyle: "italic", color: "#4A90E2"}}>Universal Heuristic Parser</Text> that analyzes logic flow and pattern-based vulnerabilities without requiring a specific grammar definition.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (Your existing styles remain the same)
  safeArea: { flex: 1, backgroundColor: "#0A1D37" },
  scrollContent: { paddingBottom: 60, alignItems: "center" },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#071426",
    borderBottomWidth: 1,
    borderBottomColor: "#1A365D",
  },
  headerLogo: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  headerRight: { flexDirection: "row", gap: 25 },
  headerLink: { color: "#E0E0E0", fontSize: 14, fontWeight: "500" },
  mainContainer: { width: "100%", maxWidth: 800, padding: 30 },
  pageTitle: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  pageSubtitle: { color: "#A0AAB2", fontSize: 16, textAlign: "center", marginBottom: 40 },
  card: {
    backgroundColor: "#11274A",
    borderRadius: 12,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#1E3A6D",
  },
  cardTitle: { color: "#4A90E2", fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  cardText: { color: "#E0E0E0", fontSize: 15, lineHeight: 22, marginBottom: 15 },
  formulaBox: {
    backgroundColor: "#071426",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    marginBottom: 15,
    alignItems: "center",
  },
  formulaText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", fontFamily: "monospace" },
  
  // New Styles for Language Support
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  languageBadge: {
    backgroundColor: "#1A365D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  languageBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.3)",
  },
  infoTitle: {
    color: "#4A90E2",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    color: "#B0BCC7",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MethodologyScreen;