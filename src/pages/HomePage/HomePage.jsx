import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import MALUsernameModal from "../../components/MALUsernameModal/MALUsernameModal";
import SelectMood from "../../components/SelectMood/SelectMood";

import "./HomePage.scss";

function HomePage() {
  const [selectionType, setSelectionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [hottestAnimes, setHottestAnimes] = useState(null);
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const selectionRef = useRef(null);
  const navigate = useNavigate();

  // const fetchAnimes = async () => {
  //   try {
  //     const cachedHottest = sessionStorage.getItem("hottestAnime");
  //     if (cachedHottest) {
  //       // console.log("🏠✅ Serving hottest anime from sessionStorage !");
  //       setHottestAnimes(JSON.parse(cachedHottest));
  //       return;
  //     }
  //     const response = await axios.get(
  //       `${backendUrl}/api/anime/seasons/hottest`
  //     );
  //     sessionStorage.setItem("hottestAnime", JSON.stringify(response.data));
  //     setHottestAnimes(response.data);
  //   } catch (error) {
  //     console.error("Error fetching anime recommendations: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAnimes();
  // }, []);

  const usernameSubmitHandler = (username) => {
    setIsModalOpen(false);
    navigate(`/mal/${username}`);
  };

  return (
    <main className="home">
      <div className="home__wrapper">
        <HeroBanner setSelectionType={setSelectionType} />
        {!selectionType ? (
          <section
            id="selection-section"
            ref={selectionRef}
            className="selection"
          >
            <h2 className="selection__title">
              How do you want to find your anime match?
            </h2>
            <div className="selection__button-container">
              <div
                className="selection__button"
                onClick={() => setSelectionType("mood")}
              >
                Select by mood
              </div>
              <div
                className="selection__button"
                onClick={() => navigate("/tv")}
              >
                By TV series or Movie
              </div>
              <div
                className="selection__button"
                onClick={() => setIsModalOpen(true)}
              >
                Based on watch history
              </div>
              <div
                className="selection__button"
                onClick={() => navigate("/seasons/hottest")}
              >
                Season's Hottest
              </div>
            </div>
          </section>
        ) : (
          <div className="selected">
            {selectionType === "mood" && (
              <SelectMood
                setSelectionType={setSelectionType}
                selectionRef={selectionRef}
              />
            )}
          </div>
        )}
      </div>

      <MALUsernameModal
        isOpen={isModalOpen}
        onUsernameSubmit={usernameSubmitHandler}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/seasons/hottest");
        }}
      />
    </main>
  );
}

export default HomePage;
