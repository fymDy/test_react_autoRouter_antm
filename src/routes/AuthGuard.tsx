import React from 'react';
import { Navigate } from 'react-router-dom';

// 模拟的鉴权函数
const isAuthenticated = () => {
  // 实际项目中，这里应该检查用户的认证状态，例如检查 token 是否存在或是否有效
  return localStorage.getItem('authToken') !== null;
};

const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    // 如果用户没有认证，重定向到登录页面
    return <Navigate to="/login" replace />;
  }
  
  // 如果用户认证了，渲染传入的子组件
  return children;
};

export default AuthGuard;
