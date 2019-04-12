import React, { Component } from 'react';
import fetch from '../../Util/fetch';
import { TextInput, Button, Switch } from '../../Components';
import Toast from '../../Util/toast';
import './style.scss';
import md5 from '../../Util/md5';
import URL from '../../Util/url';
import { router } from '../../Util/route';

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

    //值域改变
    onPasswordFormChange(name, value) {
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        formData[name] = value;
        this.setState({ formData })
    }

    //登陆
    async onUserLogin() {
        if (this.state.LOGINING == true) return false;
        const { username, password, remember } = this.state.formData;
        if (!username || !password) {
            Toast.error({
                content: '用户名和密码不能为空',
                duration: 2000
            })
            return false;
        }
        let params = {
            username: username.toLowerCase(),
            password: md5(password),
            remember: remember || false
        }
        this.setState({ LOGINING: true });
        let res = this.props.onUserLogin(params);
        if (res != true) {
            this.setState({ LOGINING: false });
        }
    }

    //点击注册按钮
    onRegClick() {
        router().history.push({ pathname: '/signup' })
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
                                color='#f44279'
                            />
                            <TextInput
                                label='密码'
                                value={password}
                                type='password'
                                onChange={(e) => { this.onPasswordFormChange('password', e) }}
                                color='#f44279'
                                onEnter={this.onUserLogin}
                            />
                            <div className='operator-line'>
                                <Switch label='记住密码' color='#f44279' onChange={(e) => { this.onPasswordFormChange('remember', e) }}/>
                                <a className='reg-btn' onClick={this.onRegClick}>点击注册</a>
                            </div>
                            <Button
                                className='login-btn'
                                title='登  录'
                                size='large'
                                color='#f44279'
                                disabled={ !username || !password || this.state.LOGINING }
                                onClick={this.onUserLogin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;
