import css from "./HeaderMenu.module.css";

interface Props {
  onClose: () => void;
}

export default function HeaderMenu({ onClose }: Props) {
  return (
    <div>
      <ul className={css["header-list"]}>
        <li>
          <a
            className={css["header-links"]}
            href="#gallery-start"
            onClick={onClose}
          >
            Artists
          </a>
        </li>
        <li>
          <a className={css["header-links"]} href="#about" onClick={onClose}>
            About Us
          </a>
        </li>
        <li>
          <a
            className={css["header-links"]}
            href="#feedbacks"
            onClick={onClose}
          >
            Reviews
          </a>
        </li>
      </ul>
    </div>
  );
}
