export default function Card({ card, onCardClick }) {
    return (
        <article className="card">
            <button className="card__basket" />
                <img 
                    src={card.link} 
                    className="card__item-img" 
                    alt={`Изображение ${card.name}`} 
                    onClick={() => onCardClick({link: card.link, name: card.name})}
                />
                    <div className="card__group">
                        <h2 className="card__title" >{card.name}</h2>
                            <div className="card__like">
                                <button className="card__like-icon" />
                            <p className="card__like-counter" />
                            </div>
                    </div>
        </article>
    )
}