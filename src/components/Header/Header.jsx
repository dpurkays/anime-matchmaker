import { Link } from "react-router";
import "./Header.scss";

function Header() {
  return (
    <header className="site-header">
      <Link className="site-header__link" to="/">
        <h2 className="site-header__title">Anime Matchmaker 💖</h2>
      </Link>
    </header>
  );
}

export default Header;
