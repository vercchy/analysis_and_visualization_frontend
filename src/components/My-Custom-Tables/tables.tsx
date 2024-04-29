import React, {Component} from 'react';
import service from "../Service/service";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';



interface TableProps {
    id : string,
}

interface TableState {
   tableMap : Map<number, string>


}

class Tables extends Component<TableProps, TableState> {
    constructor(props : TableProps) {
        super(props);
        this.state = {
           tableMap : new Map<number, string>()
        }
    };
    componentDidMount() {
        const {id} = this.props
        this.fetchUserData(id);

    }

    fetchUserData = async (id: string) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const config = {
                headers : {
                    'Authorization' : `Bearer ${accessToken}`
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/api/tables/${id}`, config);
            const data = response.data;
            console.log(data)

            const ids = data.map((item:any) => item.id);
            const titles = data.map((item:any) => item.title);
            const tableMap = new Map<number, string>();
            for(let i = 0; i < ids.length; i++) {
                tableMap.set(ids[i], titles[i]);
            }
            this.setState({
                tableMap : tableMap
            });
        } catch (error) {
            console.error("Error fetching table data:", error);
        }



    }


    render() {
        return (
          <div className="container mt-5">
              <h4 className="mb-3">My tables</h4>
              {Array.from(this.state.tableMap.keys()).map((key) => (
                  <div className="row">
                      <Link to={`/tables/visualize/${key}`}>{this.state.tableMap.get(key)}</Link>
                  </div>

              ) )}
          </div>

        )
    }

}

export default Tables;