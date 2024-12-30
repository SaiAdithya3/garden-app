import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/theme/colors";

type DetailsCardProps = {
  fees?: number;
  saved?: number;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ fees, saved }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Fees:</Text>
        <Text style={styles.value}>{fees ? fees : "-- "}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Saved:</Text>
        <Text style={styles.value}>{!saved ? saved : "-- "}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.fontColor,
  },
  value: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.fontColor,
  },
});

export default DetailsCard;
