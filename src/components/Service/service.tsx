import React from 'react'
import instance from "../custom-axios/instance";

const Service = {
    fetchUserTables: (id:string) => {
        return instance.get(`/tables/${id}`)
    }
}

export default Service;