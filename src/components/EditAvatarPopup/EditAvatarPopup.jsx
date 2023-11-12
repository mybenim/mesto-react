import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

function resetClose() {
    onClose()
    reset()
}

function handleSubmit(event) {
        event.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, reset)
    }

    return (
    <PopupWithForm 
        name="edit avatar"
        title="Обновить фото"
        isOpen = {isOpen}
        isValid = {isValid}
        onClose = {resetClose}
        onSubmit = {handleSubmit}
    >
    <input
        ref={input}
        type="url"
        id="avatar"
        className={`popup__input popup__input_ctrl_link ${isInputValid.avatar === undefined || isInputValid.avatar ? "" : "popup__input_error"}`}
        name="avatar"
        placeholder="Ссылка на фото"
        required=""
        value = {values.avatar ? values.avatar : ""}
        onChange={handleChange}
    />
        <span className="popup__input-error" id="avatar-error">{errors.avatar}</span>
    </PopupWithForm>
    )
}