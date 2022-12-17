import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Navbar from "../../../components/Navbar";
import { Post, useUpdatePostMutation } from "../../../generated/graphql";
import { createApollo } from "../../../utils/createApolloClient";
import { UsePostFromUrl } from "../../../utils/usePostFromUrl";

const UpdatePost: React.FC = ({}) => {
  const router = useRouter();
  const { loading, data } = UsePostFromUrl();
  const [updatePost] = useUpdatePostMutation();
  if (loading) {
    return <div>loading...</div>;
  }

  if (!data?.singlePost) {
    return <div>post not exist</div>;
  }

  return (
    <>
      <Navbar />
      <div className=" mt-8 mx-auto h-screen w-4/5 md:w-1/2 justify-center ">
        <Formik
          initialValues={{
            filename: data.singlePost.filename,
            description: data.singlePost.description,
          }}
          onSubmit={async (values) => {
            await updatePost({
              variables: { id: (data.singlePost as Post).id, ...values },
            });
            router.push("/");
          }}
        >
          {() => (
            <Form>
              <InputField label="filename" name="filename" />

              <InputField label="description" name="description" />
              <div className=" grid grid-cols-5 mt-4">
                  <button
                    type="submit"
                    className=" bg-green-600 mr-2  p-2 rounded-lg col-start-4 cols-span-1"
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    className=" bg-red-400  p-2 rounded-lg"
                  >
                    Cancel
                  </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default createApollo()(UpdatePost);
