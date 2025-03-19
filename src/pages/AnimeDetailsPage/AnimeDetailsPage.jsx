import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-scroll";
import Synopsis from "../../components/Synopsis/Synopsis";
import TrailerVideo from "../../components/TrailerVideo/TrailerVideo";
import "./AnimeDetailsPage.scss";

function AnimeDetailsPage() {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  // const jikanUrl = "https://api.jikan.moe/v4/anime";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/anime/${animeId}`);
        setAnime(response.data);
      } catch (error) {
        console.error("Error fetching anime recommendations: ", error);
      }
    };
    fetchAnime();
  }, [animeId]);

  if (!anime) return <p>Loading...</p>;
  return (
    <main className="anime-details-page">
      <div className="anime-details-page__wrapper">
        <header className="anime-header">
          <img
            src={anime.image}
            alt={anime.title_english}
            className="anime-header__image"
          />
          <div className="anime-header__content">
            <div className="anime-info">
              <h2 className="anime-info__title">{anime.title_english}</h2>
              <p className="anime-info__romanji-title">
                {anime.title_japanese}
              </p>
            </div>
            <div className="anime-meta">
              <span className="anime-meta__badge">{anime.type}</span>
              <span className="anime-meta__badge">{anime.episodes} ep</span>
              <span className="anime-meta__badge">{anime.duration}</span>
              <span className="anime-meta__badge">❤️ {anime.favorites}</span>
            </div>
            <div className="anime-buttons">
              <Link
                to="anime-trailer"
                className="anime-buttons__button"
                smooth={true}
                duration={500}
              >
                Watch Trailer
              </Link>
              <p className="anime-buttons__button">Bookmark</p>
            </div>
          </div>
        </header>
        <section className="anime-description">
          <h3 className="anime-description__synopsis-title">Synopsis</h3>
          <Synopsis text={anime.synopsis} />
        </section>
        <section className="anime-genres">
          {anime.genres.map((genre) => (
            <span key={genre.mal_id} className="anime-genres__badge">
              {genre.name}
            </span>
          ))}
          {anime.themes.map((theme) => (
            <span key={theme.mal_id} className="anime-genres__badge">
              {theme.name}
            </span>
          ))}
        </section>
        <section className="anime-details">
          <h3 className="anime-details__title">Details</h3>
          <div className="anime-details__text-container">
            <p className="anime-details__text">
              <b>Status: </b>
              {anime.status}
            </p>
            <p className="anime-details__text">
              <b>Aired: </b>
              {anime.year}
            </p>
            <p className="anime-details__text">
              <b>Studio: </b>
              {anime.studio}
            </p>
            <p className="anime-details__text">
              <b>Rating: </b>
              {anime.rating}
            </p>
          </div>
        </section>
        <section id="anime-trailer" className="anime-trailer">
          <h3 className="anime-trailer__title">Trailer</h3>
          {console.log(anime.youtube_id)}
          <TrailerVideo
            videoId={anime.youtube_id}
            animeName={anime.title_english}
          />
        </section>
      </div>
    </main>
  );
}

export default AnimeDetailsPage;
