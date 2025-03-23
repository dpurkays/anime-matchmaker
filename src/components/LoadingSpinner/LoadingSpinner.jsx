import BounceLoader from "react-spinners/BounceLoader";
import "./LoadingSpinner.scss";

function LoadingSpinner() {
  return (
    <div id="loading-container" className="loading-container">
      <BounceLoader color="#FF477E" size={40} />
    </div>
  );
}

export default LoadingSpinner;
