import React, { Component } from 'react';
import Search from '../../Search/Search';


export default class Searches extends Component {


    constructor(props) {
        super(props);
        this.state = {};

    }

    handleChange = (id, value) => {
        this.setState({
            id,
            value
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
                    <div style={{marginBottom: '20px'}}>
                        {
                            this.state.id ? `Выбран: ${this.state.value}` : ''
                        }
                    </div>
                    <Search {...this.props} onChange={this.handleChange}/>
                    
                </div>
            </>
        );
    }

}