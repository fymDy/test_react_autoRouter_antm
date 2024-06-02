import React from 'react';
import { Button } from 'antd-mobile';

import styles from './index.module.scss';
const useHome: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1>Home Page</h1>
      <Button color="primary" onClick={() => alert('Hello, Ant Design Mobile!')}>
        Click Me
      </Button>
    </div>
  );
};
export default useHome;
