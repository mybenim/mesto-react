import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Header({ name, dataUser, loggedIn }) {
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
          <div className="header__email">
            {dataUser}
            <Link className="header__unlogin" to={"/sign-in"} onClick={name}>
              Выйти
            </Link>
          </div>
        </>
      )} 


        { /*{name === "signup" || name === "signin" ?
        <Link to={name === "signup" ? "/sign-in" : "/sign-up"} className="header__link">
          {name !== "signup" ? "Регистрация" : "Войти"}
        </Link>
        :
        <>
          <div className={"header__email-container" ? "header__email-container_opened" : ""}>
            <p className="header__email">{dataUser}</p>
            <Link to={"/sign-in"} className="header__link" onClick={name}>Выйти</Link>
          </div> 
        </>
    } */}
      </header>
    )
}





//<header className={`header page__header ${count !== 0 ? "page__header_opened" : ""}`}></header>
//<button className={`header__button ${count !== 0 ? "header__button_active" : ""}`} onClick={handleClick}></button>