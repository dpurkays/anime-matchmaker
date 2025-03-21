import axios from "axios";
import { useEffect, useState } from "react";
import img1 from "../../assets/images/hero-1.jpg";
import img2 from "../../assets/images/hero-2.jpg";
import img3 from "../../assets/images/hero-3.jpg";
import img4 from "../../assets/images/hero-4.jpg";
import img5 from "../../assets/images/hero-5.jpg";
import "./HeroCarousel.scss";

const fallbackImages = [img1, img2, img3, img4, img5];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setfade] = useState(true);
  const [carouselImages, setCarouselImages] = useState([...fallbackImages]);

  useEffect(() => {
    const fetchHottestAnime = async () => {
      const cachedHottest = sessionStorage.getItem("hottestAnime");

      if (cachedHottest) {
        const hottestAnime = JSON.parse(cachedHottest);
        const animeImages = hottestAnime
          .slice(0, 5)
          .map((anime) => anime.image)
          .filter(Boolean);

        if (animeImages.length > 0) {
          setCarouselImages([...animeImages]);
        }
        return;
      }

      try {
        const response = await axios.get("/api/seasons/hottest");

        if (response.data > 0) {
          sessionStorage.setItem("hottestAnime", JSON.stringify(response.data));
          const animeImages = response.data
            .slice(0, 5)
            .map((anime) => anime.image)
            .filter(Boolean);
          setCarouselImages([...animeImages]);
        }
      } catch (error) {
        console.error("Error fetching hottest anime:", error);
      }
    };

    fetchHottestAnime();
  }, []);

  useEffect(() => {
    const slideOutTime = 500;
    const switchImageTime = 5000;
    const timeout = setTimeout(() => {
      setfade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
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
        src={carouselImages[currentIndex]}
        alt="anime banner"
      />
    </div>
  );
}

export default HeroCarousel;
