import "./SectionHeader.scss";

function SectionHeader({ title, backClickHandler }) {
  return (
    <header className="section-header">
      <div className="section-header__back-button" onClick={backClickHandler}>
        <svg
          className="section-header__back-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="none"
        >
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg>
        <p className="section-header__back-text">Back</p>
      </div>
      <h2 className="section-header__title">{title}</h2>
    </header>
  );
}

export default SectionHeader;
