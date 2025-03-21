import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AnimeDetailsPage from "./pages/AnimeDetailsPage/AnimeDetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import HottestPage from "./pages/HottestPage/HottestPage";
import MALAnimeRecsPage from "./pages/MALAnimeRecsPage/MALAnimeRecPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SearchTVPage from "./pages/SearchTVPage/SearchTVPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="anime/:animeId" element={<AnimeDetailsPage />} />
          <Route path="tv" element={<SearchTVPage />} />
          <Route path="/mal/:username" element={<MALAnimeRecsPage />} />
          <Route path="season-hottest" element={<HottestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
