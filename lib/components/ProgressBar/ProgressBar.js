import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './progress-bar.scss';

export default class ProgressBar extends Component {

    
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

        const className = cn("progressbar", {
            'progressbar progressbar-blue': (this.props.progress > 0 && this.props.progress < 25),
            'progressbar progressbar-yellow': (this.props.progress >= 25 && this.props.progress < 50),
            'progressbar progressbar-green': this.props.progress > 50,
            'progressbar progressbar-red': this.props.overdue,
        });
        

        return (
            <div className={className} style={style}>
                <div className="progressbar__inner" style={indicatorStyle}></div>
            </div>
    
        )

    }



}