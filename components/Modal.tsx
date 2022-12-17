import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { useCreateDescriptionMutation, useMeQuery } from "../generated/graphql";
import InputField from "./InputField";

export interface mProps {
  showModal: boolean ;
  changeModal: () => void ;
}
export const CreatePostSchema = Yup.object().shape({
  filename: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const Modals: React.FC<mProps > = ({ showModal, changeModal }) => {
  //   const [showModal, setShowModal] = React.useState(false);
  const [createDescription] = useCreateDescriptionMutation();
  const { data, loading } = useMeQuery();

  const router = useRouter();
  const apollo = useApolloClient();

  if(showModal)
  {if (!loading && !data?.me) {
    {
      router.replace("/login?next=" + router.pathname);
    }
  }}
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative md:w-1/2 w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 ">
                <Formik
                  validationSchema={CreatePostSchema}
                  initialValues={{ filename: "", description: ""}}
                  onSubmit={async (value) => {
                    // console.log(value);
                    const { errors,data } = await createDescription({
                      variables: value,
                      // update: (cache) => {
                      //   cache.evict({ fieldName: "hello:{}" });
                      //   console.log("cache", cache)
                      // },
                    });
                    // console.log("value", value)
                    // console.log(data?.createDescription.description)

                    if (!errors) {
                      router.push("/");
                      await apollo.resetStore();
                    }
                    changeModal()
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
                        Create Post
                      </button>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={changeModal}
                      >
                        Close
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modals
