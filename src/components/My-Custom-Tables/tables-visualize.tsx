import React, {Component} from 'react'
import Service from "../Service/service";
import createYourChartProps from "../functional/createYourChartProps";
import CreateYourChartProps from "../functional/createYourChartProps";
import {IYourChartProps} from "../interfaces/IYourChartProps";
import YourEmbeddingApp from "../EmbeddingApp/YourEmbeddingApp";

interface TablesVisualizeProps {
    id : string
}

interface TableVisualizeState {
    chartProperties : any
}

class TablesVisualize extends Component<TablesVisualizeProps, TableVisualizeState> {
    constructor(props : TablesVisualizeProps) {
        super(props);
        this.state = {
            chartProperties : {}
        }
    };

    componentDidMount() {
        const {id} = this.props
        this.fetchTableById(id)
    }

    fetchTableById = (id : string) => {
        Service.fetchTablesById(id)
            .then((data) => {
                console.log(data.data.csv_content)
                const yourChartProps = CreateYourChartProps(data.data.csv_content);
                this.setState({
                    chartProperties : yourChartProps
                })
            }, () => {
                console.log(this.state.chartProperties.data)
            })
        }


    render() {
        return (
            <YourEmbeddingApp data={this.state.chartProperties.data} fields={this.state.chartProperties.fields}></YourEmbeddingApp>
           // <div></div>
        )
    }

}

export default TablesVisualize;