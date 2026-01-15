import SubmitButton from "@/components/SubmitButton";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <>
      <View style={styles.image}>
        <Text style={styles.logo}>
          <Text style={styles.span}>List</Text>ify
        </Text>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />
        <Text style={styles.p}>
          Grocery shopping made easy. <Text style={styles.span}>Listify</Text>{" "}
          your grocery essentials with us to make your shopping experience
          better
        </Text>
      </View>

      <View style={styles.container}>
        <SubmitButton
          title="Get started"
          onPress={() => router.push("/list")}
          containerStyle={{ marginBottom: 20 }}
        />
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    marginHorizontal: "auto",
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  logo: {
    color: "black",
    fontWeight: "700",
    fontSize: 34,
    fontFamily: "poppins",
    marginHorizontal: "auto",
    marginBottom: 18,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  span: {
    color: "#3c6a6c",
  },
  p: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 32,
  },
});
