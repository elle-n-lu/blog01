import Navbar from "../../components/Navbar";
import { createApollo } from "../../utils/createApolloClient";
import { UsePostFromUrl } from "../../utils/usePostFromUrl";
import NextLink from "next/link";

const Post = ({}) => {
  const { data, loading, error } = UsePostFromUrl();
  // console.log(data, loading);
  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error.message);
  }

  if (!data?.singlePost) {
    return (
      <>
        <Navbar />
        <div className=" flex flex-col mx-auto w-1/2 ">no such post</div>
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div
        className=" w-14 sticky top-1/2 "
        style={{ left: "85%" }}
      >
        <NextLink
          href="/edit/pork/[id]"
          as={`/edit/pork/${data.singlePost.id}`}
        
        >
          <button className=" px-4 py-2 rounded-xl bg-green-300 text-white hover:bg-green-600">
            edit
          </button>
        </NextLink>
        
          <button className=" p-2 rounded-xl mt-2 bg-red-300 text-white hover:bg-red-600">
            delete
          </button>
        
      </div>
      <div className="grid grid-flow-row auto-rows-max mx-auto w-1/2 justify-center ">
        <div className=" row-auto text-2xl font-bold tracking-wider">
          {data.singlePost.filename}
        </div>
        <p className=" mt-8 ">{data.singlePost.description}</p>
      </div>
    </>
  );
};

export default createApollo({ ssr: true })(Post);
