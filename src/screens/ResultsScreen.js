import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ResultsScreen = ({ route, navigation }) => {
  const {
    lines = 0,
    complexity = 0,
    vulnerabilities = 0,
    vulnerabilityDensity = 0,
    tdi = 0,
    vulnerabilityList = [],
  } = route.params || {};

  let riskLevel = "Low";
  let riskColor = "#4CAF50";

  if (tdi >= 20 && tdi <= 50) {
    riskLevel = "Medium";
    riskColor = "#E6B800";
  }

  if (tdi > 50) {
    riskLevel = "High";
    riskColor = "#E53935";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyse Overview</Text>

      {/* Metric Cards */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lines of Code</Text>
          <Text style={styles.cardValue}>{lines}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Complexity</Text>
          <Text style={styles.cardValue}>{complexity}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security Flags</Text>
          <Text style={styles.cardValue}>{vulnerabilities}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vulnerability Density</Text>
          <Text style={styles.cardValue}>
            {Number(vulnerabilityDensity).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* TDI */}
      <View style={styles.tdiCard}>
        <Text style={styles.tdiTitle}>Technical Debt Index</Text>
        <Text style={styles.tdiValue}>{Number(tdi).toFixed(2)}</Text>
      </View>

      {/* Risk Grid */}
      <View style={styles.riskGrid}>
        <View
          style={[
            styles.riskBox,
            riskLevel === "Low" && { backgroundColor: "#4CAF50" },
          ]}>
          <Text style={styles.riskText}>Low</Text>
        </View>

        <View
          style={[
            styles.riskBox,
            riskLevel === "Medium" && { backgroundColor: "#E6B800" },
          ]}>
          <Text style={styles.riskText}>Medium</Text>
        </View>

        <View
          style={[
            styles.riskBox,
            riskLevel === "High" && { backgroundColor: "#E53935" },
          ]}>
          <Text style={styles.riskText}>High</Text>
        </View>
      </View>

      <Text style={[styles.warning, { color: riskColor }]}>
        ⚠ {riskLevel} Risk Module
      </Text>

      {/* Security Red Flags */}
      <View style={styles.redFlagsBox}>
        <Text style={styles.redFlagTitle}>Security Red Flags</Text>

        {Array.isArray(vulnerabilityList) && vulnerabilityList.length > 0 ? (
          vulnerabilityList.map((flag, index) => (
            <Text key={index} style={styles.flagItem}>
              • {flag}
            </Text>
          ))
        ) : (
          <Text style={styles.flagItem}>✓ No vulnerabilities detected</Text>
        )}
      </View>

      {/* Rescan Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Scan")}>
        <Text style={styles.buttonText}>Rescan Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 14,
    color: "#555",
  },

  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
  },

  tdiCard: {
    backgroundColor: "#eaeaea",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  tdiTitle: {
    fontSize: 16,
    color: "#444",
  },

  tdiValue: {
    fontSize: 28,
    fontWeight: "bold",
  },

  riskGrid: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  riskBox: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#eee",
  },

  riskText: {
    fontWeight: "bold",
  },

  warning: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 16,
  },

  redFlagsBox: {
    backgroundColor: "#2f4368",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },

  redFlagTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  flagItem: {
    color: "white",
    marginBottom: 4,
  },

  button: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 8,
    marginTop: 25,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ResultsScreen;
