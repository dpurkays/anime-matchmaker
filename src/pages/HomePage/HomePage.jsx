import { useEffect, useState } from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SearchHistory from "../../components/SearchHistory/SearchHistory";
import SearchMood from "../../components/SearchMood/SearchMood";
import SearchTV from "../../components/SearchTV/SearchTV";
import "./HomePage.scss";

function HomePage() {
  const [selectionType, setSelectionType] = useState(null);

  useEffect(() => {}, [selectionType]);

  return (
    <main className="home">
      <HeroBanner setSelectionType={setSelectionType} />
      {!selectionType ? (
        <section id="selection-section" className="selection">
          <h2 className="selection__title">
            How do you want to find your anime match?
          </h2>
          <div className="selection__button-container">
            <div
              className="selection__button"
              onClick={() => setSelectionType("mood")}
            >
              Select by mood
            </div>
            <div
              className="selection__button"
              onClick={() => setSelectionType("history")}
            >
              Based on watch history
            </div>
            <div
              className="selection__button"
              onClick={() => setSelectionType("tv")}
            >
              By TV series or Movie
            </div>
          </div>
        </section>
      ) : (
        <div className="selected">
          <div
            className="selected__back-button"
            onClick={() => setSelectionType(null)}
          >
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
          {selectionType === "mood" && <SearchMood />}
          {selectionType === "history" && <SearchHistory />}
          {selectionType === "tv" && <SearchTV />}
        </div>
      )}
    </main>
  );
}

export default HomePage;
