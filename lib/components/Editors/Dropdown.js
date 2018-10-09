import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Dropdown extends Component {

    static propTypes = {
        defaultValue: PropTypes.string,
        idField: PropTypes.string.isRequired,
        textField: PropTypes.string.isRequired,
        hasBlankChoice: PropTypes.bool,
        onChange: PropTypes.func,
        onFinishEdit: PropTypes.func,
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);
        
        this.state = {
            options: [],
            value: props.value,
        };
        
        if (props.store) {
            props.store.on('load', this.setOptions);
        }
    }

    componentWillUnmount() {
        this.props.store.un('load', this.setOptions);
    }

    componentDidMount() {
        this.props.store.load();
    }

    // componentDidUpdate(prevProps) {
    //     debugger
    //     if (this.state.value != this.props.value) {
    //         this.setState({
    //             value: this.props.value
    //         });
    //     }
    // }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({
            value: e.target.value,
        }, () => {
            if (this.props.onFinishEdit) {
                this.props.onFinishEdit(this.state.value);
            }
        });
    }

    setOptions = () => {
        const data = this.props.store.getData();

        let options = data.map((item) => {
            return {
                id: item[this.props.idField],
                value: item[this.props.textField],
            };
        })

        if (this.props.hasBlankChoice) {
            options.splice(0, 0, {
                id: -1,
                value: null,
            });
        }

        this.setState({
            options: options,
        });
        
    }

    render() {
        
        return (
            <select value={this.props.value}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={this.props.style}
                onBlur={this.props.onBlur}
            >
                {
                    this.state.options.map((o) => <option key={o.id} value={o.id}>{o.value}</option> )
                }
            </select>
        );
    }



}