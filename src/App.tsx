import React from 'react';
import { WagmiConfig } from 'wagmi';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from '@/routes';
import { client } from './config/wagmi';

export default function App() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <WagmiConfig client={client as any}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </WagmiConfig>
  );
}
