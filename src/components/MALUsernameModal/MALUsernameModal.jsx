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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="none"
        className="mal-modal__cancel-svg"
        onClick={onClose}
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
      <h2 className="mal-modal__title">Enter your MyAnimeList Username</h2>
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
          <button type="button" className="mal-modal__cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="mal-modal__button">
            Find my match
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default MALUsernameModal;
