import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import downArrow from './down-arrow.svg';
import rightArrow from './right-arrow.svg';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';


export default class Menu extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
    }

    toggleExpand(item, e) {
        e.stopPropagation();
        if (item.children && item.children.length > 0) {
            item.expanded = !item.expanded;
            this.setState(this.state);
        }
    }

    renderItem(item) {
        let expand = null;

        if (item.children) {
            expand = item.expanded ? <img style={{fillColor: 'red'}} src={downArrow}/> : <img src={rightArrow}/>;
        }

        const childStyle = {
            maxHeight: item.expanded ? '1000px' : 0,
            overflow: 'hidden'
        };

        const itemClassName = cn("tree-menu__item", {
            "menu__bottom-item": item.fixed
        });

        return (

            <div className={itemClassName} key={item.id} onClick={(e) => this.toggleExpand(item, e)}>
                <div className="tree-menu__item-wrap">
                    <div className="tree-menu__item-title">
                        {
                            item.icon && <FontAwesomeIcon icon={item.icon}/>
                        }
                        <Link to={item.link}>{ item.title }</Link>
                        
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
    
    renderCollapsedItem(item) {
      
        const itemClassName = cn("tree-menu__item tree-menu__item_collapsed", {
            "menu__bottom-item": item.fixed
        });

        return (

            <div className={itemClassName} key={item.id} onClick={(e) => this.toggleExpand(item, e)}>
                <div className="tree-menu__item-wrap">
                    <div className="tree-menu__item-title">
                        <Link to={item.link}>{ item.icon && <FontAwesomeIcon size="2x" icon={item.icon}/>}</Link>
                    </div>
                </div>
            </div>
        );
    }
    

    renderExpanded() {
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

    renderCollapsed() {
        const style = {
            width: '50px'
        };

        return (
            <div className="tree-menu" style={style}>
                {
                    this.state.items.map((item) => this.renderCollapsedItem(item))
                }
            </div>
        );
    }

    render() {
        debugger
       return this.props.collapsed ? this.renderCollapsed() : this.renderExpanded();
    }
}
