import React, {ChangeEvent} from 'react'
import axios, {AxiosError} from 'axios';
import handleAxiosError from "../Errors/handleAxiosError";

const Register:  React.FC = () => {
    const [formData, updateFormData] = React.useState({
        email : '',
        password1 : '',
        password2 : '',
        first_name : '',
        last_name : '',
        date_of_birth : ''

    })

    const [errors, setErrors] = React.useState<string[]>([]);
    //state to hold validation errors

    const [success, setSuccess] = React.useState<string>('');




    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        updateFormData({
            ...formData,
            [name]  : value
        })

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/register", formData);
            setSuccess("User was created successfully");
            updateFormData({
                email: '',
                password1: '',
                password2: '',
                first_name: '',
                last_name: '',
                date_of_birth: ''
            });
            setErrors([]);

        } catch(error) {
            const fieldErrors = handleAxiosError(error);
            setErrors(fieldErrors);
        }
    }



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register a New User Here</h5>
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
                                           value={formData.email}
                                           onChange={handleChange}
                                           placeholder={"Enter email"}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor={"first_name"}>First name</label><span style={{color: 'red'}}> *</span>
                                    <input type={"text"}
                                           className={"form-control"}
                                           id={"first_name"}
                                           name={"first_name"}
                                           value={formData.first_name}
                                           onChange={handleChange}
                                           placeholder={"Enter first name"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"last_name"}>Last name</label> <span style={{color: 'red'}}> *</span>
                                    <input type={"text"}
                                           className={"form-control"}
                                           id={"last_name"}
                                           name={"last_name"}
                                           value={formData.last_name}
                                           onChange={handleChange}
                                           placeholder={"Enter last name"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"date_of_birth"}>Date of birth</label> <span
                                    style={{color: 'red'}}> *</span>
                                    <input type={"text"}
                                           className={"form-control"}
                                           id={"date_of_birth"}
                                           name={"date_of_birth"}
                                           value={formData.date_of_birth}
                                           onChange={handleChange}
                                           placeholder={"YYYY-MM-DD"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"password1"}>Password</label> <span style={{color: 'red'}}> *</span>
                                    <input type={"password"}
                                           className={"form-control"}
                                           id={"password1"}
                                           name={"password1"}
                                           value={formData.password1}
                                           onChange={handleChange}
                                           placeholder={"Enter password"}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"password2"}>Confirm Password</label> <span
                                    style={{color: 'red'}}> *</span>
                                    <input type={"password"}
                                           className={"form-control"}
                                           id={"password2"}
                                           name={"password2"}
                                           value={formData.password2}
                                           onChange={handleChange}
                                           placeholder={"Enter password again"}/>
                                </div>
                                {success ? <p style={{color:'green'}}>{success}</p> : ''}

                                <button type={"submit"}
                                            className={"btn btn-primary"}>Submit
                                    </button>

                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Register;