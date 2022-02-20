import "./Home.css";
import React from 'react';
import {Link} from "react-router-dom";

function Home(props) {
  return (
    <div className='home'>
        <div className="home-content">
             <h1 className="home-heading">THE RESTAURANT</h1>
             <p className="home-welcome">Welcomes you </p>
             <p className="home-message">to enjoy the tastiest meals</p>
             <Link to="/menu"><button className="btn btn-danger btn-lg">Have Something tasty</button></Link>
        </div>
    </div>
  )
}

export default Home;