/*
 * @Author: Mark
 * @Date: 2024-05-30 18:02:15
 * @LastEditTime: 2024-05-30 18:02:18
 * @LastEditors: MarkMark
 * @Description: 佛祖保佑无bug
 * @FilePath: /mobile/test-react-app-antm/src/routes/index copy.tsx
 */
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const pages = require.context('../pages', true, /\.tsx$/);
const routes = pages.keys().map((path: string) => {
  const Component = lazy(() => import(`../pages/${path.slice(2)}`));
  const routePath = path
    .replace('./', '')
    .replace('.tsx', '')
    .toLowerCase();
  return (
    <Route
      key={routePath}
      path={routePath === 'home' ? '/' : `/${routePath}`}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      }
    />
  );
});

const AppRoutes = () => {
  return <Routes>{routes}</Routes>;
};

export default AppRoutes;
