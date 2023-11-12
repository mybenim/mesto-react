import React from "react";
import Form from "../Form/Form";

export default function Input({ loggedIn, onRegister, name, type, placeholder, minLength, maxLength, isValid, value, onChange, error }) {
    

    return (
        <Form name={loggedIn} onSubmit={onRegister} isValid={isValid}>
        <>
        {name === "password" || name === "email" ?
            <>
                <Input
                name={name}
                type={type}
                placeholder={placeholder}
                minLength={minLength ? minLength : ""}
                maxLength={maxLength ? maxLength : ""}
                required
                className={`login__input ${isValid === undefined || isValid ? "" : "login__input_invalid"}`}
                value={value ? value : ""}
                onChange={onChange}
                //disabled={isSend}
                />
                <span className={"login__error"}>{error}</span>
                </>
            :
            <>
                <Input
                name={name}
                type={type}
                placeholder={placeholder}
                minLength={minLength ? minLength : ""}
                maxLength={maxLength ? maxLength : ""}
                required
                className={`login__input ${isValid === undefined || isValid ? "" : "login__input_invalid"}`}
                value={value ? value : ""}
                onChange={onChange}
                //disabled={isSend}
                />
                <span className={"login__error"}>{error}</span>
                </>
         }
        </>
        </Form>
    )

} 