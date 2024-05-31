import React from 'react';
import AppRoutes from './routes';
import   './index.module.scss';

const App: React.FC = () => {

  return (
    <div className="container">
      <AppRoutes />
    </div>
  );
};

export default App;
