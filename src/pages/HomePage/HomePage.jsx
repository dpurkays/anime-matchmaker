import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MALUsernameModal from "../../components/MALUsernameModal/MALUsernameModal";

import "./HomePage.scss";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectionRef = useRef(null);
  const navigate = useNavigate();

  const usernameSubmitHandler = (username) => {
    setIsModalOpen(false);
    navigate(`/mal/${username}`);
  };

  return (
    <main className="home">
      <div className="home__wrapper">
        <HeroBanner showButton={true} />
        <section
          id="selection-section"
          ref={selectionRef}
          className="selection"
        >
          <h2 className="selection__title">
            How do you want to find your anime match?
          </h2>
          <div className="selection__button-container">
            <Link to="/moods" className="selection__button">
              Select by mood
            </Link>
            <Link to="/tv" className="selection__button">
              By TV series or Movie
            </Link>
            <div
              className="selection__button"
              onClick={() => setIsModalOpen(true)}
            >
              Based on watch history
            </div>
            <Link to="/seasons/hottest" className="selection__button">
              Season's Hottest
            </Link>
          </div>
        </section>
      </div>

      <MALUsernameModal
        isOpen={isModalOpen}
        onUsernameSubmit={usernameSubmitHandler}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/");
        }}
      />
    </main>
  );
}

export default HomePage;
