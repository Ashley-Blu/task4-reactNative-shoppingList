import AddButton from "@/components/AddButton";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text } from "react-native";
import AddItemScreen from "./AddItemScreen";

const ShoppingListScreen = () => {
  const [modalVissible, setModalVissible] = useState(false);

  return (
    <>
      <Image
        style={styles.basketImg}
        source={require("../assets/images/basket.png")}
      />
      <Image
        style={styles.trollyImg}
        source={require("../assets/images/trolly.png")}
      />
      <Text style={styles.text}>
        Oops! There is nothing on your list. Click the plus button at the bottom
        to add to your list.
      </Text>

      <AddButton onPress={() => setModalVissible(true)} />
      <Modal visible={modalVissible} animationType="slide">
        <AddItemScreen onPress={() => setModalVissible(false)} />
      </Modal>
    </>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  basketImg: {
    width: 130,
    height: 130,
    marginHorizontal: "auto",
  },

  trollyImg: {
    width: 230,
    height: 230,
    opacity: 1,
    marginHorizontal: "auto",
  },

  text: {
    textAlign: "center",
  },
});
