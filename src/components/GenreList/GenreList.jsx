import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import "./GenreList.scss";

function GenreList({ selectedMood }) {
  const [genres, setGenres] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  console.log("🟡 Received mood from props:", selectedMood);

  useEffect(() => {
    const fetchGenres = async () => {
      if (!selectedMood) {
        console.log("❌ No selected mood, skipping genre fetch.");
        return;
      }

      try {
        console.log(`📡 Fetching genres for mood: ${selectedMood}`);
        const response = await axios.get(
          `${backendUrl}/api/moods/${selectedMood}/genres`
        );

        console.log("✅ Genre API Response:", response.data);

        // 🔥 Ensure the data is structured properly before updating state
        if (
          Array.isArray(response.data.genres) &&
          response.data.genres.length > 0
        ) {
          setGenres(response.data.genres);
          console.log("✅ Genres set:", response.data.genres);
        } else {
          console.log("⚠️ No genres found in API response.");
          setGenres([]); // Explicitly set empty array to avoid null issues
        }
      } catch (error) {
        console.error("❌ Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [selectedMood]);

  const handleGenreClick = (genreId) => {
    setSearchParams({ mood: selectedMood, genre: genreId.toString() });
    console.log("🎭 Updated URL:", `?mood=${selectedMood}&genre=${genreId}`);
  };

  if (genres === null) {
    return <p>🔄 Loading genres...</p>;
  }

  if (genres.length === 0) {
    return <p>⚠️ No genres found for this mood.</p>;
  }

  if (!Array.isArray(genres)) {
    return <p>⚠️ Could not load genres.</p>;
  }

  return (
    <ul className="genre-section__list">
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="genre-card"
          onClick={() => handleGenreClick(genre.id)}
        >
          <h4 className="genre-card__name">{genre.name}</h4>
          <p className="genre-card__description">{genre.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// import "./GenreList.scss";

// function GenreList({ selectedMood }) {
//   const [genres, setGenres] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log("Fetching genres for mood:", selectedMood);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       if (!selectedMood) return;
//       try {
//         const response = await axios.get(
//           `${backendUrl}/api/moods/${selectedMood}/genres`
//         );
//         console.log(response);
//         setGenres(response.data.genres);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchGenres();
//   }, [selectedMood]);

//   const handleGenreClick = (genreId) => {
//     setSearchParams({ mood: selectedMood, genre: genreId.toString() });
//     console.log("🎭 Updated URL:", `?mood=${selectedMood}&genre=${genreId}`);
//   };

//   if (!genres) {
//     return "Loading genres...";
//   }

//   return (
//     <ul className="genre-section__list">
//       {genres.map((genre) => (
//         <li
//           key={genre.id}
//           className="genre-card"
//           onClick={() => handleGenreClick(genre.id)}
//         >
//           <h4 className="genre-card__name">{genre.name}</h4>
//           <p className="genre-card__description">{genre.description}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default GenreList;
