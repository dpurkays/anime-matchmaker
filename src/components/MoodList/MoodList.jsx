import actionImg from "../../assets/images/action.jpeg";
import chillImg from "../../assets/images/chill.jpg";
import comedyImg from "../../assets/images/comedy.png";
import darkImg from "../../assets/images/dark.jpg";
import "./MoodList.scss";

function MoodList({ cardClickHandler }) {
  const moods = [
    {
      name: "Chill & Relaxing",
      description: "Laid-back anime with peaceful vibes",
      image: chillImg,
      genre: "Slice of Life",
    },
    {
      name: "High Energy",
      description: "Action-packed, fast-paced anime",
      image: actionImg,
      genre: "Action",
    },
    {
      name: "Comedy",
      description: "Funny & light-hearted anime",
      image: comedyImg,
      genre: "Comedy",
    },
    {
      name: "Dark & Mysterious",
      description: "Thrilling, suspenseful anime",
      image: darkImg,
      genre: "Mystery",
    },
  ];

  console.log(moods);
  return (
    <>
      <ul className="mood-grid">
        {moods.map((mood, index) => (
          <li
            key={index}
            className="mood-card"
            onClick={() => cardClickHandler(mood.genre)}
          >
            <img
              src={mood.image}
              alt={`anime describing the ${mood.description} theme`}
              className="mood-card__image"
            />
            <section className="mood-card__text">
              <h3 className="mood-card__name">{mood.name}</h3>
              <p className="mood-card__description">{mood.description}</p>
            </section>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoodList;
