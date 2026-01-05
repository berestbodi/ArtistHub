import css from "./ArtistWindow.module.css";
import { FaYoutube } from "react-icons/fa";
import type { Albums } from "../../services/fetch-artist-by-id";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";
interface ArtistWindowProps {
  artistInfo: Albums;
}

export default function ArtistWindow({ artistInfo }: ArtistWindowProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalAlbums = artistInfo?.albumsList?.length || 0;
  const pageCount = Math.ceil(totalAlbums / itemsPerPage);

  const indexOfLastAlbum = currentPage * itemsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage;

  const currentAlbums =
    artistInfo?.albumsList?.slice(indexOfFirstAlbum, indexOfLastAlbum) || [];

  return (
    <>
      <h1 className={css["actor-name"]}>{artistInfo.strArtist}</h1>

      <div className={css["actor"]}>
        <div className={css["actor-img-wrapper"]}>
          {artistInfo.strArtistThumb ? (
            <img
              className={css["actor-img"]}
              src={artistInfo.strArtistThumb}
              alt={artistInfo.strArtist}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className={css["actor-info"]}>
          <div className={css["actor-info-container"]}>
            <div className={css["actor-info-thumb"]}>
              <div>
                <h2>Years active</h2>
                <p>
                  {getYears(artistInfo.intFormedYear, artistInfo.intDiedYear)}
                </p>
              </div>
              <div>
                <h2>Sex</h2>
                <p>{artistInfo.strGender || "Information missing"}</p>
              </div>
            </div>
            <div className={css["actor-info-thumb"]}>
              <div>
                <h2>Members</h2>
                <p>{artistInfo.intMembers || "Information missing"}</p>
              </div>
              <div>
                <h2>Country</h2>
                <p>{artistInfo.strCountry || "Information missing"}</p>
              </div>
            </div>
          </div>
          <div className={css["actor-biography"]}>
            <h2>Biography</h2>
            <p>
              {artistInfo.strBiographyEN
                ? artistInfo.strBiographyEN.length > 500
                  ? artistInfo.strBiographyEN.slice(0, 500) + "..."
                  : artistInfo.strBiographyEN
                : "Information missing"}
            </p>
          </div>
          <div className={css["actor-cards"]}>
            {Array.isArray(artistInfo.genres) &&
              artistInfo.genres.map((genre) => (
                <span className={css["gallery-genre"]} key={genre}>
                  {genre}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className={css["albums"]}>
        <h2 id="albums-container">Albums</h2>
        <div className={css["albums-cards"]}>
          {currentAlbums.length > 0 &&
            currentAlbums.map((album) => (
              <div className={css["album-card"]} key={album._id}>
                <h3>{album.strAlbum}</h3>
                <div className={css["table-header"]}>
                  <span>Track</span>
                  <span>Time</span>
                  <span>Link</span>
                </div>
                <ul className={css["track-list"]}>
                  {album.tracks.map((track) => (
                    <li key={track._id} className={css["track-item"]}>
                      <span className={css["track-name"]}>
                        {track.strTrack}
                      </span>
                      <span className={css["track-time"]}>
                        {formatDuration(Number(track.intDuration))}
                      </span>
                      {track.movie && (
                        <span className={css["track"]}>
                          <a
                            href={track.movie}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaYoutube className={css["ytb-icon"]} />
                          </a>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <Pagination
          page={currentPage}
          pageCount={pageCount}
          setPage={setCurrentPage}
          scrollTargetId="albums-container"
        />
      </div>
    </>
  );
}

const getYears = (formedYear?: number, diedYear?: number) => {
  if (!formedYear && !diedYear) return "Information missing";
  if (!diedYear) return `${formedYear}-present`;
  return `${formedYear} - ${diedYear}`;
};

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
