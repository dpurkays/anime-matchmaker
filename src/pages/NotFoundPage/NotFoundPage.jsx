import embarassedImage from "../../assets/images/gif/blush.gif";
import "./NotFoundPage.scss";

function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__context">
        <h1 className="not-found__title">404 Error</h1>
        <p className="not-found__text">
          Well this is embarassing, we can't find this page.
        </p>
      </section>
      <img
        src={embarassedImage}
        alt="anime boy blushing"
        className="not-found__img"
      />
    </main>
  );
}

export default NotFoundPage;
