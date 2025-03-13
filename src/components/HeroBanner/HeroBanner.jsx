import { useEffect, useState } from "react";
import img1 from "../../assets/images/hero-1.webp";
import img2 from "../../assets/images/hero-2.webp";
import img3 from "../../assets/images/hero-3.webp";
import img4 from "../../assets/images/hero-4.webp";
import img5 from "../../assets/images/hero-5.webp";
import "./HeroBanner.scss";

const images = [img1, img2, img3, img4, img5];
function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="hero-container">
      <div className="hero__image-section">
        <img
          src={images[currentIndex]}
          alt="anime banner"
          className="hero__image"
        />
      </div>
      <section className="hero__text-section">
        <h1 className="hero__title">Find your anime match</h1>
        <div className="hero__content">
          <p className="hero__text">
            AI powered recommendations based on mood and your preferences.
          </p>
          <div className="hero__button">Get Started</div>
        </div>
      </section>
    </div>
  );
}

export default HeroBanner;
