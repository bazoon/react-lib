import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './menu.scss';
import downArrow from './down-arrow.svg';
import rightArrow from './right-arrow.svg';

import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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

    isActiveLink = (item, match, location) => {
       
        if (item.link === '/') {
            return location.pathname === item.link;
        } 


        return location.pathname.indexOf(item.link) >= 0;
    }

    renderItem(item) {
        let expand = null;

        if (item.children) {
            expand = item.expanded ? <FontAwesomeIcon icon={faAngleDown} color={this.props.angleColor}/> : <FontAwesomeIcon icon={faAngleRight} color={this.props.angleColor}/>;
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
                        {
                            item.children ? <span className="tree-menu__item-title__link">{item.title}</span> : <NavLink className="tree-menu__item-title__link" to={item.link} activeClassName="selected" isActive={this.isActiveLink.bind(this, item)} >{ item.title }</NavLink>
                        }
                    </div>
                    {
                        expand && (
                            <div className="tree-menu__item-expand">
                                {
                                    expand
                                }
                            </div>

                        )
                    }

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
                        <NavLink to={item.link} activeClassName="selected">{ item.icon && <FontAwesomeIcon size="1x" icon={item.icon}/>}</NavLink>
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
       return this.props.collapsed ? this.renderCollapsed() : this.renderExpanded();
    }
}
