import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Navbar from "../../base_styling/Navbar";
import Footer from "../../base_styling/Footer";
import "../../../styles/add-file.css";




const AddTable = () => {

    const [title, setTitle] = useState<string>('');
    const [csv_file, setCsvFile] = useState<File | null>(null);
    const navigator = useNavigate();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const uploadedFile = event.target.files[0];
            setCsvFile(uploadedFile);
        }

    }
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        if (csv_file) {
            formData.append("csv_file", csv_file);
        }

        try {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const response = await axios.post("http://127.0.0.1:8000/api/templates/create/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + String(accessToken)
                    }
                });
                console.log("Form submitted successfully!", response.data)
                navigator('/tables');
            } else {
                console.log("User must be logged in to create a new table");
            }
        } catch (err) {
            console.log("Error submitting form: ", err);
        }

    }
    return (
        <>
            <Navbar isLoggedIn={true}></Navbar>
            <div className="container mt-5">
                <h5 className="mb-5 text-center text-4xl font-bold text-white tracking-wide bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent shadow-md">Add a new file</h5>
                <div className="add-file-container">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="title">Title</label>
                        <input className="inpdddut"
                               name="title"
                               type="text"
                               required
                               maxLength={100}
                               onChange={handleTitleChange}
                               id="title"/>
                        <label htmlFor="csv_file">Choose a file:</label>
                        <input accept=".csv" className="inpdddut" name="csv_file" id="csv_file"
                               required
                               onChange={handleFileChange}
                               type="file"/>
                        <input value="Send" type="submit" className="inpdddut"/>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AddTable;