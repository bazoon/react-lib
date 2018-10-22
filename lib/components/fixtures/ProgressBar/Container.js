import React, { Component } from 'react';
import Progress from '../../ProgressBar/ProgressBar';

export default class Menus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: this.props.progress
        }
    }
    
    handleChange = (e) => {
        this.setState({
            progress: e.target.value
        });
    }

    handleRun = () => {
        const me = this;

        if (this.isRunning) {
            clearInterval(me.timer);
        } else {
            me.timer = setInterval(run, 500);
            me.isRunning = true;
        }
        
        function run () {
            me.setState({
                progress: me.state.progress === 100 ? 0 : me.state.progress + 10
            });
        }
    }

    render() {

        const style = {
            width: 700,
            height: 700,
            background: '#fff',
            padding: '100px'
        };

        return (
            <>
                <div className="theme-white" style={style}>
                    <label>
                        <input value={this.state.progress} onChange={this.handleChange}/>
                    </label>
                    <button onClick={this.handleRun}>
                        {
                            this.isRunning ? 'Stop' : 'Run'
                        }
                    </button>
                    <br/><br/>
                    <Progress {...this.props} progress={this.state.progress}/>
                </div>
            </>
        );
    }

}