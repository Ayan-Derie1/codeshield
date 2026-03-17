import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
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

      if (result.assets && result.assets.length > 0) {
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

  const analyseCode = () => {
    const lines = code.split("\n").length;

    const complexity = calculateCyclomaticComplexity(code);

    const vulnerabilityList = detectVulnerabilities(code) || [];
    const vulnerabilities = vulnerabilityList.length;

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CodeShield Scanner</Text>

      <Button title="Upload Code File" onPress={handleFilePick} />

      {fileName ? (
        <Text style={{ marginVertical: 10 }}>Selected File: {fileName}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Or Paste your code here..."
        multiline
        value={code}
        onChangeText={setCode}
      />

      <Button title="Analyse Code" onPress={analyseCode} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    height: 200,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});

export default ScanScreen;
