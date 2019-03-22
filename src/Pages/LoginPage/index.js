import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import PasswordIcon from '@material-ui/icons/Keyboard';
import PaintIcon from '@material-ui/icons/Palette';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from '../../Util/fetch';
import './style.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.changeLoginType = this.changeLoginType.bind(this);
        this.loginByPassword = this.loginByPassword.bind(this);
        this.state = {
            init: false,
            login_type: 'password'
        }
    }

    componentDidMount() {
        this.checkUserName();
    }

    //检查用户是否登陆过用户
    checkUserName() {
        const currentUsername = localStorage.getItem('USERNAME');
        this.setState({ currentUsername, init: true });
    }

    //切换登陆方式
    changeLoginType() {
        let login_type = { 'password': 'paint', 'paint': 'password' }[this.state.login_type];
        this.setState({ login_type });
    }

    //根据是否存有用户名，渲染不同的登陆页面
    getLoginContent(user) {
        const { login_type, formData: { username, password } = {} } = this.state;
        let view = (
            <div className="login-form-wrapper">
                <Fab className="switch-login-type" onClick={this.changeLoginType}>
                    {/* 可以选择不同的登陆方式 */}
                    {
                        login_type == 'paint' ?
                        <PaintIcon style={{fontSize: '50px'}} /> :
                        <PasswordIcon style={{fontSize: '50px'}} />
                    }
                </Fab>
                <div className="form">

                </div>
            </div>
        )
        return view;
    }

    //
    onFieldChange(name, event) {
        let _formData = this.state.formData || {};
        _formData[name] = event.target.value == "" ? null : event.target.value;
        this.setState({ formData: _formData });
    }

    //密码登陆
    async loginByPassword() {
        const { code, data } = await fetch('/mgs_service/api/', 'get');
    }

    render() {
        const { init, user } = this.state;
        if (!init) return null;
        return (
            <div className="login-page-root">
                {/* <div className="big-title">hello</div> */}
                {this.getLoginContent(user)}
            </div>
        )
    }
}

export default LoginPage;
