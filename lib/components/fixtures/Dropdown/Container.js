import React, { Component } from 'react';
import Dropdown from '../../Dropdown/Dropdown';

export default class Dropdowns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleChecked = (e) => {
        this.setState({
            checked: !this.state.checked
        });
    }

    render() {
        const style = {
            width: 700,
            height: 500,
            background: '#fff',
            padding: '30px',
            boxSizing: 'border-box'
        };

        return (
            <>
                <div className="theme-white" style={style}>
                    <div style={{width: '300px'}}>
                        <Dropdown {...this.props}

                        />

                    </div>
                    <div>
                        Ad aute proident velit pariatur ut. Irure minim sint proident excepteur sit id dolore ut veniam ullamco do adipisicing consectetur enim. Velit nulla culpa dolore magna aute mollit laboris nostrud. Velit anim duis commodo dolore veniam amet. Incididunt elit incididunt ad fugiat dolore.

                        Fugiat cupidatat in excepteur fugiat ex ex mollit labore dolor. Ut nisi elit est enim officia aliquip ea. Non occaecat magna in ea elit magna qui commodo quis in proident velit. Aliquip ipsum laboris aliquip incididunt adipisicing magna.
                    </div>
                    
                </div>
                
            </>
        );
    }

}