import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, arbitrum, sepolia } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LinearGradient } from 'expo-linear-gradient';
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";
import { Stack } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import { colors } from '../theme/colors'

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.reown.com
// const projectId = process.env.EXPO_PROJECT_ID;
const projectId = 'de70dbf1a053637a2cce4254cbd45e24';

if (!projectId) {
  throw new Error("Missing PROJECT_ID environment variable");
}

// 2. Create config
const metadata = {
  name: "Garden",
  description:
    "An example of how you can integrate Garden with AppKit in your own react native app",
  url: "https://garden.finance",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [sepolia] as const;

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: sepolia, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  clipboardClient: {
    setString: async (value: string) => {
      await Clipboard.setStringAsync(value);
    },
  },
  debug: true,
  features: {
    email: true, // default to true
    socials: ["x", "discord", "apple"], // default value
    emailShowWallets: true, // default to true
  },
});

export default function RootLayout() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
      <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={{ flex: 1 }}
        >
        <AppKit />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "tranparent",
            },
          }}
          />
        <StatusBar style="auto" />
        </LinearGradient>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
