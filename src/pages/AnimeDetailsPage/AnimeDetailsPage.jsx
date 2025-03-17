import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatAiringStatus, formatDuration } from "../../utils/utils";
import "./AnimeDetailsPage.scss";

function AnimeDetailsPage() {
  const { animeId } = useParams();
  const [anime, setAnime] = useState(null);
  const jikanUrl = "https://api.jikan.moe/v4/anime";

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`${jikanUrl}/${animeId}/full`);
        console.log(response.data.data);
        setAnime(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnime();
  }, [animeId]);

  if (!anime) return <p>Loading...</p>;
  return (
    <main className="anime-details-page">
      <header className="anime-header">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title_english}
          className="anime-header__image"
        />
        <div className="anime-header__content">
          <div className="anime-info">
            <h2 className="anime-info__title">{anime.title_english}</h2>
            <p className="anime-info__romanji-title">{anime.title_japanese}</p>
          </div>
          <div className="anime-meta">
            <span className="anime-meta__badge">{anime.type}</span>
            <span className="anime-meta__badge">{anime.episodes} ep</span>
            <span className="anime-meta__badge">
              {formatDuration(anime.duration)}
            </span>
            <span className="anime-meta__badge">❤️ {anime.favorites}</span>
          </div>
          <div className="anime-buttons">
            <p className="anime-buttons__button">Watch Trailer</p>
            <p className="anime-buttons__button">Bookmark</p>
          </div>
        </div>
      </header>
      <section className="anime-description">
        <h3 className="anime-description__synopsis-title">Synopsis</h3>
        <p className="anime-description__synopsis">{anime.synopsis}</p>
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
            {formatAiringStatus(anime.status)}
          </p>
          <p className="anime-details__text">
            <b>Aired: </b>
            {anime.year}
          </p>
          <p className="anime-details__text">
            <b>Studio: </b>
            {anime.studios[0].name}
          </p>
          <p className="anime-details__text">
            <b>Rating: </b>
            {anime.rating}
          </p>
        </div>
      </section>
      <div className="anime-trailer">trailer goes here </div>
    </main>
  );
}

export default AnimeDetailsPage;
