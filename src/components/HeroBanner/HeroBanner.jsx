import { Link } from "react-scroll";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
import "./HeroBanner.scss";

function HeroBanner({ setSelectionType, showButton = false }) {
  return (
    <div className="hero">
      <HeroCarousel />
      <section className="hero__text-section">
        <h1 className="hero__title">Find your anime match</h1>
        <div className="hero__content">
          <p className="hero__text">
            Struggling to find the perfect anime? Let AI match you with the best
            picks based on your mood, past favorites, or even your favorite TV
            shows.
          </p>
          {showButton && (
            <div className="hero__button">
              <Link
                to="selection-section"
                className="hero__link"
                smooth={true}
                duration={500}
                onClick={() => setSelectionType(null)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HeroBanner;
