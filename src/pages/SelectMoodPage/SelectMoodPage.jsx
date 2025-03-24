import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MoodList from "../../components/MoodList/MoodList";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./SelectMoodPage.scss";

function SelectMoodPage() {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [animes, setAnimes] = useState(null);

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
        `${backendUrl}/api/recommendations/mood/${jikan_genre_ids.join(",")}`
      );
      setAnimes(animeResponse.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (mood && genre) {
      fetchAnimes(mood, genre);
    }
  }, [mood, genre]);

  return (
    <main className="select-mood">
      <div className="select-mood__wrapper">
        <HeroBanner />
        <section className="select-mood__section">
          <SectionHeader title="Select a mood" />
          {!mood ? (
            <MoodList />
          ) : loading ? (
            <LoadingSpinner />
          ) : genre && animes && animes.length > 0 ? (
            <AnimeList animes={animes} />
          ) : (
            <p className="select-mood__no-results">
              No results found. Select mood page
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default SelectMoodPage;
