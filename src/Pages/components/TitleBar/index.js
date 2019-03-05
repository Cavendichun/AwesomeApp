import React, { Component } from 'react';
import './style.scss';
import logo from './logo.png';
console.log(APP_MODE);

const ipc = require('electron').ipcRenderer;  //利用ipc自定义窗口的最大化，最小化，关闭，移动

class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.maxWindow = this.maxWindow.bind(this)
        this.state = {
            fullscreen: false
        }
    }

    componentDidMount() {
        ipc.on('window-unmaximize', () => {
            this.setState({ fullscreen: false });
        })
        ipc.on('window-maximize', () => {
            this.setState({ fullscreen: true });
        })
    }

    //关闭窗口
    closeWindow() {
        ipc.send('close-app');
    }

    //最小化
    minWindow() {
        ipc.send('min-app');
    }

    //最大化或还原
    maxWindow() {
        this.setState({ fullscreen: !this.state.fullscreen });
        ipc.send('max-app');
    }

    render() {
        const { fullscreen } = this.state;
        return (
            <div className="justify-frame-btn-fab">
                <div className="logo">
                    <img src={logo} />
                </div>
                <div className="title">Home Dashboard</div>
                <div className="justifu-btn-group">
                    <div className="icon min" onClick={this.minWindow}>
                        <div className="icon-siu"></div>
                    </div>
                    <div className={fullscreen ? "icon closemax" : "icon max"} onClick={this.maxWindow}>
                        <div className="icon-siu"></div>
                    </div>
                    <div className="icon close" onClick={this.closeWindow}>
                        <div className="icon-siu"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TitleBar;
