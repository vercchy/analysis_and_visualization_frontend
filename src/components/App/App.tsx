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



interface AppProps {}


interface AppState {
    yourChartProps: IYourChartProps,
    my_user: IUser,
    csv_content : string
}



class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            my_user: {
                email : "",
                first_name : "",
                last_name : ""
            },
            csv_content : "",
            yourChartProps: {
                data: [
                    {id: 1, name: "Kiko"}, // Example IRow object
                    {id: 2, name: "Verche"},
                ],
                fields: [
                    {
                        fid: "id", key: "keyID", name: "id", basename: "id",
                        disable: false, semanticType: "ordinal", analyticType: "dimension"
                    }, // Example IMutField object
                    {
                        fid: "name", key: "keyName", name: "name", basename: "name",
                        disable: false, semanticType: "nominal", analyticType: "dimension"
                    },

                    // Add more IMutField objects as needed
                ],
            }




    }
  }

  componentDidMount() {
        this.fetchAllTables();
  }

    //{"user_email": "verchepetrushevska2@gmail.com", "user_first_name": "Verche", "user_last_name": "Petrushevska",
    // "csv_content": "name,age\r\nJohn,30\r\nAnna,20\r\nMaria,35", "uploaded_at": "2024-04-22T22:33:07Z"}

    fetchAllTables = () => {
        service.fetchAllTables()
            .then((data) => {
                this.setState({
                    my_user : {
                        email : data.data.user_email,
                        first_name : data.data.user_first_name,
                        last_name : data.data.user_last_name
                    },
                    csv_content : data.data.csv_content
                })
            })
    }


  render() {
    return(
        <Router>
            <div>
                <Routes>
                    <Route index element={<Home></Home>}></Route>
                    <Route path="/data"
                           element={ <YourChart data={this.state.yourChartProps.data}
                                                fields={this.state.yourChartProps.fields}></YourChart>
                    }></Route>
                    <Route path="/walker" element={<YourEmbeddingApp data={this.state.yourChartProps.data}
                        fields={this.state.yourChartProps.fields} ></YourEmbeddingApp>}></Route>
                    <Route path="/render" element={<RendererComp
                        my_user={this.state.my_user}
                        csv_content={this.state.csv_content}></RendererComp>}>

                    </Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>


                </Routes>
            </div>

        </Router>

    )
  }

}

export default App;
