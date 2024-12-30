import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";

type SwapButtonProps = {
  isDisabled: boolean;
  onPress: () => void;
};

const SwapButton: React.FC<SwapButtonProps> = ({ isDisabled, onPress }) => {
  return (
    <TouchableOpacity
      style={isDisabled ? styles.buttonDisabled : styles.buttonActive}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={isDisabled ? styles.buttonTextDisabled : styles.buttonText}>
        Swap
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: colors.primaryButtonColor,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: "center",
    color: "white",
  },
  buttonDisabled: {
    backgroundColor: colors.disabledButtonColor,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: "center",
    color: colors.fontColor,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SwapButton;
