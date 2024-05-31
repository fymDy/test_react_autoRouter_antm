import { LazyExoticComponent, ComponentType, lazy } from 'react';

interface RouteConfig {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
  authRequired: boolean;
}

const routesConfig: RouteConfig[] = [
  {
    path: "/login",
    element: lazy(() => import('../../pages/Login')),
    authRequired: false,
  },
  {
    path: "/",
    element: lazy(() => import('../../pages/protected/Home')),
    authRequired: true,
  },
  {
    path: "/about",
    element: lazy(() => import('../../pages/protected/About')),
    authRequired: true,
  },
  {
    path: "/dashboard",
    element: lazy(() => import('../../pages/protected/Dashboard')),
    authRequired: true,
  },
  {
    path: "/dashboard/settings",
    element: lazy(() => import('../../pages/protected/Dashboard/Settings')),
    authRequired: true,
  },
];

export default routesConfig;
