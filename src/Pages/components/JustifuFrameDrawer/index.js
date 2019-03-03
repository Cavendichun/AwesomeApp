import React, { Component } from 'react';
import './style.scss';

const ipc = require('electron').ipcRenderer;  //利用ipc自定义窗口的最大化，最小化，关闭，移动

class JustifyFrameDrawer extends Component {
    constructor(props) {
        super(props);
        this.maxWindow = this.maxWindow.bind(this)
        this.state = {
            fullscreen: false
        }
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
        );
    }
}

export default JustifyFrameDrawer;
