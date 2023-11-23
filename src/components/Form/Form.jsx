import React from "react";
import { Link } from "react-router-dom";

export default function Form ({ name, title, titleButton, children, onSubmit }) {
    
    return (
    <section className="login page__login">
      <div className="login__content">
        <form className="login__form" 
            name={name} 
            noValidate 
            onSubmit={onSubmit}>
              
              <h2 className="login__title">{title}</h2>
              
                  {children}
              
              <button type="submit" className="login__button">{titleButton}</button> 
              
              {name === "register" && (
                <p className="login__subtitle">
                  Уже зарегистрированы?{' '}
                <Link className="login__subtitle-link" to="/sign-in">
                  Войти
                </Link>
                </p>
              )}
        </form>
      </div>
    </section>
    );
}