import Popup from "../Popup/Popup.jsx";

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose, login, password }) {
     
    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}> 
          <div className={`popup__registration-img ${isSuccessful && login !== "" && password !== "" 
          ? "popup__registration-img_type_ok" : "popup__registration-img_type_error"}`} />
                   
          <h2 className="popup__title-registration">{isSuccessful && login !== "" && password !== ""
            ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </Popup>
    );
}



