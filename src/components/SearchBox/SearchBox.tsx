import { useState, useEffect, useRef } from "react";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import fetchGenres, { type Genres } from "../../services/fetch-genres";
import { useQuery } from "@tanstack/react-query";

interface SearchBoxProps {
  query: string;
  setGenre: (genre: string) => void;
  setState: (query: string, page: number) => void;
  setSort: (sort: string) => void;
}

export default function SearchBox({
  query,
  setGenre,
  setState,
  setSort,
}: SearchBoxProps) {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const [selectedGenreName, setSelectedGenreName] = useState("All Genres");
  const [selectedSort, setSelectedSort] = useState("Default");

  const sortRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpenSort(false);
      }
      if (
        genreRef.current &&
        !genreRef.current.contains(event.target as Node)
      ) {
        setIsOpenGenres(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debounced = useDebouncedCallback((value: string) => {
    setState(value, 1);
  }, 500);

  const { data } = useQuery<Genres[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const handleSelectGenre = (name: string) => {
    setSelectedGenreName(name);
    setIsOpenGenres(false);
    setGenre(name === "All Genres" ? "" : name);
  };

  const handleSelectedSort = (value: "asc" | "desc" | "default") => {
    if (value === "asc") {
      setSelectedSort("a -> z");
      setSort("asc");
    } else if (value === "desc") {
      setSelectedSort("z -> a");
      setSort("desc");
    } else {
      setSelectedSort("Default");
      setSort("");
    }
    setIsOpenSort(false);
  };

  const handleReset = () => {
    setSelectedGenreName("All Genres");
    setSelectedSort("Default");
    setGenre("");
    setSort("");
    setState("", 1);
    setIsOpenGenres(false);
    setIsOpenSort(false);
  };

  return (
    <div className={css.container}>
      <label className={css.labelQuery}>
        <CiSearch className={css.searchIcon} />
        <input
          className={css.input}
          type="text"
          defaultValue={query}
          placeholder="Search artists..."
          onChange={(e) => debounced(e.target.value)}
        />
      </label>

      <div className={css.dropdownWrapper} ref={sortRef}>
        <div
          className={css.dropdownHeader}
          onClick={() => setIsOpenSort(!isOpenSort)}
        >
          <span>{selectedSort}</span>
          <IoIosArrowUp className={isOpenSort ? css.rotate : ""} />
        </div>
        {isOpenSort && (
          <ul className={css.dropdownList}>
            <li onClick={() => handleSelectedSort("default")}>Default</li>
            <li onClick={() => handleSelectedSort("asc")}>a -{">"} z</li>
            <li onClick={() => handleSelectedSort("desc")}>z -{">"} a</li>
          </ul>
        )}
      </div>

      <div className={css.dropdownWrapper} ref={genreRef}>
        <div
          className={css.dropdownHeader}
          onClick={() => setIsOpenGenres(!isOpenGenres)}
        >
          <span>{selectedGenreName}</span>
          <IoIosArrowUp className={isOpenGenres ? css.rotate : ""} />
        </div>
        {isOpenGenres && (
          <ul className={css.dropdownList}>
            <li onClick={() => handleSelectGenre("All Genres")}>All Genres</li>
            {data &&
              Array.isArray(data) &&
              data.map((genre) => (
                <li
                  key={genre._id}
                  onClick={() => handleSelectGenre(genre.genre)}
                >
                  {genre.genre}
                </li>
              ))}
          </ul>
        )}
      </div>

      <button className={css["reset-btn"]} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
