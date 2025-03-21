import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

import "./HottestPage.scss";

function HottestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animes, setAnimes] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAnimes = async () => {
    setLoading(true);
    try {
      const cachedHottest = sessionStorage.getItem("hottestAnime");
      if (cachedHottest) {
        setAnimes(JSON.parse(cachedHottest));
        return;
      }
      const response = await axios.get(
        `${backendUrl}/api/anime/seasons/hottest`
      );
      sessionStorage.setItem("hottestAnime", JSON.stringify(response.data));
      console.log(response.data);
      setAnimes(response.data);
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
          <SectionHeader title="" backClickHandler={() => navigate(-1)} />
        </section>
        {loading && (
          <div id="loading-container" className="loading-container">
            <BounceLoader color="#FF477E" size={40} />
          </div>
        )}
        {!loading && animes && (
          <section className="hottest-results">
            <h3 className="hottest-results__title">
              This season's hottest animes
            </h3>
            <AnimeList animes={animes} source="recommendations" />
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
