import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

export default class extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      indeterminate: PropTypes.bool,
      name: PropTypes.string,
    }


    constructor(props) {
      super(props);
      this._id = `ch${Math.random()}`;
    }


    handleClick = (name, e) => {
      this.props.onChange && this.props.onChange(e, {
        checked: e.target.checked,
        name,
      });
    }
    
    render() {
      return (
        <div className="checkbox">
          <input id={this._id} disabled={this.props.disabled} checked={this.props.checked} type="checkbox" className="checkbox__input" onChange={this.handleClick.bind(this, this.props.name)}/>
          <label className="checkbox__label" htmlFor={this._id}/>
        </div>
      );
    }
}
