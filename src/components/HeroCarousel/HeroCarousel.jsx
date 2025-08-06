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
  const [carouselAnime, setcarouselAnime] = useState([...fallbackImages]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHottestAnime = async () => {
      const cachedHottest = sessionStorage.getItem("hottestAnime");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
          setcarouselAnime(animeData);
        }
        return;
      }

      try {
        const response = await axios.get(
          `${backendUrl}/api/anime/seasons/hottest`
        );
        const hottestAnime = response.data;
        if (hottestAnime.length > 0) {
          sessionStorage.setItem("hottestAnime", JSON.stringify(hottestAnime));
          const animeData = hottestAnime
            .slice(0, 5)
            .map((anime) => ({
              mal_id: anime.mal_id,
              image: anime.image,
              title: anime.title_english,
              rating: anime.rating,
              synopsis: anime.synopsis,
              genres: anime.genres,
              year: anime.year,
            }))
            .filter(Boolean);

          if (animeData.length > 0) {
            setcarouselAnime(animeData);
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselAnime.length);
        setfade(true);
      }, slideOutTime);
    }, switchImageTime);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel__image-wrapper">
        <img
          className={`carousel__image carousel__image--bg ${
            fade ? "carousel__image--fade-in" : "carousel__image--fade-out"
          }`}
          src={carouselAnime[currentIndex]?.image}
          alt={carouselAnime[currentIndex]?.title || "anime banner"}
        />
        <img
          className={`carousel__image carousel__image--main ${
            fade ? "carousel__image--fade-in" : "carousel__image--fade-out"
          }`}
          src={carouselAnime[currentIndex]?.image}
          alt={carouselAnime[currentIndex]?.title || "anime banner"}
        />
      </div>
      {carouselAnime[currentIndex]?.title && (
        <div
          key={carouselAnime[currentIndex].mal_id}
          className="carousel__overlay"
        >
          <h2 className="carousel__title">
            {carouselAnime[currentIndex]?.title}
          </h2>
          <div className="carousel__section">
            <p className="carousel__rating">
              {carouselAnime[currentIndex]?.rating}
            </p>
            <div className="carousel__genres">
              {carouselAnime[currentIndex]?.genres
                ?.slice(0, 2)
                .map((genre, i) => (
                  <span key={i} className="carousel__genre">
                    {genre}
                  </span>
                ))}
            </div>
          </div>
          <div className="carousel__section">
            <p className="carousel__synopsis">
              {carouselAnime[currentIndex]?.synopsis}
            </p>
            <p
              className="carousel__btn"
              onClick={() =>
                navigate(`/anime/${carouselAnime[currentIndex].mal_id}`)
              }
            >
              Detail
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
