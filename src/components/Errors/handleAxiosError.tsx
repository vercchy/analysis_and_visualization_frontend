import React from 'react'
import axios, {AxiosError} from 'axios';



const handleAxiosError = (error : any): string[] => {
    const fieldErrors: string[] = [];
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data && axiosError.response.status === 400) {
            const responseData: any = axiosError.response.data || {};

            for (const field in responseData) {
                if (Object.prototype.hasOwnProperty.call(responseData, field)) {
                    const fieldError = responseData[field];
                    if (Array.isArray(fieldError)) {
                        fieldErrors.push(...fieldError);
                    } else {
                        fieldErrors.push(fieldError);
                    }
                }
            }
        }

    }
    console.log(fieldErrors)
    return fieldErrors;
}

export default handleAxiosError;
