import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./SearchTVPage.scss";
function SearchTVPage() {
  const navigate = useNavigate();
  return (
    <main className="search-tv">
      <div className="search-tv__wrapper">
        <HeroBanner />
        <section className="search-tv__section">
          <SectionHeader title="Search" backClickHandler={() => navigate(-1)} />
        </section>
      </div>
    </main>
  );
}

export default SearchTVPage;
