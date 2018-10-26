import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'

function getLabel(node) {
    const p = ((node.value / node.total) * 100).toFixed(0);

    return `${node.label} ${p}%`;
}

export default function (props) {
    return (
        <ResponsivePie
            data={props.pieData}
            margin={{
                "top": 40,
                // "right": 80,
                "bottom": 10,
                // "left": 80
            }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="nivo"
            colorBy="id"
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            radialLabel={getLabel}
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

    )
}