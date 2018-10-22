import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './progress-bar.scss';

export default class Menu extends Component {

    static defaultProps = {
        items: []
    }

    constructor(props) {
        super(props);
    }

    render () {
        let style = {
            width: this.props.width + 'px',
            height: this.props.height + 'px',
            position: 'relative'
        };

        const progress = Math.round(this.props.progress > 100 ? 100 : this.props.progress);
        const indicatorWidth = this.props.width * progress / 100;
       

        let indicatorStyle = {
            width: indicatorWidth + 'px',
            
        }

        let textStyle = {
            position: 'absolute',
            color: '#fff',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '9px'
        }

        const className = cn("progress-bar__indicator", {
            'progress-bar__indicator_overdue': this.props.overdue,
            'progress-bar__indicator_almost': this.props.progress > 50
        });
        
        return (
            <div className="progress-bar" style={style}>
                <div className={className} style={indicatorStyle}>
                    
                </div>
                <div style={textStyle} className="progress-bar__indicator-text">
                        { progress }%
                    </div>
            </div>
        );
    }



}