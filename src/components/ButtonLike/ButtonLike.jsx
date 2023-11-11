const ButtonLike = ({ isLiked, countLikes, onClick }) => (
    <div className="card__like">
        <button className={`card__like-icon ${isLiked ? "card__button-like" : ""}`} onClick={onClick} />
        <p className="card__like-counter">{countLikes}</p>
    </div>
)

export default ButtonLike