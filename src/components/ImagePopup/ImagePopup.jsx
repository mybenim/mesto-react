export default function ImagePopup({ card, isOpen, onClose }) {
    return (
    <section className={`popup popup-image ${isOpen && "popup_opened"}`}>
        <div className="popup__container popup__container-image">
        <figure className="popup__image">
            <img
                className="popup__item-img" 
                src={ card.link }
                //src={ card.link ? card.link : "#" }  
                alt={ `Изображение ${card.name}` }
                //alt={card.name ? `Изображение ${card.name}` : "#" } 
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