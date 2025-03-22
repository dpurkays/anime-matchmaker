import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import BounceLoader from "react-spinners/BounceLoader";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MoodList from "../../components/MoodList/MoodList";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./SelectMoodPage.scss";

function SelectMoodPage() {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [animes, setAnimes] = useState(null);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const mood = searchParams.get("mood");
  const genre = searchParams.get("genre");

  const fetchAnimes = async (mood, genre) => {
    if (!mood || !genre) return;
    setLoading(true);
    try {
      const genreResponse = await axios.get(
        `${backendUrl}/api/moods/${mood}/genres/${genre}`
      );
      const { jikan_genre_ids } = genreResponse.data;

      const animeResponse = await axios.get(
        `${backendUrl}/api/recommendations/anime-mood`,
        {
          params: { jikan_genre_ids: jikan_genre_ids.join(",") },
        }
      );
      console.log("fetch anime by mood", animeResponse.data);
      setAnimes(animeResponse.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (mood && genre) {
      console.log("✅ fetching anime data.");
      fetchAnimes(mood, genre);
    }
  }, [mood, genre]);

  const backClickHandler = () => {
    if (genre) {
      setSearchParams({ mood: mood.id });
    } else {
      navigate("/");
    }
  };

  return (
    <main className="select-mood">
      <div className="select-mood__wrapper">
        <HeroBanner />
        <section className="select-mood__section">
          <SectionHeader
            title="Select a mood"
            backClickHandler={() => backClickHandler}
          />
          {!mood ? (
            <MoodList />
          ) : loading ? (
            <div id="loading-container" className="loading-container">
              <BounceLoader color="#FF477E" size={40} />
            </div>
          ) : genre && animes && animes.length > 0 ? (
            <AnimeList animes={animes} />
          ) : (
            <p className="search-results__no-results">
              No results found. Select mood page
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default SelectMoodPage;
