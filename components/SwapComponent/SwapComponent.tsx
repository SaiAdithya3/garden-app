import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import TokenInput from "./TokenInput";
import { colors } from "@/theme/colors";
import RecieveAddress from "./RecieveAddress";
import DetailsCard from "./DetailsCard";
import SwapButton from "./SwapButton";

const SwapComponent = () => {
  const handleSwap = () => {
    alert("Swap button pressed");
  };
  return (
    <View style={styles.formContainer}>
      <View style={{ flexDirection: "column", gap: 16, position: "relative" }}>
        <TokenInput type="Send" />
        <TouchableOpacity style={styles.swapButton}>
          <Image
            source={require("../../assets/images/swap.png")}
            style={styles.swapImage}
          />
        </TouchableOpacity>
        <TokenInput type="Recieve" />
      </View>
      <RecieveAddress />
      <DetailsCard fees={40} saved={50} />
      <SwapButton isDisabled={false} onPress={handleSwap} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: colors.bgtrans,
    borderRadius: 20,
    margin: 20,
    marginVertical: 60,
    width: "90%",
    gap: 16,
    backdropFilter: "blur(10px)",
  },
  swapButton: {
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: colors.disabledButtonColor,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "40%",
    left: "42%",
    zIndex: 10,
    borderWidth: 1,
  },
  swapImage: {
    borderRadius: 20,
    width: 24,
    height: 24,
    opacity: 0.5,
  },
});

export default SwapComponent;

// keyboard avoiding view
