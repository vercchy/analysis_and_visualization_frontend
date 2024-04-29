import React from 'react'
import instance from "../custom-axios/instance";

const Service = {
    fetchUserTables: (id:string) => {
        return instance.get(`/tables/${id}`)
    },
    fetchTablesById : (id:string) => {
        return instance.get(`/tables/detail/${id}`)

    }
}

export default Service;