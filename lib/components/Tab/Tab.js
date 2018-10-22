import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './tab.scss';

export default class Menu extends Component {
    static defaultProps = {
        panes: [],
        defaultActiveIndex: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: this.props.defaultActiveIndex
        };
    }

    handleMenuItemClick = (index) => {
        this.setState({
            activeIndex: index
        });
    } 

    renderMenu() {
        return (
            <div className="tab__menu">
                {
                    this.props.panes.map((pane, index) => {
                        const className = cn('tab__menu-item', {
                            'tab__menu-item_active': index === this.state.activeIndex
                        });
                        return <a href="#" key={index} className={className} onClick={this.handleMenuItemClick.bind(this, index)}>{pane.menuItem}</a> 
                    })
                }
            </div>
        );

        
    }

    renderPanes() {
        const pane = this.props.panes[this.state.activeIndex];
        return (
            <div className="tab__panes">
                { pane.render() }
            </div>
        )
    }

    render () {
        return (
            <div className="tab">
                { this.renderMenu() }
                { this.renderPanes() }
            </div>
        );
    }

}