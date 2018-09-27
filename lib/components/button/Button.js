import React from 'react';

export default class extends React.Component {


    render() {
        return (
            <div>
                <button>{this.props.text}</button>
            </div>
        );
    }

}