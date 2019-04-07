import React, { Component } from 'react';
import LoginPage from './Pages/LoginPage';
import TitleBar from './Pages/components/TitleBar';
import fetch from './Util/fetch';
import './Styles/app.scss';
import URL from './Util/url';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onUserLogin = this.onUserLogin.bind(this);
        this.state = {
            userinfo: null
        }
    }

    componentDidMount() {
        this.onUserLogin();
    }

    async onUserLogin() {
        const res = await fetch(URL.GET_USER_INFO, 'get', { name: 11 });
        console.log(res);
    }

    render() {
        const { userinfo } = this.state;
        return (
            <div id='app'>
                { userinfo ? <h1>HELLO</h1> : <LoginPage onUserLogin={this.onUserLogin}/> }
                {/* 标题栏 */}
                <TitleBar />
            </div>
        );
    }
}

export default App;
