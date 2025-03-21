import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import "./MALAnimeRecsPage.scss";

function MALAnimeRecsPage() {
  const navigate = useNavigate();
  return (
    <main className="mal-recs">
      <div className="mal-recs__wrapper">
        <HeroBanner />
        <section className="mal-recs__section">
          <SectionHeader
            title="Based on your history"
            backClickHandler={() => navigate(-1)}
          />
        </section>
      </div>
    </main>
  );
}

export default MALAnimeRecsPage;
