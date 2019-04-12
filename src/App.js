import React, { Component } from 'react';
import LoginPage from './Pages/LoginPage';
import TitleBar from './Pages/components/TitleBar';
import fetch from './Util/fetch';
import './Styles/app.scss';
import URL from './Util/url';
import { registRoute, router } from './Util/route';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onUserLogin = this.onUserLogin.bind(this);
        this.onUserLogout = this.onUserLogout.bind(this);
        this.state = {
            userinfo: null
        }
    }

    async componentDidMount() {
        const { history, location, match, staticContext } = this.props;
        await registRoute({ history, location, match, staticContext });
        this.getUserInfo();
    }

    //获取用户信息
    async getUserInfo() {  //刷新后自动获取用户信息，判断登陆状态，url必须保持不变，为了让用户登陆后回到之前的页面
        let res = await fetch(URL.GET_USER_INFO, 'post');
        if (res.code != 200) {
            this.setState({ userinfo: null, init: true });
            return;
        }
        this.setState({ userinfo: res.data, init: true });
    }

    //用户登陆
    async onUserLogin(data) {
        let res = await fetch(URL.USER_LOGIN, 'post', data);
        if (res.code != 200) {
            this.setState({ init: true });
            return;
        }
        this.setState({ userinfo: res.data, init: true });
    }

    //用户注册
    async onUserSignUp(data) {

    }

    //用户登出
    async onUserLogout() {
        let res = await fetch(URL.USER_LOGOUT, 'post');
        if (res.code != 200) {
            return;
        }
        this.setState({ userinfo: res.data });
    }

    //渲染不需要登录状态的页面
    getStaticPageByUrlWithoutLogin() {
        switch (this.props.history.location.pathname) {
            case '/login':
                return <LoginPage onUserLogin={this.onUserLogin} />
            case '/signup':
                return <div>signup page</div>
            default:
                return <LoginPage onUserLogin={this.onUserLogin} />
        }
    }

    //渲染需要登陆状态的页面
    getStaticPageByUrlHasLogin() {
        switch (this.props.history.location.pathname) {
            default:
                return <h1>HELLOS<a onClick={this.onUserLogout}>登出</a></h1>
        }
    }

    render() {
        const { userinfo, init } = this.state;
        if (!init) return null;
        return (
            <div id='app'>
                {/* 标题栏 */}
                <TitleBar />
                {/* 页面框架 */}
                {/* {this.getStaticPageByUrl()} */}
                {userinfo ? this.getStaticPageByUrlHasLogin() : this.getStaticPageByUrlWithoutLogin()}
            </div>
        );
    }
}

export default App;
