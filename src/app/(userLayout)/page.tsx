import HomeRightSidebar from "@/src/components/modules/Home/HomeRightSidebar";
import NewsFeed from "@/src/components/modules/Home/NewsFeed";
import Posts from "@/src/components/modules/Home/Posts";

export default function Home() {
  return (
    <section className="flex pt-2 xl:pt-10 max-w-[1100px]">
      <div className="w-full">
        <NewsFeed />
        <Posts />
      </div>
      <div className="hidden xl:block w-full max-w-[250px]">
        <HomeRightSidebar />
      </div>
    </section>
  );
}
