import React, { Component } from 'react';
import Modal from '../../Modal/Modal';


const ratio = 1.618;
const small = 200;
const medium = 400;
const large = 600;

export default class Modals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            width: props.width,
            height: props.height
        };
    }

    handleClick = () => {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    handleClose = () => {
        this.setState({
            isOpened: false
        });
    }

    handleChangeHeight = (e) => {
        this.setState({
            height: e.target.value || this.props.height
        })
    }

    handleChangeWidth = (e) => {
        this.setState({
            width: e.target.value || this.props.width
        })
    }

    handleSmall = () => {
        this.setState({
            isOpened: true,
            width: small * ratio,
            height: small
        });
    }

    handleMedium = () => {
        this.setState({
            isOpened: true,
            width: medium * ratio,
            height: medium
        });
        
    }

    handleLarge = () => {
        this.setState({
            isOpened: true,
            width: large * ratio,
            height: large
        });
    }
    

    render() {
        return (
            <>  
                <div>
                    <button onClick={this.handleClick}>Open</button>
                    <button onClick={this.handleSmall}>Small</button>
                    <button onClick={this.handleMedium}>Medium</button>
                    <button onClick={this.handleLarge}>Large</button>
                    <br/>
                    <br/>
                    <label>Ширина
                        <input value={this.state.width} onChange={this.handleChangeWidth}/>
                    </label>
                    <label>Высота
                        <input value={this.state.height} onChange={this.handleChangeHeight}/>
                    </label>
                </div>
                <div className="theme-white">
                   
                    <Modal {...this.props} onClose={this.handleClose} 
                        isOpened={this.state.isOpened}
                        width={this.state.width}
                        height={this.state.height}
                    />
                </div>
            </>
        );
    }


}