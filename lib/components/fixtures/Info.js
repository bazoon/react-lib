import React, { Component } from 'react';
import Button from '../button/Button';


export default class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInfoVisible: false
        };
    }

    toggleInfo = () => {
        this.setState({
            isInfoVisible: !this.state.isInfoVisible
        });
    }


    render() {
        const infoStyle = {
            maxWidth: '400px',
            backgroundColor: '#76D6FF',
            color: '#212121',
            padding: '20px',
            display: this.state.isInfoVisible ? 'block' : 'none'
        };

        return (
            <>
                <Button type="secondary" size="sm" onClick={this.toggleInfo}>Показать описание</Button>
                <div style={infoStyle} >
                    { this.props.description }
                </div>
                { this.props.children }
            </>    
        );
    }


}