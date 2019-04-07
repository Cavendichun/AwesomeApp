import React, { Component } from 'react';
import './style.scss';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getThemeConfig();
    }

    getThemeConfig() {  //动态修改主题颜色
        const { color } = this.props;
        this.refs['button-component'].style.setProperty('--primary-color', color);
    }

    getComponentConfig() {
        let { title = 'BUTTON', disabled, onClick, size = 'default', className } = this.props;
        let _className = 'button-component  waves-effect waves-light';
        if (className) _className += ` ${className}`;
        _className += ` ${{ 'normal': 'btn', 'large': 'btn-large', 'small': 'btn-small' }[size] || 'btn'}`;
        if (disabled) _className += ` disabled`
        return {
            title,
            disabled,
            onClick,
            size,
            _className
        } 
    }

    render() {
        const {
            title,
            onClick,
            _className
        } = this.getComponentConfig();
        
        return (
            <a
                ref='button-component'
                className={_className}
                onClick={onClick}
            >{title}</a>
        );
    }
}

export default Button;