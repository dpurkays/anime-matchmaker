import { useEffect, useState } from "react";
import img1 from "../../assets/images/hero-1.jpg";
import img2 from "../../assets/images/hero-2.jpg";
import img3 from "../../assets/images/hero-3.jpg";
import img4 from "../../assets/images/hero-4.jpg";
import img5 from "../../assets/images/hero-5.jpg";
import "./HeroCarousel.scss";

const images = [img1, img2, img3, img4, img5];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setfade] = useState(true);

  useEffect(() => {
    const slideOutTime = 500;
    const switchImageTime = 5000;
    const timeout = setTimeout(() => {
      setfade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setfade(true);
      }, slideOutTime);
    }, switchImageTime);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <img
        className={`carousel__image ${
          fade ? "carousel__image--fade-in" : "carousel__image--fade-out"
        }`}
        src={images[currentIndex]}
        alt="anime banner"
      />

      {/* </img> */}
    </div>
  );
}

export default HeroCarousel;
