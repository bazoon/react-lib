import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './collapsible.scss';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    renderTitle() {
        return (
            <div className="collapsible__title">
                {
                    this.props.title
                }
            </div>
        );
    }

    render() {
        return (
            <div className="collapsible">
                <div className="collapsible__toggle" onClick={this.handleClick}>
                    { 
                        this.state.collapsed ? <FontAwesomeIcon icon={faAngleDown} color="#8f8f8c"/> : <FontAwesomeIcon icon={faAngleUp} color="#8f8f8c"/>
                    }
                </div>
                { this.state.collapsed ? this.renderTitle() : this.props.children }
            </div>
        );
    }

}