import React, { Component } from 'react';
import './style.scss';

class Switch extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getThemeConfig()
    }

    getThemeConfig() {  //动态修改主题颜色
        const { color } = this.props;
        this.refs['switch-component'].style.setProperty('--primary-color', color);
    }

    getClassName() {
        const {
            className
        } = this.props;
        let _className = 'switch-component';
        if (className) _className += ` ${className}`;
        return _className;
    }

    onChange(e) {
        this.props.onChange && this.props.onChange(e.target.checked);
    }

    render() {
        const {
            label,
            disabled,
            value
        } = this.props;

        return (
            <div className={this.getClassName()} ref='switch-component'>
                <div className="switch">
                    <label>
                        {label}
                        <input disabled={disabled} type="checkbox" checked={value} onChange={this.onChange}/>
                        <span className="lever"></span>
                    </label>
                </div>

            </div>
        );
    }
}

export default Switch;