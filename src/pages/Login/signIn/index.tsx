/*
 * @Author: Mark
 * @Date: 2024-05-31 20:11:34
 * @LastEditTime: 2024-05-31 21:27:21
 * @LastEditors: MarkMark
 * @Description: 佛祖保佑无bug
 * @FilePath: /mobile/test-react-app-antm/src/pages/Login/signIn/index.tsx
 */
import { Form, Input } from 'antd-mobile'
import styles from './index.module.scss'
import accountPng from '../assets/account.png'
import lockPng from '../assets/lock.png'
const Sigin=()=>{

    return(
        <div className={styles.signIn}>
        <Form layout='horizontal' mode='card'>
            <Form.Item label={<div className={styles.iptAccount}>
                    <div><img src={accountPng}/></div>
            </div>}>
                <Input placeholder='请输入手机号'  clearable />
            </Form.Item>
            <Form.Item label={
                <div className={styles.iptAccount}>
                    <div>   <img src={lockPng}/></div>
                </div>
            }>
            <Input placeholder='请输入密码' clearable/>
            </Form.Item>
        </Form>
        </div>
    )
}
export default Sigin