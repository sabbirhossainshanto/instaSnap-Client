import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { Create, Media } from "../../shared/Icon";
import ISButton from "@/src/lib/ISButton/ISButton";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BiArrowBack } from "react-icons/bi";
import { useUser } from "@/src/providers/user.provider";
import Image from "next/image";
import images from "@/src/assets/images";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useCreatePost, useGetAllPost } from "@/src/hooks/post.hook";
import { TResponse } from "@/src/types";
import { TLoginResponse } from "@/src/types/login.type";
import { notification } from "@/src/utils/notification";
import { useAppSelector } from "@/src/lib/redux/hook";

export default function CreatePost() {
  const { decreaseSidebarWidth } = useAppSelector((state) => state.global);
  const { refetch } = useGetAllPost();
  const { mutate: handleCreatePost } = useCreatePost();
  const [caption, setCaption] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useUser();
  const [photos, setPhotos] = useState<File[] | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpenImage = () => {
    fileInputRef.current!.click();
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setCaption((prev) => prev + emoji.emoji);
    setShowEmoji(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setPhotos(fileArray);
      setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const createPost = () => {
    const formData = new FormData();
    if (photos) {
      photos.forEach((photo) => {
        formData.append("files", photo);
      });
    }
    formData.append("data", JSON.stringify({ caption }));
    handleCreatePost(formData, {
      onSuccess: (data: TResponse<TLoginResponse>) => {
        if (data?.success) {
          refetch();
          notification({ message: data?.message });
          onClose();
        } else {
          notification({ message: data?.message, color: "warning" });
        }
      },
    });
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
      >
        <Create />
        <span
          className={`hidden xl:block ${decreaseSidebarWidth ? "!hidden" : ""}`}
        >
          Create
        </span>
      </button>
      <Modal
        hideCloseButton
        size={`${previewImages?.length > 0 ? "5xl" : "2xl"}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center justify-center text-sm bg-primary h-[24]">
                {previewImages?.length > 0 ? (
                  <div className="flex justify-between w-full">
                    <button onClick={() => setPreviewImages([])}>
                      <BiArrowBack size={20} />
                    </button>
                    <button onClick={createPost} className="text-default">
                      Share
                    </button>
                  </div>
                ) : (
                  "Create New Post"
                )}
              </ModalHeader>
              <ModalBody className="p-0">
                <div className="flex flex-col items-center justify-center min-h-[450]  gap-10">
                  {previewImages?.length > 0 ? (
                    <div className="grid grid-cols-12 w-full h-full">
                      <Swiper
                        slidesPerView={1}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper w-full col-span-7"
                      >
                        {previewImages?.map((image) => (
                          <SwiperSlide key={image} style={{ width: "100%" }}>
                            <img
                              src={image}
                              alt="user"
                              className="w-full h-full object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="col-span-5 h-full p-4">
                        <div className="flex items-center gap-3 mb-5">
                          <Image
                            height={25}
                            width={25}
                            alt="user"
                            className="rounded-full"
                            src={user?.profilePhoto || images.user}
                          />
                          <p>{user?.userName}</p>
                        </div>

                        <div className="space-y-3">
                          <Textarea
                            style={{ fontSize: "1.25rem" }}
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Whats on your mind"
                          />
                        </div>
                        <button
                          onClick={() => setShowEmoji((prev) => !prev)}
                          className="mt-12"
                        >
                          <HiOutlineEmojiHappy size={30} />
                        </button>

                        <div style={{ position: "fixed" }}>
                          <EmojiPicker
                            height={"335px"}
                            open={showEmoji}
                            onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 flex flex-col justify-center items-center">
                      <Media />
                      <input
                        onChange={handleImageChange}
                        hidden
                        multiple
                        ref={fileInputRef}
                        type="file"
                      />
                      <ISButton onPress={handleOpenImage} radius="sm">
                        Select from device
                      </ISButton>
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
