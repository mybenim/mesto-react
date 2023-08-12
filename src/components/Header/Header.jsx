import logo from "../../images/logo.svg";
export default function Header() {
    return(
      <header className="header page__header">
        <img
          src={logo}
          className="header__logo"
          alt="логотип"
        />
      </header>
    )
}