import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { colors } from "@/theme/colors";

const RecieveAddress = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.typetext}>Recieve Address</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Your Bitcoin address"
        placeholderTextColor={"#554b6aad"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 5,
    borderRadius: 16,
    paddingVertical: 20,
  },
  typetext: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.fontColor,
    marginBottom: 5,
  },
  textinput: {
    flex: 1,
    backgroundColor: "transparent",
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: 500,
  },
  coinText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.fontColor,
  },
});

export default RecieveAddress;
