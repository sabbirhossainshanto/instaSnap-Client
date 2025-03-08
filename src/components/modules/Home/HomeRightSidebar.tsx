import Image from "next/image";
import profile from "@/src/assets/img/profile.jpg";

const HomeRightSidebar = () => {
  return (
    <div>
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
        <button className="text-default text-sm hover:text-primary transition-colors">
          Switch
        </button>
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm text-secondary">Suggested for you</h6>
          <button className="text-sm">See All</button>
        </div>
        <div className="pt-3 space-y-4">
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
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
                <p className="text-secondary text-xs">Suggested for you</p>
              </div>
            </div>
            <button className="text-default text-sm hover:text-primary transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRightSidebar;
