import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SearchHistory from "../../components/SearchHistory/SearchHistory";
import SelectMood from "../../components/SelectMood/SelectMood";
import "./HomePage.scss";

function HomePage() {
  const [selectionType, setSelectionType] = useState(null);
  const selectionRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {}, [selectionType]);

  return (
    <main className="home">
      <div className="home__wrapper">
        <HeroBanner setSelectionType={setSelectionType} />
        {!selectionType ? (
          <section
            id="selection-section"
            ref={selectionRef}
            className="selection"
          >
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
                onClick={() => navigate("/tv")}
              >
                By TV series or Movie
              </div>
            </div>
          </section>
        ) : (
          <div className="selected">
            {selectionType === "mood" && (
              <SelectMood
                setSelectionType={setSelectionType}
                selectionRef={selectionRef}
              />
            )}
            {selectionType === "history" && (
              <SearchHistory selectionRef={selectionRef} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
