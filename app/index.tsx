import { Link } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.text}>
          <Link href={"/list"}>Get started</Link>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "black",
    padding: 12,
    paddingHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  text: {
    color: "white",
    fontWeight: 'bold'
  },
});
