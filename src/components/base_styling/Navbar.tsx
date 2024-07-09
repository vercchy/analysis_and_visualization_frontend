import React from 'react';


interface NavBarProp {
    handleLogout?: () => void,
    isLoggedIn: boolean
}


const Navbar: React.FC<NavBarProp> = ({handleLogout = () => {}, isLoggedIn}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <a className="navbar-brand" href="/">Tabular Wizard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link-custom nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link-custom nav-link" href="/tables">My Files</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link-custom nav-link" href="/tables/create">Add New File</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={handleLogout} className="nav-link-custom nav-link" href="#"
                                       id="logout">Logout</a>

                                </li>
                            </>) :
                        (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link-custom nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link-custom nav-link" href="/register">Register</a>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;