import React, {useEffect, useState} from 'react';
import axios from 'axios';
import handleAxiosError from "../Errors/handleAxiosError";
import {Link} from 'react-router-dom';

const Home : React.FC = () => {

    const [id, setId] = useState<string>('');
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    //dokolku postoi vakov token prethodno zachuvan so login na korisnikot vo localStorage
                    const config = {
                        headers : {
                            'Authorization' : `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/auth/user", config);
                    setId(response.data.id);
                    setLoggedIn(true);
                } else {
                    setId("");
                    setLoggedIn(false);
                }

            } catch(error) {
                setId("");
                setLoggedIn(false);

            }
        };
        checkLoggedInUser();
    }, []);

    const handleLogout = async () => {try {
            const token = localStorage.getItem("refreshToken");
            if(token) {
                await axios.post("http://127.0.0.1:8000/auth/logout", {
                    "refresh" : token
                })
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                setId("");
                setLoggedIn(false)
            }


        } catch(error) {
            console.log("Failed to logout")


        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <div className="container mt-5">
                    <div className="row">
                        <h2>Hi {id}. Thanks for logging in!</h2><br/>
                        <button className={"btn btn-outline-danger"} onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="row">
                        <div className={"col-md-2"}>
                            <Link to={`/tables`} className={"btn btn-light"}>My Files</Link>
                        </div>
                        <div className={"col-md-3"}>
                            <Link to={"/tables/create"} className={"btn btn-light"}>Add a new file</Link>
                        </div>


                    </div>

                </div>
            ) : (<div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Please login to continue</h2>
                    </div>
                    <div className="col-md-6">
                        <h2>Register if you are a new user</h2>
                    </div>
                    <div className="col-md-6">
                        <Link to={"/login"} className="btn btn-outline-success text-center">Login</Link>
                    </div>
                    <div className="col-md-6">
                        <Link to={"/register"} className="btn btn-outline-success text-center">Register</Link>
                    </div>


                </div>
            </div>)}

        </div>
    )
}

export default Home;