import HomeRightSidebar from "@/src/components/modules/Home/HomeRightSidebar";
import NewsFeed from "@/src/components/modules/Home/NewsFeed";
import Posts from "@/src/components/modules/Home/Posts";

export default function Home() {
  return (
    <section className="flex flex-col xl:flex-row gap-10">
      <div className="w-full max-w-[600px]  xl:px-10">
        <NewsFeed />
        <Posts />
      </div>
      <div className="hidden xl:block xl:w-[250px]">
        <HomeRightSidebar />
      </div>
    </section>
  );
}
