import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SearchBar from "../../components/SearchBar/SearchBar";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./SearchTVPage.scss";
function SearchTVPage() {
  const navigate = useNavigate();

  const onSearch = () => {
    console.log("searching works!");
  };

  return (
    <main className="search-tv">
      <div className="search-tv__wrapper">
        <HeroBanner />
        <section className="search-tv__section">
          <SectionHeader title="Search" backClickHandler={() => navigate(-1)} />
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
      </div>
    </main>
  );
}

export default SearchTVPage;
