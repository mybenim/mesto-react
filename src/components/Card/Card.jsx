import {useContext, useState} from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import ButtonLike from "../ButtonLike/ButtonLike";
import api from "../../utils/api";

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)

    const [isLiked, setIsLiked] = useState(card.likes.some(element => currentUser._id === element._id))
    const [countLikes, setCountLikes] = useState(card.likes.length)

    function handleLike() {
        const apiCall = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
        apiCall.then(res => {
            setIsLiked(!isLiked);
            setCountLikes(res.likes.length);
        })
        .catch(error => console.error(`Ошибка при ${isLiked ? "снятии" : "добавлении"} лайка ${error}`));
    } 

    return (
        <article className="card">
            {/* только мои корзины */}
            {currentUser._id === card.owner._id && <button type="button" className="card__basket" onClick={() => onDelete(card._id)}/>}
            {/*<button className="card__basket" onClick={onDelete} />*/}
            <img
                src={card.link}
                className="card__item-img"
                alt={`Изображение ${card.name}`}
                onClick={() => onCardClick({link: card.link, name: card.name})}
            />

            <div className="card__group">
                <h2 className="card__title">{card.name}</h2>

                <ButtonLike
                    isLiked={isLiked}
                    countLikes={countLikes}
                    onClick={handleLike}
                />
            </div>
        </article>
    )
}
