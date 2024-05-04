import React, {ChangeEvent} from 'react'
import axios, {AxiosError} from 'axios';
import handleAxiosError from "../Errors/handleAxiosError";
import {Link, useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [formData, updateFormData] = React.useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate();

    const [errors, setErrors] = React.useState<string[]>([]);
    //state to hold validation errors

    const [success, setSuccess] = React.useState<string>('');

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target;
        updateFormData({
            ...formData,
            [name] : value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login", formData);
            setErrors([]);
            setSuccess("User logged in successfully!");
            localStorage.setItem("accessToken", response.data.tokens.access)
            localStorage.setItem("refreshToken", response.data.tokens.refresh)
            navigate("/")
        } catch (error) {
          const fieldErrors = handleAxiosError(error);
          setSuccess('');
          setErrors(fieldErrors);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Login</h5>
                            <form onSubmit={handleSubmit}>
                                {Object.entries(errors).map(([fieldName, errorMessage]) =>  {
                                    return (
                                        <div>
                                            {errorMessage !== 'This field may not be blank.'
                                                && (<p style={{color:'red'}}>{errorMessage}</p>)}
                                        </div>
                                    )
                                })}
                                <div className="form-group">
                                    <label htmlFor={"email"}>Email address</label><span style={{color: 'red'}}> *</span>
                                    <input type={"email"}
                                           className={"form-control"}
                                           id={"email"}
                                           name={"email"}
                                           onChange={handleChange}
                                           placeholder={"Enter email"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"password"}>Password</label> <span style={{color: 'red'}}> *</span>
                                    <input type={"password"}
                                           className={"form-control"}
                                           id={"password"}
                                           name={"password"}
                                           onChange={handleChange}
                                           placeholder={"Enter password"}/>
                                </div>
                                {success ? <p style={{color:'green'}}>{success}</p> : ''}
                                <button type={"submit"}
                                        className={"btn btn-primary"}>Submit
                                </button>
                                <span className={"ml-5 mr-5"}>New to our platform?</span>
                                <Link className={"btn btn-outline-primary"} to={"/register"}>Register</Link>

                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login;