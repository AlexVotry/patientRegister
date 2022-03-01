import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Scheduler from '../Scheduler/Scheduler';
import AllPatients from '../AllPatients/AllPatients';
import UserContext from '../../contexts/UserContext';
import Auth from '../Login/Auth';
import './App.css';

export default function App() {
  const [user] = UserContext.useUser();

  const correctPage = () => {
    if (user.email) {
      console.log('correctpage:', user);
      return <Pages />
    }
    return <Auth />
  }

  function Pages(){
    return (
      <div className="container">
        <Router>
          <Header className="done-header" />
          <Routes>
            <Route exact path="/" element={<Home auth={true} />} />
            <Route exact path="/scheduler" element={<Scheduler />} />
            <Route exact path="/allPatients" element={<AllPatients />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return correctPage();
}

