import css from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={css["footer"]}>
      <div className={css["nav-container"]}>
        <a href="/" className={css["nav-main-link"]}>
          ArtistHub
        </a>
        <ul className={css["nav-list"]}>
          <li>
            <a className={css["nav-links"]} href="#gallery-start">
              Artists
            </a>
          </li>
          <li>
            <a className={css["nav-links"]} href="#about">
              About Us
            </a>
          </li>
          <li>
            <a className={css["nav-links"]} href="#feedbacks">
              Reviews
            </a>
          </li>
        </ul>
      </div>
      <div className={css["social-media"]}>
        <div>
          <p>© 2025 ArtistsHub. All rights reserved.</p>
        </div>
        <div className={css["social-icons"]}>
          <a href="">
            <FaInstagram className={css["social-icon"]} />
          </a>
          <a href="">
            <FaFacebook className={css["social-icon"]} />
          </a>
          <a href="">
            <FaYoutube className={css["social-icon"]} />
          </a>
        </div>
      </div>
    </div>
  );
}
