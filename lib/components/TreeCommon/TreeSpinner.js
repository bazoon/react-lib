import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './tree_spinner.scss';

const levelPadding = 20;

export default class TreeSpinner extends PureComponent {

    render() {
        return (
            <>
                { this.props.isLoading && <><span className="spinner__one">•</span><span className="spinner__two">•</span><span className="spinner__three">•</span>&nbsp;</> }
            </>
        );
    }


    

}