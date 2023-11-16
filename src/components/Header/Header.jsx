import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Header({ onSignOut, userEmail, loggedIn }) {
   const location = useLocation();

    return (
      <header className="header page__header">
        <img
          src={logo}
          className="header__logo"
          alt="логотип"
        />

    {location.pathname === "/sign-in" && (
        <Link className="header__link" to={"/sign-up"}>
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to={"/sign-in"}>
          Вход
        </Link>
      )}
      {loggedIn && (
        <>
          <div className="header__email-container">
            <p className="header__email">{userEmail}</p>
            
            <Link className="header__unlogin" to={"/sign-in"} onClick={onSignOut}>
              Выйти
            </Link>
          </div> 
        </> 
      )} 

      </header>
    )
}
