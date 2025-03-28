import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MALUsernameModal from "../../components/MALUsernameModal/MALUsernameModal";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./MALAnimeRecPage.scss";

function MALAnimeRecsPage() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [animes, setAnimes] = useState(null);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchAnimes = async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/recommendations/mal/${username}`
      );
      setAnimes(response.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        if (error.response.data?.error === "MAL user not found") {
          setModalError(`Username ${username} doesn't exist. Try again.`);
          setAnimes(null);
          setShowModal(true);
        } else {
          setError(
            `Looks like ${username} hasn’t saved any anime just yet. Want to try a different username or explore anime by mood or similar shows?`
          );
          setAnimes(null);
        }
      }
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      fetchAnimes(username);
    }
  }, [username]);

  return (
    <main className="mal-recs">
      <div className="mal-recs__wrapper">
        <HeroBanner />
        <section className="mal-recs__section">
          <SectionHeader title="For you" />
        </section>
        {loading && <LoadingSpinner />}

        {!loading && username && animes && (
          <section className="personal-recs">
            <h3 className="personal-recs__title">
              Recommendations for {username}
            </h3>
            <AnimeList animes={animes} source="recommendations" />
          </section>
        )}

        {!loading && username && (!animes || animes.length === 0) && error && (
          <section className="mal-recs__section">
            <p className="mal-recs__text">{error}</p>
            <div className="mal-recs__actions">
              <div
                onClick={() => setShowModal(true)}
                className="mal-recs__button"
              >
                Try another username
              </div>
              <Link
                to="/moods"
                className="mal-recs__button mal-recs__button--secondary"
              >
                Explore by mood
              </Link>
              <Link
                to="/tv"
                className="mal-recs__button mal-recs__button--secondary"
              >
                Explore by show
              </Link>
              <Link
                to="/seasons/hottest"
                className="mal-recs__button mal-recs__button--secondary"
              >
                Season's Hottest
              </Link>
            </div>
          </section>
        )}
      </div>
      {showModal && (
        <MALUsernameModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onUsernameSubmit={(newUsername) => {
            setShowModal(false);
            setModalError(null);
            navigate(`/mal/${newUsername}`);
          }}
          errorMessage={modalError}
        />
      )}
    </main>
  );
}

export default MALAnimeRecsPage;
