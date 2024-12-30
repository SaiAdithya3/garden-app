import { getUnmatched } from "@/host/api/orderbook";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    (async () => {
      const res = await getUnmatched("1", "10");
      console.log("getUnmatched::", res);
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
