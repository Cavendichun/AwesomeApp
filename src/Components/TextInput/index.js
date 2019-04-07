import React, { Component } from 'react';
import InputFormat from 'react-number-format';
import './style.scss';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidMount() {
        this.getThemeConfig();
    }

    getThemeConfig() {  //动态修改主题颜色
        const { color } = this.props;
        this.refs['text-input-component'].style.setProperty('--primary-color', color);
    }

    getClassName() {
        const { className } = this.props;
        let _className = 'input-component';
        if (className) _className += ` ${className}`;
        return _className;
    }

    onChange(e) {
        let _value = e.target.value;
        //如果被删除，返回undefined
        this.props.onChange && this.props.onChange(_value == '' ? undefined : _value);
    }

    onEnter(e) {
        //监听回车事件
        if (e.keyCode == 13) {
            this.props.onEnter();
        }
    }

    render() {
        const {
            type = 'text',
            label,
            value,
            placeholder,
            onChange,
            onEnter,
        } = this.props;
        return (
            <div className={this.getClassName()} ref='text-input-component'>
                <div className="input-field col s12">
                    <input
                        type={type}
                        value={value || ''}
                        placeholder={placeholder}
                        onChange={this.onChange}
                        onKeyUp={onEnter ? this.onEnter : null}
                    />
                    <label>{label}</label>
                </div>
            </div>
        );
    }
}

export default TextInput;