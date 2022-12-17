import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ImBin, ImPencil } from "react-icons/im";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import {
  useDeletePostMutation, useMyPostQuery,
  useUpdatePostMutation
} from "../generated/graphql";
import { createApollo } from "../utils/createApolloClient";
import { CreatePostSchema } from "./you";

interface myPostsProps {}

const myPosts: React.FC<myPostsProps> = ({}) => {
  const { data } = useMyPostQuery();
  const [deletePost] = useDeletePostMutation();
  const [updateDescription] = useUpdatePostMutation();
  const router = useRouter();
  const apollo = useApolloClient();

  // const [style, setStyle] = useState({ display: "none" });
  const [editIndex, setEditIndex] = useState<number>(0);
  // const [showModal, setShowModal] = React.useState(false);
  const [value, setValue] = useState("");
  // const changeModal = () => {
  //   setShowModal((prevShowModal) => !prevShowModal);
  // };

  const [im, setIm] = useState<any>({});
  const re = useRef({});
  useEffect(() => {
    setIm(im);
    re.current = im;
  }, [im]);
  // console.log("im", im);
  return (
    <>
      <Navbar />

      <div className=" flex flex-col  items-left mx-20 lg:mx-80">
        {data?.mypost?.posts?.map((p) => (
          <div
            key={p.id}
            className="flex-col mt-4 border rounded-md"
            // onMouseEnter={(e) => {
            //   setStyle({ display: "block" });
            //   setEditIndex((editIndex) => (editIndex === p.id ? 0 : p.id));

            // }}
            // onMouseLeave={(e) => {
            //   setStyle({ display: "none" });
            //   // setEditIndex(0)
            // }}
          >
            <div className="flex justify-between border-b bg-gray-300">
              <p className="font-bold text-lg p-4">{p.filename}</p>

              <div className=" text-sm p-4">
                {value == "edit" && (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative md:w-1/2 w-full">
                        {/*content*/}

                        <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 ">
                          {/* <div> {im.id}  <br />{im.filename}</div> */}
                          <Formik
                            validationSchema={CreatePostSchema}
                            initialValues={{
                              filename: im.filename,
                              description: im.description,
                            }}
                            onSubmit={async (value) => {
                              // console.log(value);
                              const { errors, data } = await updateDescription({
                                variables: {
                                  id: im.id,
                                  description: value.description,
                                  filename: value.filename,
                                },
                                update: (cache) => {
                                  cache.evict({ fieldName: "posts:{}" });
                                  // console.log("cache", cache);
                                },
                              });

                              // if (!errors) {
                              //   router.push("/");
                              //   await apollo.resetStore();
                              // }
                              // changeModal();
                              setValue("");
                            }}
                          >
                            {() => (
                              <Form>
                                {/* <InputField label="name" placeholder="name" name="name" /> */}

                                <InputField
                                  label="filename"
                                  placeholder="filename"
                                  name="filename"
                                />

                                <InputField
                                  label="description"
                                  placeholder="description"
                                  name="description"
                                />

                                <button
                                  type="submit"
                                  // onClick={changeModal}
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                  Update Post
                                </button>
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setValue("")}
                                >
                                  Cancel
                                </button>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}
                {value == "delete" && (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative md:w-1/2 w-full">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 ">
                          You sure to delete ?
                          <div className="flex ">
                            <button
                              type="button"
                              onClick={() => {
                                deletePost({
                                  variables: { id: im.id },
                                  update: (cache) => {
                                    cache.evict({ id: "Posts" + im.id });
                                    apollo.resetStore()
                                    // console.log('sasa',cache)
                                  },
                                });

                                // changeModal();
                                setValue("");
                              }}
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                            >
                              Delete
                            </button>
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setValue("")}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                )}
                <button
                  className=" hover:shadow-lg shadow-red-600 p-2 mr-2 text-lg text-red-600 "
                  onClick={() => {
                    setIm({
                      ...im,
                      id: p.id,
                    });
                    // changeModal();
                    setValue("delete");
                    // deletePost({
                    //   variables: { id: p.id },
                    //   update: (cache) => {
                    //     cache.evict({ id: "Posts" + p.id });
                    //     // console.log("sasa", cache);
                    //   },
                    // });
                  }}
                >
                 <ImBin />
                </button>
                <button
                  className=" hover:shadow-lg shadow-green-700 text-lg px-2  text-green-700 "
                  onClick={() => {
                    setIm({
                      ...im,
                      id: p.id,
                      filename: p.filename,
                      description: p.description,
                    });
                    // changeModal();
                    setValue("edit");
                    // console.log("editindex", p.id, im);
                  }}
                >
                 <ImPencil />
                </button>
              </div>
            </div>
            <p className=" font-light p-4">{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default createApollo()(myPosts);
