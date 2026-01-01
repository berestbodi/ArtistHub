import css from "./Loader.module.css";

export default function ArtistWindow() {
  return (
    <div className={css["three-body"]}>
      <div className={css["three-body__dot"]}></div>
      <div className={css["three-body__dot"]}></div>
      <div className={css["three-body__dot"]}></div>
    </div>
  );
}
