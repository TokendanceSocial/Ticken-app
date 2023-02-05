import LayoutComponent from '@/components/Layout';
import Login from '@/pages/Login';
import React from 'react';
import { useAccount } from 'wagmi';
const List = React.lazy(() => import('@/pages/List'));
import { Navigate } from 'react-router-dom';

function isAuthenticated(address) {
  return !!address;
}
// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
const ProtectedRoute = ({ children }) => {
  const { address } = useAccount();
  console.log();
  if (!isAuthenticated(address)) {
    return <Navigate to="/login" />;
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
      },
      {
        path: '/detail',
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
