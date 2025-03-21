import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MALUsernameModal from "../../components/MALUsernameModal/MALUsernameModal";

import "./HomePage.scss";

function HomePage() {
  const [selectionType, setSelectionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {}, [selectionType]);

  const usernameSubmitHandler = (username) => {
    setIsModalOpen(false);
    navigate(`/mal/${username}`);
  };

  return (
    <main className="home">
      <div className="home__wrapper">
        <HeroBanner setSelectionType={setSelectionType} />
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
              onClick={() => navigate("/moods")}
            >
              Select by mood
            </div>
            <div className="selection__button" onClick={() => navigate("/tv")}>
              By TV series or Movie
            </div>
            <div
              className="selection__button"
              onClick={() => setIsModalOpen(true)}
            >
              Based on watch history
            </div>
            <div
              className="selection__button"
              onClick={() => navigate("/seasons/hottest")}
            >
              Season's Hottest
            </div>
          </div>
        </section>
      </div>

      <MALUsernameModal
        isOpen={isModalOpen}
        onUsernameSubmit={usernameSubmitHandler}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/seasons/hottest");
        }}
      />
    </main>
  );
}

export default HomePage;
