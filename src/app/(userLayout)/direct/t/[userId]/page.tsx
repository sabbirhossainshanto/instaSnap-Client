import SingleInbox from "@/src/components/modules/SingleInbox/SingleInbox";

const SingleUser = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  return (
    <div className="h-screen">
      <SingleInbox userId={userId} />
    </div>
  );
};

export default SingleUser;
