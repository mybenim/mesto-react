import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card.jsx";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);
   
    useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([getUserInfo, initialCards]) => {
          setUserName(getUserInfo.name);
          setUserDescription(getUserInfo.about);
          setUserAvatar(getUserInfo.avatar);
           setCards(initialCards);
          
          /* initialCards.forEach(data => data.myId = getUserInfo._id)
          setCards(initialCards) */

        })
           .catch(() => {
                console.log("Что-то пошло не так")
            })
    },[])


    return (
      <main className="main">
        <section className="profile page__profile">
          <div className="profile__info">
            
            <button 
              type="button" 
              className="profile__image" 
              onClick={onEditAvatar}>
                <img src={userAvatar}
                    className="profile__avatar"
                    alt="Ваше фото"
                    name="avatar"
                />
            </button>
            
            <div className="profile__box">
              <h1 className="profile__title" >{userName}</h1>
            
            <button 
              type="button"
              aria-label="Редактировать"
              className="profile__square" 
              onClick={onEditProfile} 
            />
            
            <p className="profile__subtitle" >{userDescription}</p>
          </div>
          
          <button
              aria-label="плюс"
              type="button"
              className="profile__rectangle" onClick={onAddPlace} 
          />
          </div>
        </section>

        <section className="element page__element">
          <ul className="element__list">
            {cards.map(data => {
              return (
                <Card 
                    card={data}
                    key={data._id}
                    name={data.name}
                    link={data.link}
                    onCardClick={onCardClick} 
                />
              )
            })}
          </ul>
        </section>
      </main>
    )
}