import PostDetails from "@/src/components/modules/PostDetails/PostDetails";

const SinglePost = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  return <div className="w-full">{<PostDetails postId={postId} />}</div>;
};

export default SinglePost;
