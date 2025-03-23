import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./MALUsernameModal.scss";

function MALUsernameModal({ isOpen, onClose, onUsernameSubmit }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (!username.trim()) return;
    onUsernameSubmit(username.trim());
    setUsername("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="mal-modal"
      overlayClassName="mal-model__overlay"
    >
      <header className="mal-modal__header">
        <h2 className="mal-modal__title">Connect Your MyAnimeList</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="none"
          className="mal-modal__cancel-svg"
          onClick={onClose}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </header>

      <p className="mal-modal__description">
        Share your MyAnimeList username for personalized anime recommendations
        based on what you already watched!
      </p>

      <form onSubmit={submitHandler} className="mal-modal__form">
        <input
          type="text"
          className="mal-modal__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. AnimeFan123"
          required
        />

        <div className="mal-modal__buttons">
          <button
            type="button"
            className="mal-modal__button mal-modal__button--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="mal-modal__button">
            Find my match
          </button>
        </div>
      </form>

      <div className="mal-modal__divider">or</div>

      <footer className="mal-modal__footer">
        <p className="mal-modal__description">
          Don't have a MyAnimeList account?
        </p>
        <p className="mal-modal__description">
          You can still get recommendations based on mood or similar shows!
        </p>
      </footer>
    </Modal>
  );
}

export default MALUsernameModal;
