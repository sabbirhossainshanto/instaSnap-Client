"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const NewsFeed = () => {
  return (
    <div>
      <>
        <Swiper
          slidesPerView="auto"
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide style={{ width: "100px" }}>Slide 1</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
          <SwiperSlide style={{ width: "100px" }}>Slide 2</SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default NewsFeed;
