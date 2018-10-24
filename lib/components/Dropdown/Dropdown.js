import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './dropdown.scss';

export default class Dropdowns extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };

        this.props.store.on('load', this.refresh);
    }

    refresh = () => {
        this.setState(this.state);
    }

    componentDidMount() {
        this.props.store.load();
    }

    componentWillUnmount() {
        this.props.store.un('load', this.refresh);
    }


    toggleOpen = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    renderOptions() {
        const options = this.props.store.getData();
        const idField = this.props.idField;
        const textField = this.props.textField;
        const style = {
            maxHeight: this.props.height + 'px',
            minHeight: this.props.height + 'px',
            height: 0,
            width: this.props.width ? this.props.width + 'px' : '100%',
        };

        return (
            <div className="dropdown__options" style={style}>
                <div className="dropdown__options-wrapper" style={{maxHeight: '100%'}}>
                    {
                        options.map((option) => {
                            return (
                                <div data-id={option[idField]} className="dropdown__options-item" key={option[idField]}> { option[textField] }</div>
                            );
                        })
                    }
                </div> 
            </div>
        );
    }

    handleClick = (e) => {
        const id = e.target.dataset && e.target.dataset.id;
        if (id) {
            if (this.props.onChange) {
                this.props.onChange(e, id);
            }
            this.setState({
                selectedOptionId: id,
                isOpened: false
            });
        }
    }

    handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            selectedOptionId: undefined
        });
        if (this.props.onChange) {
            this.props.onChange(e, undefined);
        }
    }

    render() {
        // console.log('DROP')
        const style = {
            width: this.props.width ? this.props.width + 'px' : '100%',
        };
        
        const className = cn("dropdown", {
            
        });

        const wrapperClassName = cn("dropdown__wrapper", {
            "dropdown__wrapper_opened": this.state.isOpened
        });
        
        const selectedOption = this.props.store.findByField(this.state.selectedOptionId, this.props.idField);
        const value = selectedOption && selectedOption[this.props.textField] || this.props.placeholder || <span>&nbsp;</span>;

        return (
            <div className="dropdown" className={className} style={style} onClick={this.handleClick}>
                <div className={wrapperClassName} onClick={this.toggleOpen}>
                    { value }
                    <span className="dropdown__clear" onClick={this.handleClear}></span>
                    <span className="dropdown__arrow"></span>
                </div>
                { this.state.isOpened && this.renderOptions() }
                
            </div>
        );
    }

}