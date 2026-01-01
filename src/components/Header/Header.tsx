import css from "./Header.module.css";
import { PiList } from "react-icons/pi";

interface Props {
  openModal: () => void;
}

export default function Header({ openModal }: Props) {
  return (
    <div>
      <nav className={css["header"]}>
        <div className={css["header-logo-container"]}>
          <a className={css["header-links"]} href="#hero">
            ArtistHub
          </a>
        </div>
        <div className={css["icon-container"]}>
          <PiList className={css["burger-icon"]} onClick={openModal} />
        </div>

        <ul className={css["header-list"]}>
          <li>
            <a className={css["header-links"]} href="#gallery-start">
              Artists
            </a>
          </li>
          <li>
            <a className={css["header-links"]} href="#about">
              About Us
            </a>
          </li>
          <li>
            <a className={css["header-links"]} href="#feedbacks">
              Reviews
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
