import React, { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { registration, authorization, getUserInfo } from "../utils/auth.js"
import api from "../utils/api.jsx";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import Main from "./Main/Main.jsx";

function App() {

  const navigate = useNavigate()
  
  // Стэйты Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // Стэйты currentUser
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  // Стэйты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setdeleteCardId] = useState("");

  // Стэйты для регистрации и логина
  const localLoggedIn = JSON.parse(localStorage.getItem("loggedIn")) ?? false // "true" / "false"
  const [loggedIn, setLoggedIn] = useState(localLoggedIn);
  const [isSuccessful, setIsSuccessful] = useState(true);
  
  // Состояния попапов
  const isOpen = isEditProfilePopupOpen || 
  isAddPlacePopupOpen || 
  isEditAvatarPopupOpen || 
  isImagePopup || 
  isDeletePopupOpen || 
  isResultPopupOpen;

  const closeAllPopups = useCallback(() => {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopup(false)
        setIsDeletePopupOpen(false)
        setIsResultPopupOpen(false)
  },[])

  useEffect(() => {
        function closePopupByEsc(event) {
            if (event.key === "Escape") {
            closeAllPopups()
        }
      } if (isOpen) {
        document.addEventListener("keydown", closePopupByEsc)
      return () => {
        document.removeEventListener('keydown', closePopupByEsc)
      }
    }
  }, [closeAllPopups, isOpen])
  
  useEffect(() => {
    if (loggedIn)  {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userEmail, dataCards]) => {
            setCurrentUser(userEmail)
            setIsLoading(false)     
            setCards(dataCards)
        })
        .catch((error) => console.error(`Ошибка при загрузке начальных данных ${error}`))
      }
        },[loggedIn])

  // GET-запрос
  useEffect(() => {
    if (localStorage.jwt) {
      getUserInfo(localStorage.jwt)
       .then(res => {
       console.log(res)
        setUserEmail(res.data.email)
        setLoggedIn(true)
        navigate("/")
       })
       .catch((error) => 
        console.error(`Ошибка авторизации при повторном входе ${error}`))
    } else {
        setLoggedIn(false)  
    }
  }, [])

 function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  } 
  
  function handleUpdateUser(dataUser, reset) {
      setIsLoading(true)
      api.setUserInfo(dataUser)
        .then(res => {         
          setCurrentUser(res)
          closeAllPopups()
          reset()
        })
        .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
        .finally(() => setIsLoading(false))
   }

  function handleUpdateAvatar(dataAvatar, reset) {
      setIsLoading(true)
      api.setUserAvatar(dataAvatar)
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
          reset()
        })
        .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`))
        .finally(() => setIsLoading(false))
    }

  function handleAddPlaceSubmit(dataCard, reset) {
      setIsLoading(true)
      api.addNewCard(dataCard)
      .then(res => {         
        setCards([res, ...cards]); 
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при создании карточки ${error}`))
      .finally(() => setIsLoading(false))
    }

  const handleLike = useCallback((card) => {
      const isLike = card.likes.some(element => currentUser._id === element._id)
        if (isLike) {
          api.deleteLike(card._id)
          .then((res) => {
            setCards(cards => cards.map((item) => item._id === card._id ? res : item))
          })
          .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
        } else {
          api.addLike(card._id)
          .then((res) => {
            setCards(cards => cards.map((item) => item._id === card._id ? res : item))
          })
          .catch((error) => console.error(`Ошибка при установке лайка ${error}`))
        }
    }, [currentUser._id]) 

 function handleCardDeleteSubmit(event) {
      event.preventDefault()
      setIsLoading(true)
      api.deleteCard(deleteCardId)
        .then(() => {
          setCards(cards.filter(card => {
            return card._id !== deleteCardId 
          }))
          closeAllPopups()
        })
        .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
        .finally(() => setIsLoading(false))
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
  
    function handleLogin(password, email) {
      authorization(password, email)
        .then(res => {
            localStorage.setItem("loggedIn", true)
            localStorage.setItem("jwt", res.token)
            setLoggedIn(true)
            window.scrollTo(0, 0) // Скролл вверх
            navigate("/")
      })
        .catch((error) => {
            setIsResultPopupOpen(true)
            setIsSuccessful(false)
            console.error(`Ошибка при авторизации ${error}`)
        })
    }

    function handleRegister(password, email) {
      registration(password, email)
        .then(() => {
            setIsResultPopupOpen(true)
            setIsSuccessful(true)
            navigate("/sign-in")
        })
        .catch((error) => {
            setIsResultPopupOpen(true)
            setIsSuccessful(false)
            console.error(`Ошибка при регистрации ${error}`)
        })
    }

return (
<CurrentUserContext.Provider value={currentUser}>
  <div className="page__content"> 
  <Routes>
      <Route 
          path="/" 
          element={
          <ProtectedRoute 
          element={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          onClick={handleLike}
          onSignOut={onSignOut}
          cards={cards}
          loggedIn={loggedIn}
          userEmail={userEmail}
          isLoading={isLoading}
          />
        } 
      /> 
      <Route path="/sign-up"
        element={<Register handleRegister={handleRegister} loggedIn={loggedIn} />} 
      />
      <Route path="/sign-in"
        element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />}
      />
      <Route path="*" 
        element={ loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} 
      />
  </Routes>
  
  <Footer />
    
    <EditProfilePopup
      onUpdateUser = {handleUpdateUser} 
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      isLoading={isLoading}
    />

    <AddPlacePopup
      onAddCard = {handleAddPlaceSubmit} 
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      isLoading={isLoading}
    />

    <EditAvatarPopup
      onUpdateAvatar = {handleUpdateAvatar}
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
      isLoading={isLoading} 
    />

     <PopupWithForm 
      name="delete"
      title="Вы уверены?"
      titleButton={isLoading ? "Удаление..." : "Да"}  
      isOpen = {isDeletePopupOpen}
      onClose = {closeAllPopups}
      onSubmit = {handleCardDeleteSubmit}
    />

    <ImagePopup 
      card={selectedCard}
      isOpen={isImagePopup}
      onClose = {closeAllPopups}
    />

    <InfoTooltip 
      name="result"
      isSuccessful={isSuccessful}
      isOpen={isResultPopupOpen}
      onClose = {closeAllPopups}
    />

</div>
</CurrentUserContext.Provider>

  );
}

export default App;

