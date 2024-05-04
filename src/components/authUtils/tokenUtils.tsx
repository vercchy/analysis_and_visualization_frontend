import axios from 'axios';

const refreshToken = async (): Promise<string | undefined> => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if(refreshToken) {
            let response = await axios.post("http://127.0.0.1:8000/auth/token/refresh", {
               refresh : refreshToken
            })
            const {access} = response.data;
            localStorage.setItem("accessToken", access);
            return access;
        } else {
            console.log("User is not logged in");
        }


    } catch (err) {
        console.error("Error refreshing token: ", err);
    }
}

setInterval(refreshToken, 240000);