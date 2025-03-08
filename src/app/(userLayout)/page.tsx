import HomeRightSidebar from "@/src/components/modules/Home/HomeRightSidebar";
import NewsFeed from "@/src/components/modules/Home/NewsFeed";
import Posts from "@/src/components/modules/Home/Posts";

export default function Home() {
  return (
    <section className="flex">
      <div className="w-[630px] px-10">
        <NewsFeed />
        <Posts />
      </div>
      <div className="w-[300px]">
        <HomeRightSidebar />
      </div>
    </section>
  );
}
