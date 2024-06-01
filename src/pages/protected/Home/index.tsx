import React from 'react';
import { Button } from 'antd-mobile';

const Home: React.FC = () => {
  return (
    <div className='homePage'>
      <h1>Home Page</h1>
      <Button color="primary" onClick={() => alert('Hello, Ant Design Mobile!')}>
        Click Me
      </Button>
    </div>
  );
};
export default Home;
