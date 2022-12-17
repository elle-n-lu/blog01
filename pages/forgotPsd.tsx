import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";
import { createApollo } from "../utils/createApolloClient";
import { Form, Formik } from "formik";
import { useForgotPasswordMutation } from "../generated/graphql";
import InputField from "../components/InputField";

interface forgotPsdProps {}

const forgotPsd: React.FC<forgotPsdProps> = ({}) => {
  const inputClass =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const [forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen">
        <div className=" mx-auto mt-36">
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (value, { setErrors }) => {
              await forgotPassword({ variables: value });
              setComplete(true);
            }}
          >
            {() =>
              complete ? (
                <div>check your email</div>
              ) : (
                <Form>
                  <InputField label="email" name="email" />

                  <button className={`${buttonClass} mt-4`} type="submit">
                    Reset Password
                  </button>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </>
  );
};

export default createApollo()(forgotPsd);
