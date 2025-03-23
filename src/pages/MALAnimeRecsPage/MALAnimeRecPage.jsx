import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  const [showModal, setShowModal] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchAnimes = async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/recommendations/mal?malUsername=${username}`
      );
      setAnimes(response.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        if (error.response.data?.error === "MAL user not found") {
          setError(`Username ${username} doesn't exist. Try again.`);
          setAnimes(null);
          setShowModal(true);
        } else {
          console.error(
            `No anime found in ${username}'s favorites or watch history.`
          );
          setError(error.response.data.error);
          setAnimes(null);
        }
      }
      console.error("Error fetching anime recommendations: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      fetchAnimes(username);
    } else {
      navigate("/seasons/hottest");
    }
  }, []);

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

        {!loading && username && !animes && (
          <p className="mal-recs__no-results">No results found.</p>
        )}
      </div>
      {showModal && (
        <MALUsernameModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onUsernameSubmit={(newUsername) => {
            setShowModal(false);
            navigate(`/mal/${newUsername}`);
          }}
          errorMessage={error}
        />
      )}
    </main>
  );
}

export default MALAnimeRecsPage;
