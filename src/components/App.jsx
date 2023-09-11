import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  
  // Стэйты Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup ] = useState(false);

  // Стэйты currentUser
  const [currentUser, setCurrentUser ] = useState({});

  // Стэйты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setdeleteCardId] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopup(false)
        setIsDeletePopupOpen(false)
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

  function handleCardClick(cardId) {
    setSelectedCard(cardId)
    setIsImagePopup(true)
  } 

  function handleDeletePopupClick(card) {
    setdeleteCardId(card)
    setIsDeletePopupOpen(true)
  }

  useEffect(() => {
      setIsLoading(true)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([getUserInfo, initialCards]) => {
            setCurrentUser(getUserInfo)

          initialCards.forEach(data => data.myId = getUserInfo._id)
          setCards(initialCards)
          setIsLoading(false)
        })
        .catch((error) => console.error(`Что-то пошло не так ${error}`))

          const closePopupByEsc = (event) => {
            if (event.key === "Escape") {
            closeAllPopups()
        }
      }
      document.addEventListener("keydown", closePopupByEsc)

      return () => {
        document.removeEventListener('keydown', closePopupByEsc)
      }
        },[])

  function handleCardDeleteSubmit(event) {
    event.preventDefault()
      api.deleteCard(deleteCardId)
        .then(() => {
          setCards(cards.filter(card => {
            return card._id !== deleteCardId 
          }))
          closeAllPopups()
        })
        .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    }

  function handleUpdateUser(dataUser, reset) {
      api.setUserInfo(dataUser)
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
          reset()
        })
        .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
   }

  function handleUpdateAvatar(data, reset) {
      api.setUserAvatar(data)
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
          reset()
        })
        .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`))
    }

    function handleAddPlaceSubmit(dataCard, reset) {
        api.addNewCard(dataCard)
        .then(res => {
          setCards([res, ...cards]); 
          closeAllPopups()
          reset()
        })
        .catch((error) => console.error(`Ошибка при создании карточки ${error}`))
    }

return (
<CurrentUserContext.Provider value={currentUser}>
    <div className="page__content">

    <Header />
    
    <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      onDelete = {handleDeletePopupClick}
      cards = {cards}
      isLoading = {isLoading}  
    />

    <Footer />

    <EditProfilePopup
      onUpdateUser = {handleUpdateUser} 
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
    />

    <AddPlacePopup
      onAddPlace = {handleAddPlaceSubmit} 
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
    />

    <EditAvatarPopup
      onUpdateAvatar = {handleUpdateAvatar}
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups} 
    />

    <PopupWithForm 
      name="delete"
      title="Вы уверены?"
      titleButton="Да"
      isOpen = {isDeletePopupOpen}
      onClose = {closeAllPopups}
      onSubmit = {handleCardDeleteSubmit}
    />

    <ImagePopup 
      card={selectedCard}
      isOpen={isImagePopup}
      onClose = {closeAllPopups}
    />

</div>
</CurrentUserContext.Provider>

  );
}

export default App;
