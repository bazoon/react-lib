import React, { Component } from 'react';
import Modal from '../../../Modal/Modal';
import DropDown from '../../../Editors/Dropdown';
import Text from '../../../Editors/Text';
import DataStore from '../../../Stores/DataStore';



export default class EditWindow extends Component {


    constructor(props) {
        super(props);
        this.leaderStore = new DataStore({
            fields: ['id', 'name'], 
            url: 'http://localhost:3000/leaders'
        });
        this.inputRef = React.createRef();
    }

    handleLastFocus = () => {
        const node = this.inputRef.current;
        node && node.input.focus();
    }

    focusFirstInput() {
        const node = this.inputRef.current;
        node && node.input.focus();
    }


    render() {
        const fieldStyle = {
            width: '100%',
            marginBottom: '10px'
        }
        return (
            <Modal isOpened={this.props.isOpened} 
                    onClose={this.props.onClose}
                    onSave={this.props.onSave}
            >

                <div style={fieldStyle}>
                    <label>
                        Код
                        <Text onChange={(e) => this.props.onChangeField("code", e)} ref={this.inputRef} value={this.props.editItem.code}></Text>
                    </label>
                </div>
                <div style={fieldStyle}>
                    <label>
                        Имя
                        <Text value={this.props.editItem.name} onChange={(e) => this.props.onChangeField("name", e)}></Text>
                    </label>
                </div>
                <div style={fieldStyle}>
                    <label>
                        Руководитель
                        <DropDown onChange={(e) => this.props.onChangeField("leader", e)} value={this.props.editItem.leader} idField="name" textField="name" store={this.leaderStore} onBlur={this.handleLastFocus} hasBlankChoice/>
                    </label>
                </div>


            
            </Modal>
        );


    }

}
