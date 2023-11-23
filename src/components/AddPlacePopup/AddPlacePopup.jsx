import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {

     const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetClose() {
        onClose()
        reset()
    }

      function handleSubmit(event) {
        event.preventDefault()
        onAddCard({ name: values.name, link: values.link }, reset)
    }

    return(
    <PopupWithForm 
      name="add Card"
      title="Новое место"
      isOpen = {isOpen}
      isValid = {isValid}
      onClose = {resetClose}
      onSubmit = {handleSubmit}
      titleButton={isLoading ? "Создание..." : "Создать"}
    >
      <input
          type="text"
          id="name-card"
          className={`popup__input popup__input_ctrl_name ${isInputValid.name === undefined || isInputValid.name ? "" : "popup__input_error"}`}
          //defaultValue=""
          name="name"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          value = {values.name ? values.name : ""}
          onChange={handleChange}
      />
        <span id="name-card-error" className="popup__input-error">{errors.name}</span>
      
      <input
          type="url"
          id="link-card"
          className={`popup__input popup__input_ctrl_link ${isInputValid.link === undefined || isInputValid.link ? "" : "popup__input_error"}`}
          name="link"
          placeholder="Ссылка на картинку"
          required=""
          value = {values.link ? values.link : ""}
          onChange={handleChange}
      />
        <span className="popup__input-error" id="link-card-error">{errors.link}</span>
    </PopupWithForm>
    )
}