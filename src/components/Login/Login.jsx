import useFormValidation from "../../utils/useFormValidation.js";
import Form from "../Form/Form.jsx";
import Header from "../Header/Header.jsx";

export default function Login({ handleLogin }) {
    const { values, errors, isValid, handleChange } = useFormValidation()

    function onLogin(event) {
        event.preventDefault()
        handleLogin(values.password, values.email)
    }
     
return (
    <>
    <Header />
    <div className="login">
    <Form name="login" onSubmit={onLogin} isValid={isValid} title="Вход" titleButton="Войти">
        
        <input 
            name="email"
            type="email"
            id="email"
            className="popup__input popup__input_type_login"
            placeholder="Email"
            required
            value={values.email || ""}
            minLength="6"
            maxLength="30"
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
    )
}
