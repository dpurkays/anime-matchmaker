import actionImg from "../../assets/images/action.jpeg";
import "./AnimeList.scss";

function AnimeList({ selectedMood }) {
  const [animeList, setAnimeList] = useState(null);

  // const fetchAnimeByMood = async () => {
  //   try {
  //     const response = await axios.get();
  //     console.log(response.data);
  //     setAnimeList(response.data);
  //   }
  // }

  return (
    <ul className="anime-grid">
      <li className="anime-card">
        <img src={actionImg} alt="anime" className="anime-card__image" />
        <div className="anime-card__context">
          <h3 className="anime-card__name">Anime Title</h3>
          <ul className="anime-card__genre-list">
            <li className="anime-card__genre">Comedy</li>
            <li className="anime-card__genre">Action</li>
          </ul>
        </div>
      </li>
    </ul>
  );
}

export default AnimeList;
