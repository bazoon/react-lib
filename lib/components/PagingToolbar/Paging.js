import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './paging.scss';


export default class Paging extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        interval: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.props.store.on('load', () => this.setState(this.state));
    }


    handleClickPage = (page) => {
        this.props.store.setCurrentPage(page);
        
    }

    render() {
        const currentPage = this.props.store.getCurrentPage();
        const pageSize = this.props.store.getPageSize();
        const total = this.props.store.getTotal();
        const numberOfPages = Math.ceil(total / pageSize);
        
        let left = currentPage - this.props.interval;
        let right = currentPage + this.props.interval;
        

        if (left < 0) {
            while(left !==0) {
                left++;
                right++;
            }
            if (right > numberOfPages) {
                right = numberOfPages;
            }
        }

        if (right > numberOfPages) {
            while(right > numberOfPages) {
                right--;
                left--;
            }

            if (left < 0) {
                left = 0;
            }
        }
        
        let pages = [];
        
        for (let i = left; i < right; i ++) {
            pages.push(i);
        }

        return (
            <div className="paging-toolbar">
                <div className="paging-toolbar__page" onClick={this.handleClickPage.bind(this, 0)}>↤</div>
                {
                    pages.map((page) => {

                        if (page === currentPage) {
                            return <div key={page} className="paging-toolbar__page paging-toolbar__page_current">{ page + 1 }</div>
                        } else {
                            return <div key={page} className="paging-toolbar__page" onClick={this.handleClickPage.bind(this, page)}>{ page + 1 }</div>
                        }

                    })
                }
                <div className="paging-toolbar__page" onClick={this.handleClickPage.bind(this, numberOfPages - 1)}>↦</div>
            </div>
        );
    }

}