import LayoutComponent from '@/components/Layout';
import Login from '@/pages/Login';
import React from 'react';
import { useAccount } from 'wagmi';
import List from '@/pages/List';
import Detail from '@/pages/Detail';
import { Navigate } from 'react-router-dom';

function isAuthenticated(address) {
  return !!address;
}
// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
const ProtectedRoute = ({ children }) => {
  const { address } = useAccount();
  // todo 登陆后路由问题
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
        element: <Detail />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '',
    element: <Login />
  }
];

export default routes;
