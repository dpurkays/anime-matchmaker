import { useNavigate } from "react-router";
import { formatRating } from "../../utils/utils";
import "./AnimeList.scss";
function AnimeList({ animes }) {
  const navigate = useNavigate();
  if (!animes) {
    return "Loading Animes...";
  }
  return (
    <ul className="anime-grid">
      {animes.map((anime) => (
        <li
          key={anime.mal_id}
          className="anime-card"
          onClick={() => navigate(`/anime/${anime.mal_id}`)}
        >
          <div className="anime-card__image-container">
            <img
              src={anime.images.jpg.image_url}
              alt="anime"
              className="anime-card__image"
            />
            <p className="anime-card__rating">{formatRating(anime.rating)}</p>
          </div>

          <div className="anime-card__context">
            <h3 className="anime-card__name">{anime.title_english}</h3>
            <p className="anime-card__meta">{anime.year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AnimeList;
