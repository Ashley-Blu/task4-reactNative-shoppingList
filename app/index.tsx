import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index({onPress}) {
  return (
    <>
      <View style={styles.image}>
        <Text style={styles.logo}><Text style={styles.span}>List</Text>ify</Text>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
        />
        <Text style={styles.p}>Grocery shopping made easy. <br /><Text style={styles.span}>Listify</Text> your grocery essentials with us to make your shopping experience better
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>
            <Link href={"/list"}>Get started</Link>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#3c6a6c",
    padding: 12,
    paddingHorizontal: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: -250,
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },

  image: {
    marginHorizontal: 'auto',
  },

  logo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'poppins',
    marginHorizontal: 'auto',
  },

  span: {
    color: '#3c6a6c'
  },

  p: {
    textAlign: 'center'
  }
});
