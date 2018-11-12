import React, { Component } from "react";

export default (Grid, topOffset) => class extends Component {

    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            columns: props.columns
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
        let bounds = parent.getBoundingClientRect();
        let width = bounds.width;
        
        let height = window.innerHeight - topOffset;
        parent.removeChild(element);
        bounds = parent.getBoundingClientRect();
        let widthWithoutChild = bounds.width;
        parent.appendChild(element);
        
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        width = Math.min(width, widthWithoutChild) - scrollWidth;


        // this.state.columns.forEach((column) => {
        //     column.width = width * column.ratio;
        //     if (column.columns) {
        //         updateChildColumns(column);
        //     }
        // });
        
        const columnsWidth = this.state.columns.reduce((a, c) => a + c.width, 0);
        this.setState({
            columns: this.state.columns,
            width: width,
            height
        });


        function updateChildColumns(column) {
            const width = column.width;
            column.columns.forEach((c) => c.width = width / column.columns.length);
        }


    }

    render() {
        const gridStyle = { 
            maxWidth: this.state.width + 'px',

        };

        return (
            <React.Fragment>
                <div style={gridStyle} ref={this.gridRef}>
                    <Grid {...this.props} columns={this.state.columns} height={this.state.height}/>
                </div>
            </React.Fragment>
        );
    }

}
