import React from 'react';
import AppRoutes from './routes';
import   './index.module.scss';

const App: React.FC = () => {

  return (
    <div className="container">
       <h1>API URL: {process.env.REACT_APP_API_URL}</h1>
      <AppRoutes />
    </div>
  );
};

export default App;
