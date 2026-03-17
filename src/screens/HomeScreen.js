import { View, Text, Button, StyleSheet } from "react-native";

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CodeShield</Text>

      <Text style={styles.subtitle}>Technical Debt & Security Scanner</Text>

      <Button title="Start Scan" onPress={() => navigation.navigate("Scan")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});
export default HomeScreen;
