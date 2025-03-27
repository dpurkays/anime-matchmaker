import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AnimeList from "../../components/AnimeList/AnimeList";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SearchBar from "../../components/SearchBar/SearchBar";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./SearchTVPage.scss";

function SearchTVPage() {
  const [animes, setAnimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const query = searchParams.get("query");

  const fetchAnimes = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/recommendations/tv`, {
        params: { tvShow: query },
      });
      setAnimes(response.data);
    } catch (error) {
      console.error("Error fetching anime recommendations: ", error);
    }
    setLoading(false);
  };

  const onSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    if (query) {
      fetchAnimes(query);
    } else {
      setAnimes(null);
    }
  }, [query]);

  return (
    <main className="search-tv">
      <div className="search-tv__wrapper">
        <HeroBanner />
        <section className="search-tv__section">
          <SectionHeader title="Search" />
          <div className="search-tv__content">
            <div className="search-tv__content-wrapper">
              <p className="search-tv__description">
                Enter the name of a TV show or movie, and AI will recommend an
                anime with a similar vibe, genre, or storyline.
              </p>
              <SearchBar
                placeholderText="Find anime by TV show or movie..."
                onSearch={onSearch}
              />
            </div>
          </div>
        </section>

        {loading && <LoadingSpinner />}
        {query && !loading && animes && (
          <section className="search-results">
            <h3 className="search-results__title">Results for {query}</h3>
            <AnimeList animes={animes} source="recommendations" />
          </section>
        )}

        {query && !loading && !animes && animes.length === 0 && (
          <p className="search-results__no-results">No results found.</p>
        )}
      </div>
    </main>
  );
}

export default SearchTVPage;
