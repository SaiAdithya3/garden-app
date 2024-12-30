import Navbar from "@/components/navbar/Navbar";
import SwapComponent from "@/components/SwapComponent/SwapComponent";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}
        >
          <Navbar />
          <View style={styles.container}>
            <SwapComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default Index;