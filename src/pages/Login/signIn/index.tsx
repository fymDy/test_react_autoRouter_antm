/*
 * @Author: Mark
 * @Date: 2024-05-31 20:11:34
 * @LastEditTime: 2024-06-02 17:28:59
 * @LastEditors: MarkMark
 * @Description: 佛祖保佑无bug
 * @FilePath: /test-react-app-antm/src/pages/Login/signIn/index.tsx
 */
import React from 'react';
import { Button, Form, Input } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import accountPng from '../assets/account.png'
import lockPng from '../assets/lock.png'
const useSignIn = () => {
    const navigate = useNavigate()
    const handleLogin = (values: any) => {
        // 模拟登录逻辑，实际项目中应该进行 API 请求验证用户身份

        if (values.username === 'admin' && values.password === 'admin') {
            localStorage.setItem('authToken', 'fakeToken'); // 模拟保存 token
            navigate('/protected/home', { replace: true }); // 登录成功后重定向到主页
        } else {
            alert('用户名或密码错误');
        }
    };
    return (
        <div className={styles.signIn}>
            <Form layout='horizontal' mode='card'
                onFinish={handleLogin}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }>
                <Form.Item name='username' label={<div className={styles.iptAccount}>
                    <div><img src={accountPng} alt='' /></div>
                </div>}>
                    <Input placeholder='请输入手机号' clearable />
                </Form.Item>
                <Form.Item name='password' label={
                    <div className={styles.iptAccount}>
                        <div>   <img src={lockPng} alt=''/></div>
                    </div>
                }>
                    <Input placeholder='请输入密码' clearable />
                </Form.Item>
            </Form>
        </div>
    )
}
export default useSignIn