import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import React from "react";
import { colors } from "@/theme/colors";

type TokenInputProps = {
  type: string;
};

const TokenInput: React.FC<TokenInputProps> = ({ type }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: 5,
        borderRadius: 16,
        paddingVertical: 20,
      }}
    >
      <Text style={styles.typetext}>{type}</Text>
      <View style={{ flex: 1, flexDirection: "row", gap: 2 }}>
        <TextInput
          style={styles.textinput}
          placeholder="0.0"
          placeholderTextColor={"#554b6aad"}
          keyboardType="numeric"
        />
        <TouchableOpacity style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text style={styles.coinText}>BTC</Text>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png" }}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typetext: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.fontColor,
  },
  textinput: {
    flex: 1,
    backgroundColor: "transparent",
    color: colors.fontColor,
    fontSize: 22,
    fontWeight: 700,
  },
  coinText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.fontColor,
  },
});

export default TokenInput;
