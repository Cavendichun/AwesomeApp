import React, { Component } from 'react';
import fetch from '../../Util/fetch';
import { TextInput, Button } from '../../Components';
import Toast from '../../Util/toast';
import './style.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.onPasswordFormChange = this.onPasswordFormChange.bind(this);
        this.onUserLogin = this.onUserLogin.bind(this);
        this.state = {
            init: false,
            formData: {}
        }
    }

    componentDidMount() {
        this.checkUserName();
    }

    //检查用户是否登陆过用户
    checkUserName() {
        const currentUsername = localStorage.getItem('USERNAME');
        this.setState({ formData: { username: currentUsername }, init: true });
    }

    onPasswordFormChange(name, value) {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[name] = value;
        this.setState({ formData })
    }

    //登陆
    async onUserLogin() {
        const { username, password } = this.state.formData;
        if (!username || !password) {
            Toast.error({
                content: '用户名和密码不能为空',
                duration: 1500000
            }, () => { console.log(111) })
        }
    }

    render() {
        const {
            init,
            formData: { username, password }
        } = this.state;
        if (!init) return null;
        return (
            <div className="login-page-root">
                <div className="login-form-wrapper">
                    <div className="form">
                        <div className='passwordword-login-form'>
                            <TextInput
                                label='用户名'
                                value={username}
                                onChange={(e) => { this.onPasswordFormChange('username', e) }}
                                color='purple'
                            />
                            <TextInput
                                label='密码'
                                value={password}
                                type='password'
                                onChange={(e) => { this.onPasswordFormChange('password', e) }}
                                color='purple'
                                onEnter={this.onUserLogin}
                            />
                            <Button
                                className='login-btn'
                                title='登  录'
                                size='large'
                                color='purple'
                                disabled={ !username || !password }
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;
