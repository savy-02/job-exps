import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import './App.css';

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Job Experiences</Link>
      <nav>
        {username && (
          <>
          <div className="lks"><Link to="/create">Share your experience</Link></div>
            <a onClick={logout} className="lks">Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="lks">Login</Link>
            <Link to="/register" className="lks">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}