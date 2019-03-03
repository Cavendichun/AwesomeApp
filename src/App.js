import React, { Component } from 'react';
import LoginPage from './Pages/LoginPage';
import JustifyFrameDrawer from './Pages/components/JustifuFrameDrawer';
import './Styles/app.scss';

class App extends React.PureComponent {
    
    render() {
        return (  
            <div id='app'>
                <LoginPage />
                {/* 调整窗口样式的侧边栏 */}
                <JustifyFrameDrawer />
            </div>
        );
    }
}
 
export default App;
