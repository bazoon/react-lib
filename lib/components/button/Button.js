import React, { Component } from 'react';
import dissoc from 'ramda/src/dissoc';
import merge from 'ramda/src/merge';
import assoc from 'ramda/src/assoc';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './button.scss';

function Loader(props) {
    return '';
}

export default class extends Component {
    static propTypes = {
      type: PropTypes.oneOf(['primary', 'secondary', 'dark', 'white', 'gray']),
      size: PropTypes.oneOf(['lg', 'md', 'sm']),
      loading: PropTypes.bool,
    }

    render() {
      const className = classNames({
        btn: true,
        [`btn-${this.props.type}`]: true,
        [`btn-${this.props.size}`]: true,
        btn_loading: this.props.loading,
      });
      
      const isLoading = this.props.loading;
      const props = compose(assoc('className', `${this.props.className} ${className}`), dissoc('loading'), merge({}))(this.props);
      
      return (
        isLoading
          ? <button style={this.props.style} {...props}><Loader active inline style={ { marginRight: '8px' } }/>{this.props.children}</button>
          : <button style={this.props.style} {...props}>{this.props.children}</button>
      );
    }
}
