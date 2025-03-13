"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import profile from "@/src/assets/img/profile.jpg";
import { useRef } from "react";

const NewsFeed = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImage = () => {
    fileInputRef.current!.click();
  };

  const handleAddNewsFeed = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files![0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // addNewsFeed(formData, {
      //   onSuccess(data) {
      //     if (data?.success) {
      //       toast.success(data?.message);
      //     } else {
      //       toast.error(data?.message);
      //     }
      //   },
      // });
    }
  };
  return (
    <div className="max-w-[100vw]  mx-auto px-3 ">
      <Swiper
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{ width: "85px", position: "relative" }}>
          <button onClick={handleOpenImage}>
            <input
              hidden
              ref={fileInputRef}
              onChange={handleAddNewsFeed}
              type="file"
            />
            <Image
              src={profile}
              alt="user"
              width={70}
              height={70}
              className="rounded-[1000px]"
            />
            <p className="text-xs mt-1">Your story</p>
            <p className="h-6 w-6 rounded-full bg-default text-xl font-bold flex items-center justify-center border-white border-[0.5px] absolute bottom-5 right-5">
              +
            </p>
          </button>
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
