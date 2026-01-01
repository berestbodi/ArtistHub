import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  page,
  pageCount,
  setPage,
}: PaginationProps) {
  const [pageRange, setPageRange] = useState(window.innerWidth < 768 ? 1 : 3);

  useEffect(() => {
    const handleResize = () => {
      setPageRange(window.innerWidth < 768 ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      pageRangeDisplayed={pageRange}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => {
        setPage(selected + 1);
        const element = document.getElementById("gallery-start");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageLinkClassName={css.pageLink}
      pageClassName={css.pageItem}
      previousClassName={css.prevItem}
      nextClassName={css.nextItem}
      nextLabel={<FaArrowRight />}
      previousLabel={<FaArrowLeft />}
      breakLabel="..."
    />
  );
}
