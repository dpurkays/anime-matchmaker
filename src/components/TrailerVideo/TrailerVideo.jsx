import "./TrailerVideo.scss";

function TrailerVideo({ videoId, animeName }) {
  if (!videoId) return <p>No Trailer available</p>;
  const youtubeUrl = "https://www.youtube.com";

  return (
    <div className="video-container">
      <iframe
        src={`${youtubeUrl}/embed/${videoId}`}
        title={animeName}
        allowFullScreen
        className="video-container__video"
      ></iframe>
    </div>
  );
}

export default TrailerVideo;
