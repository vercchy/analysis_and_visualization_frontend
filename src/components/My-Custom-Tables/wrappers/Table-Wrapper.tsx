import React, {Component} from 'react'
import {useParams} from "react-router-dom";
import Table from '../tables';
import {IYourChartProps} from "../../interfaces/IYourChartProps";



const TableWrapper: React.FC = () => {
    let {id} = useParams();
    id = id !== undefined ? id : ''
    return <Table id={id} ></Table>
}

export default TableWrapper;