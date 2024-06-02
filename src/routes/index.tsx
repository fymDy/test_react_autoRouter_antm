// src/routes.tsx
import React from 'react';
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "./AuthGuard"; // 引入 AuthGuard 组件
import Layout from "../Layout"; // 引入布局组件
// 动态导入组件的占位符
const Loading = () => <div className="Loading">Loading...</div>;
// 动态生成路由配置对象
const requireContext = require.context("../pages", true, /index\.tsx$/);

// 辅助函数，用于从页面路径中生成路由路径
const generateRoutePath = (pagePath: string) => {
  return pagePath.replace("./", "").replace("/index.tsx", "");
};
export const getRouteLevel = (path: string) => {
  // 去除路径前的斜杠并分割
  const levels = path.split("/").filter(Boolean);
  // 返回层级，数组长度即为层级数
  return levels.length;
};
const routesConfig = requireContext.keys().map((key) => {
  const routePath = generateRoutePath(key);
  const routeLevel = getRouteLevel(routePath); // 分割路径并计算非空部分的数量
  console.log(`Loading component for routePath: ${routePath},${routeLevel}`); // 打印调试信息
  // 动态加载组件
  const Component = lazy(() =>
    import(`../pages/${routePath}/index.tsx`).then((module) => ({
      default: module.default,
    }))
  );
  // 动态加载组件
  return {
    path: routePath === "" ? "/" : `/${routePath}`, // 根路径特殊处理
    element: <Component />,
    authRequired: routePath.startsWith("protected"), // 假设以 'protected' 开头的路径需要鉴权
    routeLevel: routeLevel,
  };
});
console.log("routesConfig======", routesConfig);
// // 处理未匹配的路由
const NotFound = lazy(() => import("../pages/404"));
{
  /* 根路路径分割来确定路由的层级*/
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 根路径重定向到 /home */}
        <Route path="/" element={<Navigate to="/protected/home" replace />} />
        {routesConfig.map((route) => {
          const element = route.authRequired ? (
            <AuthGuard>{route.element}</AuthGuard>
          ) : (
            route.element
          );
          return (
            <Route key={route.path} element={<Layout route={route} />}>
              <Route path={route.path} element={element} />
            </Route>
          );
        })}
        {/* 添加未匹配路由处理 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
