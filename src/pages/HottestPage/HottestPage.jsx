import axios from "axios";
import { useEffect, useState } from "react";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./HottestPage.scss";

function HottestPage() {
  const [loading, setLoading] = useState(false);
  const [animes, setAnimes] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAnimes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/anime/seasons/hottest`
      );
      const hottestAnime = response.data;
      setAnimes(hottestAnime);
    } catch (error) {
      console.error("Error fetching anime recommendations: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <main className="hottest">
      <div className="hottest__wrapper">
        <HeroBanner />
        <section className="hottest__section">
          <SectionHeader />
        </section>
        {loading && <LoadingSpinner />}
        {!loading && animes && (
          <section className="hottest-results">
            <h3 className="hottest-results__title">
              This season's hottest animes
            </h3>
            <AnimeList animes={animes} />
          </section>
        )}
        {!loading && !animes && (
          <p className="search-results__no-results">No results found.</p>
        )}
      </div>
    </main>
  );
}

export default HottestPage;
