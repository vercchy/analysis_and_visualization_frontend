import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home : React.FC = () => {

    const [id, setId] = useState<string>('');
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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

    return (
        <div>
            {isLoggedIn ? (
                <h2>Hi {id}. Thanks for logging in!</h2>
            ) : <h2>Please login</h2>}
        </div>
    )
}

export default Home;