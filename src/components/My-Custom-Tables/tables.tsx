import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CreateYourChartProps from "../functional/createYourChartProps";
import YourEmbeddingApp from "../EmbeddingApp/YourEmbeddingApp";
import {Link} from "react-router-dom";
import Navbar from "../base_styling/Navbar";
import "../../styles/my-tables.css";
import Footer from "../base_styling/Footer";
import home from '../Home/home';


const Tables: React.FC = () => {
    const [tableMap, setTableMap]
        = useState<Map<number, string[]>>(new Map<number, string[]>());
    const [chartProps, setChartProps] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getTables();

    }, []);

    const handleButtonClick = (param1: string) => {
        console.log("Button clicked");
        const props = CreateYourChartProps(param1);
        setChartProps(props);
        console.log(props)

    }

    const redirectToAdvanced = (param1: number | null, param2: string | undefined) => {
        if (param1 != null) {
            localStorage.setItem("table_id", param1.toString());
            if (param2 != undefined) {
                localStorage.setItem("table_name", param2);
            }
            window.open("http://localhost:3000/tables/advanced", "_self")
        }

    }

    const RenderEmbeddingApp = () => {
        if (chartProps) {
            return <YourEmbeddingApp data={chartProps.data} fields={chartProps.fields}/>;
        } else {
            return null; // Or any default component you want to render if chartProps is null
        }
    };


    let getTables = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                let response = await axios.get("http://127.0.0.1:8000/api/templates/", {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + String(accessToken)
                    }
                })
                const data = response.data;

                const ids = data.map((item: any) => item.id);
                const titles = data.map((item: any) => item.title);
                const contents = data.map((item: any) => item.csv_content);
                const tableMap = new Map<number, string[]>();
                for (let i = 0; i < ids.length; i++) {
                    if (!tableMap.has(ids[i])) {
                        tableMap.set(ids[i], []);
                    }
                    tableMap.get(ids[i])?.push(titles[i]);
                    tableMap.get(ids[i])?.push(contents[i]);
                }
                setTableMap(tableMap);

            }
        } catch (err: any) {
            console.log(err);
            setError(err)
        }
    }
    return (
        <>
            {
                chartProps ? null : (
                    <>
                        <Navbar isLoggedIn={true}></Navbar>
                        <div className="container mt-5">
                            <div className="text-center my-8">
                                <h1 className="mb-5 text-4xl font-bold text-white tracking-wide bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent shadow-md">
                                    My Tables
                                </h1>
                            </div>
                            <div className="row">
                                {Array.from(tableMap.keys()).map((key) => (
                                    <div className="col-md-4">
                                        <div className="bgblue">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{tableMap.get(key)?.at(0)}</h5>

                                                </div>
                                                <button
                                                    className={"btn btn-outline-primary ml-2"}
                                                    onClick={() => handleButtonClick(tableMap.get(key)?.at(1) || '')}
                                                    key={key} // Don't forget to add a key when using map
                                                >
                                                    Visualize
                                                </button>
                                                <button
                                                    className={"btn btn-outline-info ml-2 mt-3"}
                                                    onClick={() => redirectToAdvanced(key, tableMap.get(key)?.at(0))}
                                                    key={key + 25} // Don't forget to add a key when using map
                                                >
                                                    Advanced Operations
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                                {error &&
                                    <div className="container mt-3">
                                        <h3>Your session expired. Please login again</h3>
                                        <Link to={"/login"} className={"btn btn-outline-primary"}>Login</Link></div>}
                            </div>
                        </div>
                        <Footer></Footer>
                    </>
                )
            }
            {/* Render the embedding app conditionally */}
            {chartProps && <RenderEmbeddingApp/>}
        </>
    );


}

export default Tables;




