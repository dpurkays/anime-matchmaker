import axios from "axios";
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import AnimeList from "../AnimeList/AnimeList";
import MoodList from "../MoodList/MoodList";
import SectionHeader from "../SectionHeader/SectionHeader";
import "./SelectMood.scss";

function SelectMood({ setSelectionType, selectionRef }) {
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [animes, setAnimes] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAnimes = async (mood, genre) => {
    setLoading(true);
    try {
      const genreResponse = await axios.get(
        `${backendUrl}/api/moods/${mood}/genres/${genre}`
      );
      const { jikan_genre_ids } = genreResponse.data;

      const animeResponse = await axios.get(
        `${backendUrl}/api/recommendations/anime-mood`,
        {
          params: { jikan_genre_ids: jikan_genre_ids.join(",") },
        }
      );
      console.log("fetch anime by mood", animeResponse.data);
      setAnimes(animeResponse.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const cardClickHandler = (mood, genre) => {
    console.log(mood, genre);
    setSelectedMood(genre);
    fetchAnimes(mood, genre);
  };

  const backClickHandler = () => {
    if (!selectedMood) {
      setSelectionType(null);
      selectionRef.current?.scrollIntoView({ behavior: smooth });
    } else {
      setSelectedMood(null);
    }
  };

  return (
    <section className="select-mood">
      <SectionHeader
        title="Select a mood"
        backClickHandler={backClickHandler}
      />
      {!selectedMood ? (
        <MoodList cardClickHandler={cardClickHandler} />
      ) : loading ? (
        <div id="loading-container" className="loading-container">
          <BounceLoader color="#FF477E" size={40} />
        </div>
      ) : !loading && animes && animes.length > 0 ? (
        <AnimeList animes={animes} />
      ) : (
        <p className="search-results__no-results">No results found.</p>
      )}
    </section>
  );
}

export default SelectMood;
