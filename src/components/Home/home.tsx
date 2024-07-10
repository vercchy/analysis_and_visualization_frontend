import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from "../base_styling/Navbar";
import Footer from "../base_styling/Footer";
import Body from "../base_styling/Body";
import {useAuth} from "../Authentication/AuthContext";


const Home: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const [errors, setErrors] = React.useState<string[]>([]);

    return (
        <div>
            {isLoggedIn ? (
                <body className="text-white">
                <Navbar></Navbar>
                <Body isLoggedIn={true}></Body>
                <Footer></Footer>
                </body>
            ) : (<body className="text-white">
            <Navbar></Navbar>
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