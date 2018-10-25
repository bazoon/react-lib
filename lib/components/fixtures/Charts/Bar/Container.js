import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'


export default class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    getColor(node) {
        return node.data.color;
    } 

    getTooltip(node) {
        return `${node.data.country}: ${node.data.value}`;
    }

    render() {
        const style = {
            width: '800px',
            height: '200px',
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
                 <ResponsiveBar
                    data={this.props.data}
                    keys={[
                        'value',
                        
                    ]}
                    indexBy="country"
                    margin={{
                        "top": 50,
                        "right": 30,
                        "bottom": 50,
                        "left": 160
                    }}
                    padding={0.3}
                    enableGridX={true}
                    enableGridY={false}
                    layout="horizontal"
                    colors="nivo"
                    // colorBy="id"
                    colorBy={this.getColor}
                    tooltip={this.getTooltip}
                    fill={[
                        {
                            "match": {
                                "id": "fries"
                            },
                            "id": "dots"
                        },
                        {
                            "match": {
                                "id": "sandwich"
                            },
                            "id": "lines"
                        }
                    ]}
                    borderColor="inherit:darker(1.6)"
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legendPosition": "center",
                        "legendOffset": 36
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="#fff"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    
                />
            </div>
        );
    }

}