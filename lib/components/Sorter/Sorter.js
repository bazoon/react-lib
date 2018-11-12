import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortUpIcon from '../icons/sort_up.svg';
import sortDownIcon from '../icons/sort_down.svg';
import cn from 'classnames';


export default class Sorter extends Component {

    static propTypes = {
        sortDirection: PropTypes.string,
    };


    render() {
        const isUp = this.props.sortDirection === 'asc' || !this.props.sortDirection;
        const isDown = this.props.sortDirection !== 'asc' || !this.props.sortDirection;

        const upCls = cn("datagrid__sorter-up", {
            "datagrid__sorter_inactive": isUp
        });

        const downCls = cn("datagrid__sorter-down", {
            "datagrid__sorter_inactive": isDown
        });

        const up = <img className={upCls} src={sortUpIcon}/>;
        const down = <img className={downCls} src={sortDownIcon}/>;

        return (
            <span className="datagrid__sorter" style={{cursor: 'pointer'}}>
                { up }
                { down }
    
                
            </span>
        );
    }


}