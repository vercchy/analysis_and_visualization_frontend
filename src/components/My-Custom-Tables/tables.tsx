import React, {Component} from 'react';
import service from "../Service/service";
import {Link, useParams} from "react-router-dom";
import {IYourChartProps} from "../interfaces/IYourChartProps";
import createYourChartProps from "../functional/createYourChartProps";
import YourEmbeddingApp from "../EmbeddingApp/YourEmbeddingApp";


interface TableProps {
    id : string
}

interface TableState {
    csv_content : string,
    uploaded_at : string,
    chartProperties : any

}

class Tables extends Component<TableProps, TableState> {
    constructor(props : TableProps) {
        super(props);
        this.state = {
            csv_content : '',
            uploaded_at : '',
            chartProperties : {}
        }
    };
    componentDidMount() {
        const {id} = this.props
        this.fetchUserData(id)

    }

    fetchUserData = (id: string) => {
        service.fetchUserTables(id)
            .then((data) => {
                const csv_content = data.data[0].csv_content;
                const chartProperties = createYourChartProps(csv_content);
                this.setState({
                    csv_content: csv_content,
                    uploaded_at: data.data[0].uploaded_at,
                    chartProperties : chartProperties
                }, () => {
                    console.log(this.state.chartProperties)
                })
            });

    }




    render() {
        return (
           <YourEmbeddingApp data={this.state.chartProperties.data} fields={this.state.chartProperties.fields}></YourEmbeddingApp>
        )
    }

}

export default Tables;