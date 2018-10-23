import React, { Component } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

export default class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
    }

    handleChecked = (e) => {
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        const style = {
            width: 700,
            height: 500,
            background: '#fff',
            padding: '30px',
            boxSizing: 'border-box'
        };

        return (
            <>
                <div className="theme-white" style={style}>
                    Чекбокс
                    <Checkbox checked={this.state.checked} onChange={this.handleChecked}/>
                    Disabled
                    <Checkbox checked={this.state.checked} onChange={this.handleChecked} disabled/>
                </div>
                
            </>
        );
    }

}