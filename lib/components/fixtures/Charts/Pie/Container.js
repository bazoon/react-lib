import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'


export default class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    

    

    render() {
        const style = {
            width: '800px',
            height: '400px',
            position: 'relative',
            background: '#fff'
        };

        const textStyle = {
            position: 'absolute',
            top: 165,
            left: 310
        };

        return (
            <div style={style}>
                <ResponsivePie
                    data={this.props.data}
                    margin={{
                        "top": 40,
                        "right": 80,
                        "bottom": 80,
                        // "left": 80
                    }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors="nivo"
                    colorBy="id"
                    borderWidth={1}
                    borderColor="inherit:darker(0.2)"
                    radialLabel="label"
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor="inherit"
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                                       
                />
                <div style={textStyle}>
                    Проектов 189
                </div>
            </div>
        );
    }

}