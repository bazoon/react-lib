import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default class Modal extends Component {

    static defaultProps = {
        width: 600,
        height: 500,
    }

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose();
    }

    render() {
        if (!this.props.isOpened) {
            return null;
        }

        const style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`
        };

        return (
            <React.Fragment>
                <div className="modal" style={style}>
                    <div className="modal__header">
                        { this.props.title }
                    </div>
                    <div className="modal__body">
                        { this.props.children }
                    </div>
                    <div className="modal__footer">
                        <button onClick={this.handleClose}>Close</button>
                        <button onClick={this.props.onSave}>Save</button>
                    </div>
                </div>
                <div className="modal__overlay"></div>
            </React.Fragment>
        );
    }


}