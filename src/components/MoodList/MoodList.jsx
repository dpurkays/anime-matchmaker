import axios from "axios";
import { useEffect, useState } from "react";
import "./MoodList.scss";

function MoodList({ cardClickHandler }) {
  const [moods, setMoods] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/moods`);
        console.log(response);
        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoods();
  }, []);

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
            onClick={() => cardClickHandler(mood.genres)}
          >
            {/* <img
              src={mood.image}
              alt={`anime describing the ${mood.description} theme`}
              className="mood-card__image"
            /> */}
            <div className="mood-card__context">
              <section className="mood-card__header">
                <p className="mood-card__emoji">{mood.emoji}</p>
                <h3 className="mood-card__name">{mood.name}</h3>
              </section>
              <p className="mood-card__description">{mood.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoodList;
