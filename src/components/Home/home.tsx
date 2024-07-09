import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from "../base_styling/Navbar";
import Footer from "../base_styling/Footer";
import Body from "../base_styling/Body";


const Home: React.FC = () => {

    const [id, setId] = useState<string>('');
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    //dokolku postoi vakov token prethodno zachuvan so login na korisnikot vo localStorage
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/auth/user", config);
                    setId(response.data.id);
                    setLoggedIn(true);
                } else {
                    setId("");
                    setLoggedIn(false);
                }

            } catch (error) {
                setId("");
                setLoggedIn(false);

            }
        };
        checkLoggedInUser();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("refreshToken");
            if (token) {
                await axios.post("http://127.0.0.1:8000/auth/logout", {
                    "refresh": token
                })
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                setId("");
                setLoggedIn(false)
            }


        } catch (error) {
            console.log("Failed to logout")


        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <body className="text-white">
                <Navbar handleLogout={handleLogout} isLoggedIn={true}></Navbar>
                <Body isLoggedIn={true}></Body>
                <Footer></Footer>
                </body>
            ) : (<body className="text-white">
            <Navbar handleLogout={handleLogout} isLoggedIn={false}></Navbar>
            <Body isLoggedIn={false}></Body>
            <p className="intro-text mt-3">
                Already a registered user? <a style={{"color" : "white"}} href="/login">Login</a>
            </p>
            <p className="intro-text"><a style={{"color" : "white"}} href="/register">Register</a></p>
            <Footer></Footer>
            </body>)}

        </div>
    )
}

export default Home;