import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import {IYourChartProps} from "../interfaces/IYourChartProps";
import {IUser} from "../interfaces/IUser";
import Home from '../Home/home';
//User authentication components
import Register from '../Authentication/Register/register';
import Login from '../Authentication/Login/login';

import Tables from '../My-Custom-Tables/tables'
import AddTable from "../My-Custom-Tables/Add-New-Table/AddTable";
import AdvancedAnalysis from "../AdvancedAnalysis/AdvancedAnalysis";
import "../../styles/custom.css"
import "../../styles/loginform.css"


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


  render() {
    return(
        <Router>
            <div>
                <Routes>
                    <Route index element={<Home></Home>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/tables" element={<Tables></Tables>}></Route>
                    <Route path="/tables/create" element={<AddTable></AddTable>}></Route>
                    <Route path="/tables/advanced" element={<AdvancedAnalysis csv_content={""}></AdvancedAnalysis>}></Route>
                </Routes>
            </div>

        </Router>

    )
  }

}

export default App;
