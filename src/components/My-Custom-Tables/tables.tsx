import React, {Component, useEffect, useState} from 'react';
import service from "../Service/service";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import {tab} from "@testing-library/user-event/dist/tab";


const Tables: React.FC = () => {
    const [tables, setTables] = useState([]);
    const [tableMap, setTableMap] = useState<Map<number, string>>(new Map<number, string>());

    useEffect(() => {
        getTables();

    }, []);

    let getTables = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if(accessToken) {
              let response = await axios.get("http://127.0.0.1:8000/api/tables", {
                    method : 'get',
                    headers : {
                        'Authorization' : 'Bearer ' + String(accessToken)
                    }
                })
                const data = response.data;
                const ids = data.map((item:any) => item.id);
                const titles = data.map((item:any) => item.title);
                const tableMap = new Map<number, string>();
                for(let i = 0; i < ids.length; i++) {
                    tableMap.set(ids[i], titles[i]);
                }
                setTableMap(tableMap);

            }
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="container mt-5">
            <h4 className="mb-3">My tables</h4>
            {Array.from(tableMap.keys()).map((key) => (
                <div className="row">
                    <Link to={`/tables/visualize/${key}`}>{tableMap.get(key)}</Link>
                </div>

            ) )}
        </div>

    )
}

export default Tables;




