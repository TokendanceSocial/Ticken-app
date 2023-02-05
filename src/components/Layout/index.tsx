import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function LayoutComponent() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
