import { useState } from "react";
import { useNavigate } from "react-router";
import "./AnimeList.scss";
function AnimeList({ animes, source }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  console.log(animes);
  return (
    <ul className="anime-grid">
      {animes.map((anime) => (
        <li
          key={anime.mal_id}
          className="anime-card"
          onClick={() => navigate(`/anime/${anime.mal_id}`)}
          onMouseEnter={() => setHoveredCard(anime)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="anime-card__image-container">
            <img src={anime.image} alt="anime" className="anime-card__image" />
            <p className="anime-card__rating">{anime.rating}</p>
          </div>

          <div className="anime-card__context">
            <h3 className="anime-card__name">{anime.title_english}</h3>
            <p className="anime-card__meta">{anime.year}</p>
          </div>
          {source === "recommendations" &&
            hoveredCard?.mal_id === anime.mal_id && (
              <section className="anime-hover-card">
                <h4 className="anime-hover-card__name">
                  {anime.title_english}
                </h4>
                <p className="anime-hover-card__similarity">
                  {`${anime.similarity_reason} ` || "Recommended for you"}
                </p>
              </section>
            )}
        </li>
      ))}
    </ul>
  );
}

export default AnimeList;
