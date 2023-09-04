import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function ButtonLike({ likes, myid, cardid }) {

    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
      setIsLike(likes.some(element => myid === element._id))  
    }, [likes, myid])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardid)
            .then(res => {
                setIsLike(false)
                setCount(res.likes.length)
            })
            .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
        } else {
            api.addLike(cardid)
            .then((res) => {
                setIsLike(true)
                setCount(res.likes.length)
            })
            .catch((error) => console.error(`ошибка при добавлении лайка ${error}`));
        }  
    }

    return (
        <>
        <button className={`card__like-icon ${isLike ? "card__button-like" : ""}`} onClick={handleLike} />
        <p className="card__like-counter">{count}</p>
        </>
    )
}