import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { calculateCyclomaticComplexity } from "../scanner/complexity";
import { detectVulnerabilities } from "../scanner/vulnerability";
import {
  calculateVulnerabilityDensity,
  calculateTDI,
} from "../scanner/metrics";

export const ScanScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      // Updated to match the newer Expo DocumentPicker API structure
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileName(file.name);

        const response = await fetch(file.uri);
        const text = await response.text();
        setCode(text);
      }
    } catch (error) {
      console.log("File pick error:", error);
    }
  };

  const handleClear = () => {
    setCode("");
    setFileName("");
  };

  const analyseCode = () => {
    if (!code.trim()) return; // Prevent analyzing empty input

    const lines = code.split("\n").length;
    const complexity = calculateCyclomaticComplexity(code);
    const vulnerabilities = detectVulnerabilities(code) || 0;
    const vulnerabilityList = [];
    const vulnerabilityDensity = calculateVulnerabilityDensity(
      vulnerabilities,
      lines,
    );
    const tdi = calculateTDI(complexity, vulnerabilityDensity);

    navigation.navigate("Results", {
      lines,
      complexity,
      vulnerabilities,
      vulnerabilityDensity,
      tdi,
      vulnerabilityList,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header (Reused from HomeScreen, minus login) */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Codeshield</Text>
        <View style={styles.headerRight}>
          <Pressable
            onPress={() => navigation.navigate("Home")} // Navigate back home
            style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
            <Text style={styles.headerLink}>Home</Text>
          </Pressable>
        </View>
      </View>

      {/* 2. Main Content Area */}
      <View style={styles.mainContainer}>
        {/* The Glassmorphism Box */}
        <View style={styles.uploadBox}>
          {/* Top Section: Upload Button */}
          <Pressable
            onPress={handleFilePick}
            style={({ pressed }) => [
              styles.uploadHeader,
              pressed && { opacity: 0.7 },
            ]}>
            <Text style={styles.uploadTitle}>📄 Upload File</Text>
            {fileName ? (
              <Text style={styles.fileNameText}>{fileName}</Text>
            ) : null}
          </Pressable>

          {/* Middle Section: Text Area */}
          <TextInput
            style={styles.textInput}
            placeholder="Or paste your code here"
            placeholderTextColor="#E0E0E0"
            multiline
            value={code}
            onChangeText={setCode}
          />

          {/* Bottom Section: Action Buttons */}
          <View style={styles.actionRow}>
            <Pressable
              onPress={handleClear}
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>

            <Pressable
              onPress={analyseCode}
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
              <Text style={styles.analyseButtonText}>Analyse</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A1D37", // Matches the dark background
  },
  // --- Header Styles (Identical to HomeScreen) ---
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
  // --- Main Content Styles ---
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  uploadBox: {
    width: "100%",
    maxWidth: 800, // Keeps it from stretching too wide on desktop monitors
    backgroundColor: "rgba(30, 63, 109, 0.4)", // Translucent blue for glass effect
    borderWidth: 2,
    borderColor: "#4A90E2", // Bright blue border from your design
    borderRadius: 16,
    padding: 20,
    height: 500, // Fixed height for a robust feel
  },
  // --- Upload Section ---
  uploadHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    gap: 15,
  },
  uploadTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  fileNameText: {
    color: "#4A90E2",
    fontSize: 14,
    fontStyle: "italic",
  },
  // --- Text Input Section ---
  textInput: {
    flex: 1,
    backgroundColor: "#4C6B9C", // Slightly lighter blue background inside the box
    borderRadius: 8,
    padding: 20,
    color: "#FFFFFF",
    fontSize: 18,
    textAlignVertical: "center", // Vertically centers placeholder (mostly for Android)
    ...Platform.select({
      web: { outlineStyle: "none" }, // Removes the default focus ring on web browsers
    }),
  },
  // --- Bottom Action Row ---
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  analyseButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ScanScreen;
