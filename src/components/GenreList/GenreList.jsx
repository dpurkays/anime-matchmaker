import axios from "axios";
import { useEffect, useState } from "react";
import "./GenreList.scss";

function GenreList({ selectedMood, cardClickHandler }) {
  const [genres, setGenres] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchGenres = async () => {
      if (!selectedMood) return;
      try {
        const response = await axios.get(
          `${backendUrl}/api/moods/${selectedMood.id}/genres`
        );
        console.log(response);
        setGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  if (!genres) {
    return "Loading genres...";
  }

  return (
    <ul className="genre-section__list">
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="genre-card"
          onClick={() => cardClickHandler(genre.jikan_genre_ids)}
        >
          <h4 className="genre-card__name">{genre.name}</h4>
          <p className="genre-card__description">{genre.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
