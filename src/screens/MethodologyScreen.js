import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";

export const MethodologyScreen = ({ navigation }) => {
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
              Developed by Thomas J. McCabe, this metric measures the number of linearly independent paths through a program's source code. Higher complexity indicates code that is harder to test and maintain.
            </Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>V(G) = E - N + 2P</Text>
            </View>
            <Text style={styles.cardText}>
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>E</Text> = Number of edges (transfers of control){"\n"}
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>N</Text> = Number of nodes (sequential groups of statements){"\n"}
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>P</Text> = Number of connected components
            </Text>
            <Text style={styles.cardText}>
              <Text style={{fontStyle: "italic"}}>Our engine utilizes Abstract Syntax Tree (AST) concepts to count control flow statements (if, while, for, case) to calculate this base complexity.</Text>
            </Text>
          </View>

          {/* Card 2: Vulnerability Density */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Vulnerability Density (VD)</Text>
            <Text style={styles.cardText}>
              This metric normalizes the number of security red flags against the total size of the codebase, allowing for fair comparison between small modules and massive enterprise repositories.
            </Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>VD = ( Σv / LOC ) × 1000</Text>
            </View>
            <Text style={styles.cardText}>
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>Σv</Text> = Total vulnerabilities detected via regex heuristics{"\n"}
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>LOC</Text> = Lines of Code analyzed
            </Text>
          </View>

          {/* Card 3: Technical Debt Index */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>3. Technical Debt Index (TDI)</Text>
            <Text style={styles.cardText}>
              The TDI is a proprietary aggregate score representing the overall health and risk of the module. It scales exponentially as complexity and vulnerabilities compound.
            </Text>
            <View style={styles.formulaBox}>
              <Text style={styles.formulaText}>TDI = (V(G) × Wc) + (VD × Wv)</Text>
            </View>
            <Text style={styles.cardText}>
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>Wc</Text> = Structural Weight (Impact of poor maintainability){"\n"}
              • <Text style={{fontWeight: "bold", color: "#FFF"}}>Wv</Text> = Security Weight (Impact of active vulnerabilities)
            </Text>
            <Text style={styles.cardText}>
              <Text style={{color: "#4CAF50", fontWeight: "bold"}}>0-20 (Low Risk):</Text> Clean, maintainable code.{"\n"}
              <Text style={{color: "#E6B800", fontWeight: "bold"}}>21-50 (Medium Risk):</Text> Refactoring recommended.{"\n"}
              <Text style={{color: "#E53935", fontWeight: "bold"}}>51+ (High Risk):</Text> Immediate security or structural intervention required.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A1D37",
  },
  scrollContent: {
    paddingBottom: 60,
    alignItems: "center",
  },
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
  headerLogo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    gap: 25,
  },
  headerLink: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "500",
  },
  mainContainer: {
    width: "100%",
    maxWidth: 800, 
    padding: 30,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  pageSubtitle: {
    color: "#A0AAB2",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#11274A",
    borderRadius: 12,
    padding: 30,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#1E3A6D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardTitle: {
    color: "#4A90E2",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardText: {
    color: "#E0E0E0",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 15,
  },
  formulaBox: {
    backgroundColor: "#071426",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    marginBottom: 15,
    alignItems: "center",
  },
  formulaText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace", 
  },
});

export default MethodologyScreen;