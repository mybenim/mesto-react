export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose }) {
    return (
      <section className={ `popup popup_type_${name} ${isOpen && "popup_opened"}`}>
          <div className="popup__container">
            <button
              id="close"
              type="button"
              className="popup__close popup__close-profile"
              aria-label="close"
              onClick={onClose} />

            <h3 className="popup__title">{title}</h3>
          
            <form
              className={`popup__form popup__form-${name}`}
              data-name="form_profile"
              noValidate=""
            >
              
              {children}

              <button
                type="submit"
                className="popup__safe popup__safe_disabled"
                //disabled="true"
              >
                {titleButton || "Сохранить"}
              </button>
            </form>
          </div>
      </section>

    )
}