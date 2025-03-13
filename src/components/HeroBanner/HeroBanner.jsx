import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import img1 from "../../assets/images/hero-1.jpg";
import img2 from "../../assets/images/hero-2.jpg";
import img3 from "../../assets/images/hero-3.jpg";
import img4 from "../../assets/images/hero-4.jpg";
import img5 from "../../assets/images/hero-5.jpg";
import "./HeroBanner.scss";

const images = [img1, img2, img3, img4, img5];
function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blur, setblur] = useState(true);

  useEffect(() => {
    const slideOutTime = 500;
    const switchImageTime = 5000;
    const timeout = setTimeout(() => {
      setblur(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setblur(true);
      }, slideOutTime);
    }, switchImageTime);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="hero">
      <div className="hero__image-section">
        <img
          src={images[currentIndex]}
          alt="anime banner"
          className={`hero__image ${blur ? "hero__image--active" : ""}`}
        />
      </div>
      <section className="hero__text-section">
        <h1 className="hero__title">Find your anime match</h1>
        <div className="hero__content">
          <p className="hero__text">
            Struggling to find the perfect anime? Let AI match you with the best
            picks based on your mood, past favorites, or even your favorite TV
            shows.
          </p>
          <div className="hero__button">
            <Link
              to="selection-section"
              className="hero__link"
              smooth={true}
              duration={500}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroBanner;
