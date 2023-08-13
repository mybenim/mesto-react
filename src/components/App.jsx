import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx"
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react"

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false) 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard ] = useState({})
  const [isImagePopup, setIsImagePopup ] = useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
  } 

  return (

      <div className="page__content">

    <Header />
    
    <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
    />

    <Footer />

    <PopupWithForm 
      name="edit profile"
      title="Редактировать профиль"
      //titleButton="Сохранить"
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
    >
      <input
          type="text"
          id="name-profile"
          className="popup__input popup__input_ctrl_fullname"
          name="fullname"
          placeholder="Как вас зовут"
          required=""
          minLength={2}
          maxLength={40}
      />
        <span id="name-profile-error" className="popup__input-error" />
      
      <input
          type="text"
          id="about-profile"
          className="popup__input popup__input_ctrl_job"
          name="job"
          placeholder="О себе"
          required=""
          minLength={2}
          maxLength={200}
      />
        <span id="about-profile-error" className="popup__input-error" />
    </PopupWithForm>

    <PopupWithForm 
      name="add Card"
      title="Новое место"
      titleButton="Создать"
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
    >
      <input
          type="text"
          id="name-card"
          className="popup__input popup__input_ctrl_name"
          defaultValue=""
          name="name"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
      />
        <span id="name-card-error" className="popup__input-error" />
      
      <input
          type="url"
          id="link-card"
          className="popup__input popup__input_ctrl_link"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
      />
        <span className="popup__input-error" id="link-card-error" />
    </PopupWithForm>

    <PopupWithForm 
      name="edit avatar"
      title="Обновить фото"
      //titleButton="Сохранить"
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
    >
      <input
          type="url"
          id="avatar"
          className="popup__input popup__input_ctrl_link"
          name="avatar"
          placeholder="Ссылка на фото"
          required=""
      />
        <span className="popup__input-error" id="avatar-error" />
    </PopupWithForm>

    <PopupWithForm 
      name="delete Card"
      title="Вы уверены?"
      titleButton="Да"
    />

    <ImagePopup 
      card={selectedCard} 
      isOpen={isImagePopup} 
      onClose = {closeAllPopups}
    />

</div>

  );
}

export default App;
