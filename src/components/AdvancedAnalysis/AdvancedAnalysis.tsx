import React, {useEffect, useState} from 'react'
import axios from "axios";




const AdvancedAnalysis : React.FC<any> = () => {

    const [htmlTable, setHtmlTable] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if(token) {
                    const config = {
                        headers : {
                            'Authorization' : `Bearer ${token}`
                        }
                    };
                    const table_id = localStorage.getItem("table_id");
                    const response = await axios.get(`http://127.0.0.1:8000/api/templates/visualize/${table_id}`, config);
                    setHtmlTable(response.data);
                }
            } catch(error) {
                console.log("Errors occured ", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className={"container mt-3"}>
            <div>
                <h4>{localStorage.getItem("table_name")}</h4>
                <div className="mt-3" dangerouslySetInnerHTML={{ __html: htmlTable }}>
                </div>
            </div>

        </div>
    )
}

export default AdvancedAnalysis;