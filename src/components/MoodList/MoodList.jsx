import axios from "axios";
import { useEffect, useState } from "react";
import GenreList from "../GenreList/GenreList";
import "./MoodList.scss";

function MoodList({ cardClickHandler }) {
  const [moods, setMoods] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/moods`);
        // console.log(response);
        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoods();
  }, []);

  const handleMoodClick = (mood) => {
    if (selectedMood && selectedMood.id === mood.id) {
      setSelectedMood(null);
    } else {
      console.log(selectedMood);
      setSelectedMood(mood);
    }
  };

  if (!moods) {
    return "Loading moods...";
  }

  return (
    <>
      <ul className="mood-grid">
        {moods.map((mood) => (
          <li
            key={mood.id}
            className="mood-card"
            onClick={() => handleMoodClick(mood)}
          >
            <div className="mood-card__context">
              <section className="mood-card__header">
                {/* <p className="mood-card__emoji">{mood.emoji}</p> */}
                <h3 className="mood-card__name">
                  {mood.emoji} {mood.name}
                </h3>
              </section>
              <p className="mood-card__description">{mood.description}</p>
            </div>

            {selectedMood?.id === mood.id && (
              <section className="genre-section">
                <h3 className="genre-section__title">Select a genre</h3>
                <GenreList
                  selectedMood={selectedMood}
                  cardClickHandler={cardClickHandler}
                />
              </section>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoodList;
