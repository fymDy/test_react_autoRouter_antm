import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import logoPng from './assets/logo.png'
import platform1 from './assets/platform1.png'
import platform2 from './assets/platform2.png'
import platform3 from './assets/platform3.png'
import avater from './assets/avatar.png'
import server from './assets/server.png'
import locak2 from './assets/lock2.png'
import SignIn from './signIn'
import SignUp from './signUp'
const Login: React.FC = () => {
  //0 登录  1注册
  const [state, setState] = useState(0)
  const navigate = useNavigate();

  const handleChangeState = () => {
    const s = state === 0 ? 1 : 0
    setState(s)
  }
  const handleOpenForget = () => {
    navigate('/forgetPassword')
  }
  const handleOpenServer = () => {
    navigate('/online')
  }
  const bottoms = [
    {
      path: avater,
      title: state === 0 ? '立即注册' : '立即登录',
      onClick: handleChangeState
    },
    {
      path: locak2,
      title: '忘记密码',
      onClick: handleOpenForget
    },
    {
      path: server,
      title: '合营咨询',
      onClick: handleOpenServer
    }
  ]
  // const handleLogin = () => {
  //   // 模拟登录逻辑，实际项目中应该进行 API 请求验证用户身份
  //   if (username === 'admin' && password === 'admin') {
  //     localStorage.setItem('authToken', 'fakeToken'); // 模拟保存 token
  //     navigate('/protected/home',{replace:true}); // 登录成功后重定向到主页
  //   } else {
  //     alert('用户名或密码错误');
  //   }
  // };
  return (
    <div className={styles.backGround}>
    <div className={styles.imageContainer}>
        <div>
            <img className={styles.image} src={logoPng} alt="logo" />
        </div>
    </div>
    <div className={styles.entryMain}>
          {state === 0 && <SignIn />}
          {state === 1 && <SignUp />}
    </div>
    <div className={styles.bottomWrap}>
          {bottoms.map((v, index) => {
            return (
              <div
                key={index}
                className={styles.bottomItem}
                onClick={v.onClick}
              >
                <div className={styles.bottomIcon}>
                    <img className={styles.image} src={v.path} alt="icon" />
                </div>
                <p className={styles.bottomText}>{v.title}</p>
              </div>
            )
          })}
        </div>
    </div>
  );
};

export default Login;
