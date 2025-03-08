import Image from "next/image";
import profile from "@/src/assets/img/profile.jpg";
import user from "@/src/assets/img/user.jpg";
import { MoreOption } from "../../shared/Icon";

const Posts = () => {
  return (
    <div className="pt-10 flex items-center justify-center">
      <div className="flex flex-col w-[400px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full"
              width={40}
              height={40}
              src={profile}
              alt="user"
            />
            <div>
              <h5 className="text-sm">sabbir123</h5>
              <p className="text-secondary text-xs">Sabbir Hossain</p>
            </div>
          </div>
          <button>
            <MoreOption />
          </button>
        </div>
        <div>
          <Image src={user} height={200} width={400} alt="user" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
