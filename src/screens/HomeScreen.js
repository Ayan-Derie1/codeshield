import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from "react-native";

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header Navigation */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Codeshield</Text>
        <View style={styles.headerRight}>
          <Pressable 
            onPress={() => navigation.navigate("Methodology")}
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          >
            <Text style={styles.headerLink}>Methodology</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 2. Center Logo Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require("../../assets/iconCodeShield.jpeg")} 
            style={styles.shieldImage}
          />
        </View>

        {/* 3. Titles */}
        <Text style={styles.title}>Codeshield</Text>
        <Text style={styles.subtitle}>
          Identify high-risk code modules, reduce techincal debt, and improve long-term maintainability with intelligent code risk analysis 
        </Text>

        {/* 4. Action Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cyclomatic complexity</Text>
            <Text style={styles.cardDescription}>
              Measure code complexity for better maintainability
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vulnerability density</Text>
            <Text style={styles.cardDescription}>
              Identify security risks and unsafe coding patterns
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tech debt index</Text>
            <Text style={styles.cardDescription}>
              Make data-driven decisions for optimal code health
            </Text>
          </View>
        </View>

        {/* 5. BIG Call to Action Button */}
        <Pressable 
          onPress={() => navigation.navigate("Scan")}
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed 
          ]}
        >
          <Text style={styles.ctaButtonText}>Start Code Analysis</Text>
        </Pressable>
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
    paddingHorizontal: 35,
    paddingVertical: 20,
    backgroundColor: "#071426",
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
  imageContainer: {
    width: 210, 
    height: 210, 
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 50, 
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20, 
  },
  shieldImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50, 
  },
  title: {
    fontSize: 44, 
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 16,
    color: "#A0AAB2",
    textAlign: "center",
    paddingHorizontal: 20,
    maxWidth: 600,
    lineHeight: 24,
    marginBottom: 55, 
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
    maxWidth: 1000,
    marginBottom: 60, 
  },
  card: {
    backgroundColor: "#1A365D",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A4A7F",
    width: 280,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    color: "#A0AAB2",
    fontSize: 14,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: "#3B82F6", 
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 30, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  ctaButtonPressed: {
    backgroundColor: "#2563EB", 
    transform: [{ scale: 0.96 }], 
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default HomeScreen;