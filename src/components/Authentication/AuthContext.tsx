import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import axios from "axios";


interface AuthContextType {
    isLoggedIn: boolean;
    handleLogout : () => void;
    handleLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }

            } catch (error) {
                setLoggedIn(false);

            }
        };   checkLoggedInUser();
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
                setLoggedIn(false)
                window.location.href = '/login';
            }


        } catch (error) {
            console.log("Failed to logout")


        }
    }

    const handleLogin = () => {
        setLoggedIn(true);
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, handleLogout, handleLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


