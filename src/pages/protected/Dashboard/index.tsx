import React from 'react';
import {  useNavigate } from 'react-router-dom';

const useDashboard: React.FC = () => {
    const navigate = useNavigate();

    const goToSettings = () => {
      navigate('/protected/dashboard/settings');
    };
  return (
    <div className='dashPage'>
      <h1 >Dashboard Page</h1>
      {/* 用于渲染子路由 */}
      <button onClick={goToSettings}>Go to Settings</button>
    </div>
  );
};

export default useDashboard;
