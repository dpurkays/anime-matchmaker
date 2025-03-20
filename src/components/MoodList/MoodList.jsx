import axios from "axios";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import GenreList from "../GenreList/GenreList";
import "./MoodList.scss";

function MoodList({ cardClickHandler }) {
  const [moods, setMoods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/moods`);
        // console.log(response);
        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
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

  // if (!moods) {
  //   return (
  //     <div id="loading-container" className="loading-container">
  //       <BounceLoader color="#FF477E" size={40} />
  //     </div>
  //   );
  // }

  return (
    <>
      {loading && (
        <div id="loading-container" className="loading-container">
          <BounceLoader color="#FF477E" size={40} />
        </div>
      )}
      {!loading && moods && (
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
      )}

      {!loading && !moods && (
        <p className="no-results">No moods found, try again later.</p>
      )}
    </>
  );
}

export default MoodList;
