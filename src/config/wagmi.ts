import { createClient, configureChains } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Configure chains & providers with the Alchemy provider.
const { chains, provider, webSocketProvider } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()]
);
export const client: unknown = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider
});
