import type { Feedback } from "../../services/fetch-feedbacks";
import css from "./Feedbacks.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface FeedbacksProps {
  feedbacks: Feedback[];
  openModal: () => void;
}

export default function Feedbacks({ feedbacks, openModal }: FeedbacksProps) {
  return (
    <div className={css.sliderWrapper} id="feedbacks">
      <div className={css.swiperContainer}>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className={css.mySwiper}
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div className={css.slideCard}>
                <div className={css.starsContainer}>
                  <Rating
                    initialValue={Number(Math.ceil(feedback.rating))}
                    readonly={true}
                    size={24}
                    fillColor="#764191"
                    emptyColor="rgba(255, 255, 255, 0.2)"
                  />
                </div>
                <h3 className={css.comment}>"{feedback.descr}"</h3>
                <p className={css.userName}>{feedback.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={`prev-button ${css.navBtn} ${css.prev}`}>
          <FaArrowLeft />
        </button>
        <button className={`next-button ${css.navBtn} ${css.next}`}>
          <FaArrowRight />
        </button>
      </div>

      <div className={css["btn-container"]}>
        <button className={css["btn-feedback"]} onClick={openModal}>
          Leave feedback
        </button>
      </div>
    </div>
  );
}
