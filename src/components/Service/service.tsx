import React from 'react'
import instance from "../custom-axios/instance";

const Service = {
    fetchAllTables: () => {
        return instance.get("/home");
    }
}

export default Service;