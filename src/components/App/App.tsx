import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import {IYourChartProps} from "../interfaces/IYourChartProps";
import YourChart from "../TableView/YourChart";
import YourEmbeddingApp from '../EmbeddingApp/YourEmbeddingApp';
import service from "../Service/service";
import {IUser} from "../interfaces/IUser";
//Home component
import Home from '../Home/home';
//User authentication components
import Register from '../Register/register';
import Login from '../Login/login';


import RendererComp from "../renderedData";
import TableVisualizationWrapper from "../My-Custom-Tables/wrappers/Table-Visualization-Wrapper";
import Tables from '../My-Custom-Tables/tables'




interface AppProps {
}


interface AppState {
    yourChartProps: IYourChartProps,
    my_user: IUser,
    csv_content : string
}



class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
  }

  componentDidMount() {

  }


  render() {
    return(
        <Router>
            <div>
                <Routes>
                    <Route index element={<Home></Home>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/tables/visualize/:id" element={<TableVisualizationWrapper></TableVisualizationWrapper>}></Route>
                    <Route path="/tables" element={<Tables></Tables>}></Route>



                </Routes>
            </div>

        </Router>

    )
  }

}

export default App;
