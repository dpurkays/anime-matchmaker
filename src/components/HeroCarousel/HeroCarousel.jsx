import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import img1 from "../../assets/images/hero-1.jpg";
import img2 from "../../assets/images/hero-2.jpg";
import img3 from "../../assets/images/hero-3.jpg";
import img4 from "../../assets/images/hero-4.jpg";
import img5 from "../../assets/images/hero-5.jpg";
import "./HeroCarousel.scss";

const fallbackImages = [
  { mal_id: 58567, image: img1 },
  { mal_id: 55997, image: img2 },
  { mal_id: 57616, image: img3 },
  { mal_id: 58514, image: img4 },
  { mal_id: 59379, image: img5 },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setfade] = useState(true);
  const [carouselImages, setCarouselImages] = useState([...fallbackImages]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHottestAnime = async () => {
      const cachedHottest = sessionStorage.getItem("hottestAnime");

      if (cachedHottest) {
        const hottestAnime = JSON.parse(cachedHottest);
        const animeData = hottestAnime
          .slice(0, 5)
          .map((anime) => ({
            mal_id: anime.mal_id,
            image: anime.image,
          }))
          .filter(Boolean);

        if (animeData.length > 0) {
          setCarouselImages([...animeData]);
        }
        return;
      }

      try {
        const response = await axios.get("/api/seasons/hottest");
        const hottestAnime = response.data;
        if (hottestAnime.length > 0) {
          sessionStorage.setItem("hottestAnime", JSON.stringify(hottestAnime));
          const animeData = hottestAnime
            .slice(0, 5)
            .map((anime) => ({
              mal_id: anime.mal_id,
              image: anime.image,
            }))
            .filter(Boolean);

          if (animeData.length > 0) {
            setCarouselImages([...animeData]);
          }
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
    <div
      className="carousel"
      // onClick={() => handleImageClick(carouselImages[currentIndex].mal_id)}
    >
      <img
        className={`carousel__image ${
          fade ? "carousel__image--fade-in" : "carousel__image--fade-out"
        }`}
        src={carouselImages[currentIndex]?.image}
        alt="anime banner"
        onClick={() =>
          navigate(`/anime/${carouselImages[currentIndex].mal_id}`)
        }
      />
    </div>
  );
}

export default HeroCarousel;
