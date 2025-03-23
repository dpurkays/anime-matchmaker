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
    console.log("🌐 Mood from URL updated:", moodFromUrl);
  }, [searchParams]);

  useEffect(() => {
    console.log(
      `mood params : ${searchParams.mood} & genre params: ${searchParams.genre}`
    );
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
    console.log("🖱️ Mood clicked:", mood);
    // setSearchParams({ mood: mood.id.toString() }); <---------this breaks my code T_T
    setSelectedMood(mood.id.toString());
    console.log("🔄 Updated URL to:", `?mood=${mood.id}`);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && moods && (
        <ul className="mood-grid">
          {moods.map((mood) => {
            const isSelected = parseInt(selectedMood) === mood.id;

            // ✅ Log each mood's ID and if it's selected
            console.log("🎭 Mood ID:", mood.id);
            console.log("🔍 Selected from URL:", selectedMood);
            console.log("✅ Match:", isSelected);
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
        <p className="no-results">No moods found, try again later.</p>
      )}
    </>
  );
}

export default MoodList;
