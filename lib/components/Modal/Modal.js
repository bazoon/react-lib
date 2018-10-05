import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default class Modal extends Component {

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

        return (
            <React.Fragment>
                <div className="modal">
                    <div className="modal__header">
                        Окно редактирования
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