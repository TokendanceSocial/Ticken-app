import LayoutComponent from '@/components/Layout';
import Login from '@/pages/Login';
import React from 'react';
import { useAccount } from 'wagmi';
const List = React.lazy(() => import('@/pages/List'));

function isAuthenticated(address) {
  return !!address;
}
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { address } = useAccount();
  if (!isAuthenticated(address)) {
    return <Login />;
  }
  return children;
};
const routes = [
  {
    element: (
      <ProtectedRoute>
        <LayoutComponent />
      </ProtectedRoute>
    ),
    path: '/',
    children: [
      {
        index: true,
        path: '/list',
        element: <List />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default routes;
