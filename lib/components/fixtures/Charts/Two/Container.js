import React, { Component } from 'react';
import Bar from './Bar';
import Pie from './Pie';


export default class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const style = {
            width: '100%',
            height: '300px',
            position: 'relative',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between'
        };

        const textStyle = {
            position: 'absolute',
            top: 165,
            left: 310
        };

        const divStyle = {
            height: '180px',
            width: '100%',
            textAlign: 'center'
        };

        return (
            <div style={style}>
                <div style={divStyle}>
                    <h2>Статусы</h2>
                    <Pie {...this.props}/>
                </div>
                <div style={divStyle}>
                    <h2>Стадии</h2>
                    <Bar {...this.props}/>
                </div>
                
                
            </div>
        );
    }

}