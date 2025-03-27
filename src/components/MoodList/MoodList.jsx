import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import GenreList from "../GenreList/GenreList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./MoodList.scss";

function MoodList() {
  const [moods, setMoods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMood, setSelectedMood] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const moodFromUrl = searchParams.get("mood");
    setSelectedMood(moodFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/api/moods`);
        setMoods(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMoods();
  }, []);

  const handleMoodClick = (mood) => {
    if (parseInt(selectedMood) === mood.id) {
      console.log(parseInt(selectedMood));
      setSelectedMood(null);
      searchParams.delete("mood");
      setSearchParams(searchParams);
    } else {
      setSelectedMood(mood.id.toString());
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && moods && (
        <ul className="mood-grid">
          {moods.map((mood) => {
            const isSelected = parseInt(selectedMood) === mood.id;
            return (
              <li
                key={mood.id}
                className="mood-card"
                onClick={() => handleMoodClick(mood)}
              >
                <div className="mood-card__context">
                  <section className="mood-card__header">
                    <h3 className="mood-card__name">
                      {mood.emoji} {mood.name}
                    </h3>
                  </section>
                  <p className="mood-card__description">{mood.description}</p>
                </div>

                {isSelected && (
                  <section className="genre-section">
                    <h3 className="genre-section__title">Select a genre</h3>
                    <GenreList selectedMood={selectedMood} />
                  </section>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {!loading && !moods && (
        <p className="mood__no-results">No moods found, try again later.</p>
      )}
    </>
  );
}

export default MoodList;
