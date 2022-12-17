import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { createApollo } from "../utils/createApolloClient";
import { toErrorMap } from "../utils/toErrorMap";

// const SignupSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(3, "Too Short!")
//     .max(10, "Too Long!")
//     .required("Required"),
//   password: Yup.string().required("Required"),
// });

const login: React.FC = ({}) => {
  const inputClass =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const [login] = useLoginMutation();
  const { data } = useMeQuery();
  const router = useRouter();
  const apollo = useApolloClient();
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className=" mx-auto mt-36">
          <Formik
            initialValues={{ username: "", password: "" }}
            // validationSchema={SignupSchema}
            onSubmit={async (values, { setErrors }) => {
              // console.log('values',values)
              const response = await login({
                variables: {
                  password: values.password,
                  usernameOrEmail: values.username,
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.persons,
                    },
                  });
                  cache.evict({ fieldName: "posts:{}" });
                  // console.log('cache',cache)
                },
              });
              // console.log(router);

              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.persons) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/");
                  apollo.resetStore()
                }
              }
            }}
          >
            {({ errors }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <InputField
                    label="username"
                    name="username"
                    placeholder=" username or email"
                  />
                </div>
                <div className="mb-6">
                  <InputField label="password" name="password" />
                </div>
                <div className="flex items-center justify-between">
                  <button className={buttonClass} type="submit">
                    Sign In
                  </button>

                  <NextLink href="/forgotPsd">
                    <button
                      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      type="button"
                    >
                      Forgot Password?
                    </button>
                  </NextLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default createApollo()(login);
