import "./polyfills";
import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet, chain.polygon],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DApp Money",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
import { Factory } from "./pages/Factory";
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={darkTheme({
            accentColor: "#00875F",
            borderRadius: "medium",
          })}
        >
          <TransactionsProvider>
            <Factory />
          </TransactionsProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
