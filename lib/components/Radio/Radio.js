import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './radio.scss';

export default class extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      name: PropTypes.string,
    }


    constructor(props) {
      super(props);
      this._id = `ra_${Math.random()}`;
    }


    handleClick = (name, e) => {
      this.props.onChange && this.props.onChange(e, {
        checked: e.target.checked,
        name,
      });
    }
    
    render() {
      return (
        <div className="radio">
          <input name={this.props.name} id={this._id} disabled={this.props.disabled} checked={this.props.checked} type="radio" className="radio__input" onChange={this.handleClick.bind(this, this.props.name)}/>
          <label className="radio__label" htmlFor={this._id}/>
        </div>
      );
    }
}
