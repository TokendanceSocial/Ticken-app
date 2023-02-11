import React from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from '@/routes';
import { client, chains } from './config/wagmi';

export default function App() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <WagmiConfig client={client as any}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
