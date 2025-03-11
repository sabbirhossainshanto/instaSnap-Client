"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import profile from "@/src/assets/img/profile.jpg";

const NewsFeed = () => {
  return (
    <div className="max-w-[100vw]  mx-auto px-3 ">
      <Swiper
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
        <SwiperSlide style={{ width: "85px" }}>
          <Image
            src={profile}
            alt="user"
            width={70}
            height={70}
            className="rounded-[1000px]"
          />
          <p className="text-xs mt-1">sabbirhoss...</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default NewsFeed;
