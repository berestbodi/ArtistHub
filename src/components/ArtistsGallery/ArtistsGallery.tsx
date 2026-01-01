import type { ArtistItem } from "../../services/fetch-artist";
import css from "./ArtistsGallery.module.css";

interface ArtistsGalleryProps {
  artists: ArtistItem[];
  onSelect: (artistId: string) => void;
  children: React.ReactNode;
}

export default function ArtistsGallery({
  artists,
  onSelect,
  children,
}: ArtistsGalleryProps) {
  return (
    <div className={css.container}>
      <span className={css["span"]} id="gallery-start">
        Artist
      </span>
      <h2 className={css["main-title"]}>Explore Your New Favorite Artists</h2>

      <div className={css.searchBox}>{children}</div>

      <ul className={css.gallery}>
        {artists?.map((artist) => (
          <li
            className={css["gallery-item"]}
            key={artist._id}
            onClick={() => onSelect(artist._id)}
          >
            <img
              className={css["gallery-img"]}
              src={artist.strArtistThumb}
              alt={artist.strArtist}
              width={640}
            />

            <div className={css["gallery-genres"]}>
              {artist.genres?.map((genre) => (
                <span className={css["gallery-genre"]} key={genre}>
                  {genre}
                </span>
              ))}
            </div>

            <h2 className={css["title"]}>{artist.strArtist}</h2>

            <p className={css["text"]}>
              {artist.strBiographyEN
                ? artist.strBiographyEN.slice(0, 150) + "..."
                : "No biography available."}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
