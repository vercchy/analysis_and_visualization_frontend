import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddTable = () => {

    const [title, setTitle] = useState<string>('');
    const [csv_file, setCsvFile] = useState<File | null>(null);
    const navigator = useNavigate();

    const handleTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFileChange = ( event : React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0) {
            const uploadedFile = event.target.files[0];
            setCsvFile(uploadedFile);
        }

    }
    const handleFormSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        if (csv_file) {
            formData.append("csv_file", csv_file);
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            if(accessToken) {
            const response = await axios.post("http://127.0.0.1:8000/api/tables/create/", formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : 'Bearer ' + String(accessToken)
                }
            });
                console.log("Form submitted successfully!", response.data)
                navigator('/tables');
            } else {
                console.log("User must be logged in to create a new table");
            }
        } catch(err) {
            console.log("Error submitting form: ", err);
        }

    }
    return (
        <div className="container mt-5">
            <h5 className="mb-5">Add a new file</h5>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className="form-control"
                                   name="title"
                                   type="text"
                                   required
                                   maxLength={100}
                                   onChange={handleTitleChange}
                                   id="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="csv_file">Upload CSV File</label>
                            <input className="form-control-file"
                                   name="csv_file"
                                   type="file"
                                   accept=".csv"
                                   required
                                   onChange={handleFileChange}
                                   id="csv_file"/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default AddTable;