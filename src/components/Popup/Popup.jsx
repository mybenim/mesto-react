export default function Popup ({ name, children, isOpen, onClose }) {

    return (
        <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onMouseDown={onClose}>
            <div className={`${name === "image" ? "popup__container-image" : "popup__container"} ${name === "result" ? "popup__container-registration" : ""}`}
            onMouseDown={(event) => event.stopPropagation()}>
                <button type="button" className="popup__close" onClick={onClose} />
                {children}
            </div>
        </section>
    )
}