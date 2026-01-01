import type { ArtistItem } from "../../services/fetch-artist";
import css from "./Hero.module.css";
import { MdOutlinePlayArrow } from "react-icons/md";

interface HeroProps {
  artists: ArtistItem[];
}

export default function Hero({ artists }: HeroProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = e.currentTarget.getAttribute("href")?.slice(1);
    const element = document.getElementById(targetId || "");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={css["hero-section"]} id="hero">
      <div className={css["hero-content"]}>
        <h1 className={css["hero-title"]}>
          Discover Your Next Favorite Artist Today
        </h1>

        <p className={css["hero-text"]}>
          Dive into a world of music discoveries with ArtistsHub – your personal
          guide to the boundless universe of sound. Explore, filter, and learn
          about your favorite artists all in one place.
        </p>

        <a
          className={css["hero-link"]}
          href="#gallery-start"
          onClick={handleScroll}
        >
          Explore Artists
          <MdOutlinePlayArrow className={css["hero-link-arrow"]} />
        </a>
      </div>

      <div className={css["hero-images"]}>
        <div className={css["hero-images-row"]}>
          <div className={css["col-left"]}>
            {[...artists.slice(0, 5), ...artists.slice(0, 5)].map(
              (artist, i) => (
                <img
                  className={css["hero-img"]}
                  key={`left-${artist._id}-${i}`}
                  src={artist.strArtistThumb}
                  alt={artist.strArtist}
                />
              )
            )}
          </div>

          <div className={css["col-right"]}>
            {[...artists.slice(5), ...artists.slice(5)].map((artist, i) => (
              <img
                className={css["hero-img"]}
                key={`right-${artist._id}-${i}`}
                src={artist.strArtistThumb}
                alt={artist.strArtist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
