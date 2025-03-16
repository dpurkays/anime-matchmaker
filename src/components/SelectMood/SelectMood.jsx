import axios from "axios";
import { useState } from "react";
import AnimeList from "../AnimeList/AnimeList";
import MoodList from "../MoodList/MoodList";
import "./SelectMood.scss";

function SelectMood({ setSelectionType, selectionRef }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [animes, setAnimes] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const jikanUrl = "https://api.jikan.moe/v4/anime";

  const fetchAnimes = async (mood, genre) => {
    try {
      const genreResponse = await axios.get(
        `${backendUrl}/api/moods/${mood}/genres/${genre}`
      );
      console.log(genreResponse);

      const { jikan_genre_ids } = genreResponse.data;
      console.log(jikan_genre_ids);

      const jikanResponse = await axios.get(
        `${jikanUrl}?genres=${jikan_genre_ids.join(",")}&order_by=popularity`
      );
      console.log("Fetched Anime:", jikanResponse.data.data);

      setAnimes(jikanResponse.data.data);
    } catch (error) {
      console.error(error);
    }
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
      <header className="select-mood__header">
        <h2 className="select-mood__title">Select a Mood</h2>
        <div className="selected__back-button" onClick={backClickHandler}>
          <svg
            className="selected__back-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="none"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          <p className="selected__back-text">Back</p>
        </div>
      </header>
      {!selectedMood ? (
        <MoodList cardClickHandler={cardClickHandler} />
      ) : (
        <AnimeList animes={animes} />
      )}
    </section>
  );
}

export default SelectMood;
