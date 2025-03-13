import HeroBanner from "../../components/HeroBanner/HeroBanner";
import "./HomePage.scss";

function HomePage() {
  return (
    <main className="home">
      <HeroBanner />
      <section id="selection-section" className="selection">
        <h2 className="selection__title">
          How do you want to find your anime match?
        </h2>
        <div className="selection__button-container">
          <div className="selection__button">Select by mood</div>
          <div className="selection__button">Based on watch history</div>
          <div className="selection__button">By TV series or Movie</div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
