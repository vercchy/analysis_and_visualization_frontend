import React from 'react'
import {IUser} from "./interfaces/IUser";



interface IProps {
    my_user : IUser,
    csv_content : string
}

const rendererComp: React.FC<IProps> = ({my_user, csv_content}) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                            <th>email</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>csv content</th>
                        </tr>
                      </thead>
                       <tbody>
                       <tr>
                           <td>{my_user.email}</td>
                           <td>{my_user.first_name}</td>
                           <td>{my_user.last_name}</td>
                           <td>{csv_content}</td>
                       </tr>
                       </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default rendererComp;