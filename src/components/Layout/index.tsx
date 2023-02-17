import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function LayoutComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/list');
    }
  }, [location, navigate]);

  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
