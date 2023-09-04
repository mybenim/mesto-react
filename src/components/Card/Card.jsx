import { useContext } from "react"
import CurrentUserContext from "../../context/CurrentUserContext";
import ButtonLike from "../ButtonLike/ButtonLike";


export default function Card({ card, onCardClick, onDelete }) {

    const currentUser = useContext(CurrentUserContext)

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
                        <h2 className="card__title" >{card.name}</h2>
                            <div className="card__like">
                                <ButtonLike likes={card.likes} 
                                            myid={currentUser._id} 
                                            cardid={card._id} 
                                />
                                
                            </div>
                    </div>
        </article>
    )
}