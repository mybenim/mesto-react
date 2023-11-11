

export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isValid=true }) {
    return (
      <section className={ `popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>
          <div className="popup__container"
              // Запрет на закрытие клика по форме 
              onClick={(event => event.stopPropagation())}>

            <button
              id="close"
              type="button"
              className="popup__close popup__close-profile"
              aria-label="close"
              onClick={onClose} 
            />

            <h2 className={`popup__title ${name}`}>{title}</h2>
          
            <form
              className={`popup__form popup__form-${name === "delete" && "popup_type_delete"}`}
              data-name="form_profile"
              noValidate
              onSubmit={onSubmit}
            >
              
              {children}

            <button
              type="submit"
              className={`popup__safe ${isValid ? "" : "popup__safe_disabled"}`} 
              //popup__safe_disabled
              //disabled="true"
            >
            {titleButton || "Сохранить"}
            </button>
            </form>
          </div>
      </section>

    )
}