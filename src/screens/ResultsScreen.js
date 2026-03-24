import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";

export const ResultsScreen = ({ route, navigation }) => {
  // Safely extract all the data passed from the ScanScreen
  const {
    lines = 0,
    complexity = 0,
    vulnerabilities = 0,
    vulnerabilityDensity = 0,
    tdi = 0,
    vulnerabilityList = [],
  } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header (Consistent with Home and Scan screens) */}
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
          
          {/* 2. Page Title & Export Button */}
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>ANALYSIS OVERVIEW</Text>
            <Pressable 
              style={({ pressed }) => [styles.exportButton, pressed && { opacity: 0.8 }]}
              onPress={() => alert("Export functionality coming soon!")}
            >
              <Text style={styles.exportButtonText}>📥 Export ▾</Text>
            </Pressable>
          </View>

          {/* 3. Top Metric Cards (Side-by-Side) */}
          <View style={styles.topCardsContainer}>
            
            {/* Left Card: Module Summary */}
            <View style={styles.metricCard}>
              <Text style={styles.cardHeader}>📄 Module Summary</Text>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Lines of code:</Text>
                <Text style={styles.dataValue}>{lines}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Total alerts:</Text>
                <Text style={styles.dataValue}>{vulnerabilities}</Text>
              </View>
            </View>

            {/* Right Card: Code Metrics */}
            <View style={styles.metricCard}>
              <Text style={styles.cardHeader}>📊 Code Metrics</Text>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Complexity:</Text>
                <Text style={styles.dataValue}>{complexity}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Density:</Text>
                <Text style={styles.dataValue}>{Number(vulnerabilityDensity).toFixed(2)}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Debt index:</Text>
                <Text style={styles.dataValue}>{Number(tdi).toFixed(0)}</Text>
              </View>
            </View>

          </View>

          {/* 4. Bottom Card: Security Red Flags */}
          <View style={styles.redFlagsCard}>
            <Text style={styles.cardHeader}>🚩 Security Red Flags</Text>
            
            <View style={styles.flagsList}>
              {Array.isArray(vulnerabilityList) && vulnerabilityList.length > 0 ? (
                vulnerabilityList.map((flag, index) => (
                  <Text key={index} style={styles.flagItem}>
                    • {flag}
                  </Text>
                ))
              ) : (
                <Text style={styles.flagItem}>✓ No severe vulnerabilities detected.</Text>
              )}
            </View>
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
  // --- Main Layout ---
  mainContainer: {
    width: "100%",
    maxWidth: 900, 
    padding: 30,
  },
 
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  exportButton: {
    backgroundColor: "#3B82F6", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  exportButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  
  topCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
    gap: 20,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    minWidth: 300, 
    backgroundColor: "#11274A", 
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E3A6D",
   
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardHeader: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dataLabel: {
    color: "#E0E0E0",
    fontSize: 15,
  },
  dataValue: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  
  redFlagsCard: {
    width: "100%",
    backgroundColor: "#11274A",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E3A6D",
  },
  flagsList: {
    marginTop: 5,
  },
  flagItem: {
    color: "#E0E0E0",
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default ResultsScreen;