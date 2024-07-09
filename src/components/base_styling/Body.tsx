import DataScienceImg from '../../images/datascience.jpg';
import DataAnalysisImg from '../../images/datascience2.jpg';
import React from 'react';

interface BodyProps {
    isLoggedIn: boolean;
}

const Body: React.FC<BodyProps> = ({isLoggedIn}) => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="intro-heading">Welcome to Tabular Wizard!</h1>
                <p className="intro-text">
                    Tabular Wizard is your all-in-one solution for managing, visualizing, and analyzing tabular data.
                </p>
            </div>
            <div className="row">
                <div
                    className="col-md-6"
                    style={{
                        backgroundImage: `url(${DataScienceImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            padding: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <div>
                            <h5 className="card-title intro-text">Upload your data and manage your files</h5>
                            <p className="card-text">Keep all your data files organized and accessible in one place.</p>
                            {isLoggedIn ? (
                                <button
                                    className="button-custom mb-2"
                                    onClick={() => {
                                        window.location.href = '/tables/create';
                                    }}
                                >
                                    Add a New File
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div
                    className="col-md-6"
                    style={{
                        backgroundImage: `url(${DataAnalysisImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            padding: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <div>
                            <h5 className="card-title intro-text">Visualize data and analyze trends</h5>
                            <p className="card-text">
                                Whether you're a data scientist, analyst, or simply someone who loves working with data,
                                our platform
                                offers powerful tools to help you make sense of your numbers.
                            </p>
                            {isLoggedIn ? (
                                <button
                                    className="button-custom mb-2"
                                    onClick={() => {
                                        window.location.href = '/tables';
                                    }}
                                >
                                    My Tables
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
