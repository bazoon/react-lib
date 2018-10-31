import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from '../../../utils/debounce';
import './search.scss';
import searchIcon from '../icons/search.svg';
import waitingIcon from '../icons/waiting.svg';

export default class extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        store: PropTypes.object,
        idField: PropTypes.string,
        titleField: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            value: '',
            isLoading: false
        };
        
        this.props.store.on('load', this.setLoadedState);
        this.props.store.on('beforeload', this.setLoadingState);

        this.filter = debounce((options) => this.props.store.filter(options), 1000);
        this.inputRef = React.createRef();
    }

    setLoadedState = () => {
        this.setState({
            isOpened: this.props.store.getCount() > 0,
            isLoading: false
        });
    }

    setLoadingState = () => {
        this.setState({
            isLoading: true
        });
    }

    componentDidMount() {
        this.node = this.inputRef.current;
        document.body.addEventListener('click', this.handleOnClick);
    }

    close() {
        this.setState({
            isOpened: false
        });    
    }

    open() {
        this.setState({
            isOpened: true
        });    
    }

    handleOnClick = (e) => {
        const id = (e.target.dataset && e.target.dataset.id) || (e.target.parentElement && e.target.parentElement.dataset.id);
        
        switch(true) {
            case !!id:
                this.choose(id);
                break;
            case e.target !== this.node:
                this.close();
                break;
            case this.state.isOpened === false && !!this.state.value:
                this.open();
        }
    }

    componentWillUnmount() {
        this.props.store.un('load', this.setLoadedState);
        document.body.removeEventListener('click', this.handleOnClick);
    }

    choose(id) {
        if (id) {
            const item = this.props.store.findById(id);
            const value = item[this.props.titleField];

            if (this.props.onChange) {
                this.props.onChange(id, value);
            }
            
            this.setState({
                selectedOptionId: id,
                isOpened: false,
                value: value
            });
        }
    }

    handleChange = (e) => {
        if (e.target.value) {
            this.filter({
                value: e.target.value,
                field: this.props.titleField,
            });
        }

        this.setState({
            value: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(undefined, undefined);
        }        

    }

    handleKeyPress = (e) => {
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
        }
        
        const target = e.target;
        
        switch(true) {
            case e.keyCode === 40 && target === this.inputRef.current:
                e.target.parentElement.parentElement.querySelector('.search__results-item').focus();
                break;
            case e.keyCode === 9:
                target && target.focus();
                break;
            case e.keyCode === 38:
                target && target.previousSibling && target.previousSibling.focus();
                break;
            case e.keyCode === 40:
                target && target.nextSibling && target.nextSibling.focus();
                break;
            case e.keyCode === 13:
                const id = e.target.dataset && e.target.dataset.id;
                this.choose(id);
        }
    }

    // Renders
    renderItem(item, index) {
        const title = item[this.props.titleField];
        const id = item[this.props.idField];

        return (
            <div data-id={id} tabIndex={0} key={id} className="search__results-item">
                <div>
                    { title }
                </div>
            </div>
        )
    }

    renderResults(resultsStyle) {
        if (!this.state.value || !this.state.isOpened) return null;
        const items = this.props.store.getData();
        return (
            <div className="search__results" style={resultsStyle}>
                { items.map((item, index) => this.renderItem(item, index)) }
            </div>
        )
    }
    
    render() {
        const style = {
            width: this.props.width ? this.props.width + 'px' : '100%'
        };

        const inputStyle = {
            width: style.width
        };

        const resultsStyle = {
            width: style.width
        };

        return (
            <div className="search" style={style} onKeyDown={this.handleKeyPress}>
                <div className="search__input" style={inputStyle}>
                    <input ref={this.inputRef} disabled={this.props.disabled} tabIndex={0} value={this.state.value} onChange={this.handleChange} style={inputStyle}/>
                    {
                        this.state.isLoading ? 
                            <img className="search__icon" src={waitingIcon} />
                        :
                            <img className="search__icon" src={searchIcon} />
                    }
                    
                
                
                </div>
                { this.renderResults(resultsStyle) }
                
            </div>
        );
    }
}
