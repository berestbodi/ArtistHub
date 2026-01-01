import css from "./About.module.css";
import teamImg from "./img/team.jpg";

export default function About() {
  return (
    <div className={css["about"]} id="about">
      <img
        className={css["img"]}
        src={teamImg}
        alt="team-photo"
        width={640}
        height={665}
      />
      <div className={css["container-about-inf"]}>
        <h2 className={css["title"]}>About ArtistsHub</h2>

        <p className={css["text"]}>
          At ArtistsHub, our mission is to connect music lovers with the artists
          they adore. We strive to create a vibrant community where discovering
          new music is as enjoyable as listening to it.
        </p>
      </div>
    </div>
  );
}
