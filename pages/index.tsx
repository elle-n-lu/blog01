import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { UpdootComp } from "../components/UpdootComp";
import { useHelloQuery, useMeQuery } from "../generated/graphql";
import { createApollo } from "../utils/createApolloClient";
import NextLink from "next/link";


interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const { data, loading, error } = useHelloQuery();
  const [readMore, setReadMore] = useState(false);
  if (!data && !loading) {
    console.log(error);
    return (
      <>
        <Navbar />
        <div>you got query failed for some reason</div>
      </>
    );
  }
  const divWidth = useRef();
  const divHeight = useRef();
  // useEffect(()=>{
  //   console.log("height", divHeight.current?.clientHeight)
  // },[])
  const a = [20, 16, 18, 12, 22];
  // console.log(a[Math.floor(Math.random() * 5)]);
  // console.log('safdasf',divHeight.current?.clientHeight)

  return (
    <>
      <Navbar />

      <div className=" flex flex-col mx-auto w-1/2 ">
        {/* <h1 className=" text-3xl font-bold underline">nihaoma ------------?</h1> */}
        {!data && !loading ? (
          <div>loading....</div>
        ) : (
          <>
            {data?.hello.posts.map((p) =>
              !p ? null : (
                <div className=" flex items-start border-b mt-8" key={p.id}>
                  <div className=" flex ml-2">
                    <UpdootComp post={p} />
                  </div>
                  <div className="  ml-4">
                    <div className="flex items-center h-15  ml-2">
                      <div className=" flex items-center justify-center bg-gray-200 rounded-full h-10 w-10 font-medium text-xl">
                        {p.creator.username.charAt(0)}
                      </div>
                      <NextLink href="/edit/[id]" as={`/edit/${p.id}`}> <p className=" ml-2 text-xl font-medium">{p.filename}</p></NextLink>
                    </div>
                    <div
                      className='m-4' 
                     
                    >
                      <p className=" font-normal">
                        {readMore
                          ? p.description
                          : `${p.description.substring(0, 50)}...`}
                        <button
                          className=" text-blue-700 text-sm"
                          onClick={() => setReadMore((prevReadMore)=>!prevReadMore)}
                        >
                          {readMore ? "read less" : "read more"}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default createApollo({ ssr: true })(index);
