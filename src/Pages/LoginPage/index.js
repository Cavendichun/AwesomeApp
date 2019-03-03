import React, { Component } from 'react';
import './style.scss';

class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            init: false
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

    //根据是否存有用户名，渲染不同的登陆页面
    getLoginContent(user) {
        const view = user ? <div>{user}</div> : <div>no</div>;
        return view;
    }

    render() {
        const { init, user } = this.state;
        if (!init) return null;
        return (
            <div className="login-page-root">
                {this.getLoginContent(user)}
            </div>
        )
    }
}

export default LoginPage;
