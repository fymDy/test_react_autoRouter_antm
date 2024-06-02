import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter  } from 'react-router-dom';

import App from './App';
import  '@/styles/index.scss';
import reportWebVitals from 'reportWebVitals';
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
// 如果需要，可以将性能指标报告发送到某个端点或日志服务
reportWebVitals(console.log);
