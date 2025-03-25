import { Link } from "react-router";
import "./SiteLogo.scss";
function SiteLogo() {
  return (
    <Link className="site-logo__link" to="/">
      <h2 className="site-logo__title">Anime Matchmaker 💖</h2>
    </Link>
  );
}

export default SiteLogo;
