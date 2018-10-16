import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import downArrow from './down-arrow.svg';
import rightArrow from './right-arrow.svg';

export default class Menu extends Component {

    static defaultProps = {
        items: []
    }

    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
    }

    toggleExpand(item, e) {
        debugger
        e.stopPropagation();
        if (item.children && item.children.length > 0) {
            item.expanded = !item.expanded;
            this.setState(this.state);
        }
    }

    renderItem(item) {
        let expand = null;

        if (item.children) {
            expand = item.expanded ? <img style={{fillColor:'red'}} src={downArrow}/> : <img src={rightArrow}/>
        }

        const childStyle = {
            maxHeight: item.expanded ? '1000px' : 0,
            overflow: 'hidden'
        };

        return (

            <div className="tree-menu__item" key={item.id} onClick={(e) => this.toggleExpand(item, e)}>
                <div className="tree-menu__item-wrap">
                    <div className="tree-menu__item-title">
                        { item.title }
                    </div>
                    <div className="tree-menu__item-expand">
                        {
                            expand
                        }
                    </div>
                </div>
                <div className="tree-menu__item-children" style={childStyle}>
                    {
                        item.children && item.children.map((childItem) => this.renderItem(childItem))
                    }

                </div>

            </div>
        );
    }

    

    render () {
        const style = {
            width: this.props.width + 'px'
        };

        return (

            <div className="tree-menu" style={style}>
                {
                    this.state.items.map((item) => this.renderItem(item))
                }
            </div>
        );
    }



}