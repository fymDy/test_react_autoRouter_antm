import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 模拟登录逻辑，实际项目中应该进行 API 请求验证用户身份
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('authToken', 'fakeToken'); // 模拟保存 token
      navigate('/protected/home'); // 登录成功后重定向到主页
    } else {
      alert('用户名或密码错误');
    }
  };
  return (
    <div>
      <h1>登录</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="用户名"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
      />
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

export default Login;
