import React, {Component} from 'react'
import {useParams} from "react-router-dom";
import CreateYourChartProps from "../../functional/createYourChartProps";
import TablesVisualize from '../tables-visualize';




const TableVisualizationWrapper: React.FC = () => {
    let {id} = useParams();
    id = id !== undefined ? id : ''

    return <TablesVisualize id={id}></TablesVisualize>

}

export default TableVisualizationWrapper;