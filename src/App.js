import React, { Component } from 'react';
import LoginPage from './Pages/LoginPage';
import TitleBar from './Pages/components/TitleBar';
import Fetch from './Util/fetch';
import './Styles/app.scss';

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
        const res = await Fetch('/mgs_service/api/user/userinfo', 'get', { name: 11 });
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
