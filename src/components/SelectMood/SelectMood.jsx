import { useState } from "react";
import AnimeList from "../AnimeList/AnimeList";
import MoodList from "../MoodList/MoodList";
import "./SelectMood.scss";

function SelectMood({ setSelectionType, selectionRef }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const cardClickHandler = (selectedMood) => {
    setSelectedMood(true);
    console.log(selectedMood);
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
        <AnimeList selectedMood={selectedMood} />
      )}
    </section>
  );
}

export default SelectMood;
