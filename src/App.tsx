



import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './routes';
const App: React.FC = () => {
  const fronUrl='/protected'
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
