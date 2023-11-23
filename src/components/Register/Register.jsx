import useFormValidation from "../../utils/useFormValidation.js";
import Form from "../Form/Form.jsx";
import Header from "../Header/Header.jsx"

export default function Register({ handleRegister }) {
    const { values, errors, isValid, handleChange } = useFormValidation();

    function onRegister(event) {
        event.preventDefault()
        handleRegister(values.password, values.email)
    }
    
return (
    <>
    <Header />
    <div className="register">
    <Form name="register" onSubmit={onRegister} isValid={isValid} title="Регистрация" titleButton="Зарегистрироваться">
        <input 
            name="email"
            type="email"
            id="email"
            className="popup__input popup__input_type_login" 
            placeholder="Email"
            minLength="6"
            maxLength="30"
            required
            value={values.email || ""}
            onChange={handleChange}
            error={errors.email}
        />
        <input 
            name="password"
            type="password"
            id="password"
            className="popup__input popup__input_type_login"  
            placeholder="Пароль"
            minLength="3"
            required
            value={values.password || ""}
            onChange={handleChange}
            error={errors.password}
        />
    </Form>
    </div>
    </>
    );
}