import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'

function getColor(node) {
    return node.data.color;
} 

function getTooltip(node) {
    return `${node.data.country}: ${node.data.value}`;
}

export default function (props) {
    return (
        <ResponsiveBar
            data={props.barData}
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
            colorBy={getColor}
            tooltip={getTooltip}
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
    )
}