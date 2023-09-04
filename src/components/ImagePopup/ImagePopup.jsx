export default function ImagePopup({ card, onClose, isOpen }) {
    return (
    <section className={`popup popup-image ${isOpen && "popup_opened"}`} onClick={onClose}>
            <div className="popup__container popup__container-image" 
            // Запрет на закрытие клика по форме
            onClick={(event => event.stopPropagation())}>

            <figure className="popup__image">
                <img
                    className="popup__item-img" 
                    //src={ card.link }
                    src={ card.link ? card.link : "#" }  
                    //alt={ `Изображение ${card.name}` }
                    alt={card.name ? `Изображение ${card.name}` : "#" } 
                />
            <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
        
            <button
                id="close-image"
                type="button"
                className="popup__close popup__close-image"
                aria-label="close"
                onClick={onClose}
            />
            </div>
    </section>
    )
}