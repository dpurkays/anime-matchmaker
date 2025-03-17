import "./AnimeDetailsPage.scss";

function AnimeDetailsPage() {
  return (
    <main className="anime-details">
      <header className="anime-header">
        <img src="" alt="" className="anime-header__image" />
        <div className="anime-info">
          <h2 className="anime-info__title">Anime title</h2>
          <p className="anime-info__romanji-title">Romanji Title</p>
        </div>
        <div className="anime-meta">
          <span className="anime-meta__badge">TV</span>
          <span className="anime-meta__badge">episodes</span>
          <span className="anime-meta__badge">durations</span>
          <span className="anime-meta__badge">favorites</span>
        </div>
        <div className="anime-buttons">
          <p className="anime-buttons__button">Watch Trailer</p>
          <p className="anime-buttons__button">Bookmark</p>
        </div>
      </header>
      <section className="anime-description">
        <h2 className="anime-description__synopsis-title">Synopsis</h2>
        <p className="anime-description__synopsis">the synopsis</p>
      </section>
      <section className="anime-genres">
        <span className="anime-genres__badge">Romantic</span>
      </section>
      <section className="anime-details">
        <h2 className="anime-details__title">Details</h2>
        <p className="anime-details__text">status</p>
        <p className="anime-details__text">aired</p>
        <p className="anime-details__text">length</p>
        <p className="anime-details__text">rating</p>
      </section>
      <div className="anime-trailer">trailer goes here </div>
    </main>
  );
}

export default AnimeDetailsPage;
