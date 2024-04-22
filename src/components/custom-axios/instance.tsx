import React from 'react'
import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://127.0.0.1:8000/api',
    headers : {
        'Access-Control-Allow-Origin' : '*'
    }
});

export default instance;
