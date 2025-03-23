import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import "./GenreList.scss";

function GenreList({ selectedMood }) {
  const [genres, setGenres] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchGenres = async () => {
      if (!selectedMood) return;

      try {
        const response = await axios.get(
          `${backendUrl}/api/moods/${selectedMood}/genres`
        );

        if (
          Array.isArray(response.data.genres) &&
          response.data.genres.length > 0
        ) {
          setGenres(response.data.genres);
        } else {
          setGenres([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, [selectedMood]);

  const handleGenreClick = (genreId) => {
    setSearchParams({ mood: selectedMood, genre: genreId.toString() });
  };

  return (
    <ul className="genre-section__list">
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="genre-card"
          onClick={() => handleGenreClick(genre.id)}
        >
          <h4 className="genre-card__name">{genre.name}</h4>
          <p className="genre-card__description">{genre.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
