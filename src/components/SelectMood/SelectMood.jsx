import { useState } from "react";
import actionImg from "../../assets/images/action.jpeg";
import chillImg from "../../assets/images/chill.jpg";
import comedyImg from "../../assets/images/comedy.png";
import darkImg from "../../assets/images/dark.jpg";
import MoodList from "../MoodList/MoodList";
import "./SelectMood.scss";

function SelectMood({ setSelectionType, selectionRef }) {
  const [selected, setSelected] = useState(null);

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

  const cardClickHandler = (selectedMood) => {
    setSelected(true);
    console.log(selectedMood);
  };

  const backClickHandler = () => {
    if (!selected) {
      setSelectionType(null);
      selectionRef.current?.scrollIntoView({ behavior: smooth });
    } else {
      setSelected(null);
    }
  };

  console.log(moods);
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
      {!selected ? <MoodList cardClickHandler={cardClickHandler} /> : "loading"}
    </section>
  );
}

export default SelectMood;
