import { createClient, configureChains } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains & providers with the Alchemy provider.
export const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'Ticken',
  chains
});
export const client: unknown = createClient({
  autoConnect: true,
  connectors: connectors,
  provider,
  webSocketProvider
});
