import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ArtistsGallery from "../ArtistsGallery/ArtistsGallery";
import Loader from "../Loader/Loader";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import type { ArtistsResponse } from "../../services/fetch-artist";
import fetchArtist from "../../services/fetch-artist";
import toast, { Toaster } from "react-hot-toast";
import ArtistWindow from "../ArtistWindow/ArtistWindow";
import fetchArtistById, {
  type Albums,
} from "../../services/fetch-artist-by-id";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Pagination from "../Pagination/Pagination";
import About from "../About/About";
import {
  fetchFeedbacks,
  type FetshFeedbackProps,
} from "../../services/fetch-feedbacks";
import Feedbacks from "../Feedbacks/Feedbacks";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import Footer from "../Footer/Footer";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isHeaderModalOpen, setHeaderModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const { data, isError } = useQuery<ArtistsResponse>({
    queryKey: ["artists", currentPage, query, genre, sort],
    queryFn: () => fetchArtist(currentPage, query, genre, sort),
    placeholderData: keepPreviousData,
    retry: 1,
  });

  const { data: feedbacks } = useQuery<FetshFeedbackProps>({
    queryKey: ["feedbacks"],
    queryFn: () => fetchFeedbacks(),
  });

  const {
    data: artistInfo,
    isLoading: artistInfoLoading,
    isError: artistInfoError,
  } = useQuery<Albums>({
    queryKey: ["artistsById", selectedArtistId],
    queryFn: () =>
      selectedArtistId
        ? fetchArtistById(selectedArtistId, 8)
        : Promise.reject("No ID"),
    enabled: !!selectedArtistId,
    retry: 1,
  });

  const feedbackToast = () => {
    toast.success("Thank you for your feedback!", {
      style: {
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "#060310",
        padding: "16px",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (isError || artistInfoError) {
      toast.error("Failed to load data", {
        style: {
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "#060310",
          padding: "16px",
          color: "#fff",
        },
      });
    }
  }, [isError, artistInfoError]);

  const pageCount = data ? Math.ceil(data.totalArtists / data.limit) : 0;

  return (
    <div className={css.container}>
      <Header openModal={() => setHeaderModalOpen(true)} />

      {data && (
        <>
          <Hero artists={data.artists} />
          <ArtistsGallery
            artists={data.artists}
            onSelect={(artistId: string) => {
              setSelectedArtistId(artistId);
              setIsModalOpen(true);
            }}
          >
            <SearchBox
              query={query}
              setState={(query: string, page: number) => {
                setQuery(query);
                setCurrentPage(page);
              }}
              setGenre={setGenre}
              setSort={setSort}
            />
          </ArtistsGallery>
        </>
      )}

      {artistInfoLoading && <Loader />}

      <Toaster
        position="top-center"
        toastOptions={{
          className: "my-custom-toast",
        }}
      />

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          page={currentPage}
          setPage={setCurrentPage}
          scrollTargetId="gallery-start"
        />
      )}

      <About />

      {feedbacks && (
        <Feedbacks
          feedbacks={feedbacks?.data}
          openModal={() => setFeedbackModalOpen(true)}
        />
      )}

      <Footer />

      {isModalOpen && artistInfo && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedArtistId(null);
          }}
        >
          <ArtistWindow artistInfo={artistInfo} />
        </Modal>
      )}

      {isFeedbackModalOpen && (
        <Modal onClose={() => setFeedbackModalOpen(false)}>
          <FeedbackModal
            onClose={() => {
              setFeedbackModalOpen(false);
              feedbackToast();
            }}
          />
        </Modal>
      )}

      {isHeaderModalOpen && (
        <Modal onClose={() => setHeaderModalOpen(false)}>
          <HeaderMenu onClose={() => setHeaderModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
