import React, { Component } from "react";

export default (Grid) => class extends Component {

    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            columns: props.columns,
        };
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        let me = this;
        const element = me.gridRef.current;
        const parent = element.parentElement;
        parent.removeChild(element);
        const bounds = parent.getBoundingClientRect();
        parent.appendChild(element);
        
        this.state.columns.forEach((column) => {
            column.width = bounds.width * column.ratio;
        });

        this.setState({
            columns: this.state.columns,
            width: bounds.width
        });
    }

    render() {
        console.log(this.state);

        const gridStyle = { 
            maxWidth: this.state.width + 'px'
        };

        return (
            <React.Fragment>

               
                <div style={gridStyle} ref={this.gridRef}>
                    <Grid {...this.props} columns={this.state.columns}/>
                </div>
            </React.Fragment>
        );
    }

}
