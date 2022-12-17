import React from "react";
import { Form, Formik } from "formik";
import { useField, Field, ErrorMessage } from "formik";

import { createApollo } from "../utils/createApolloClient";
import InputField from "../components/InputField";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { MeDocument, MeQuery, useMeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import { useApolloClient } from "@apollo/client";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  password: Yup.string().required("Required"),
});

const register: React.FC = ({}) => {
  const inputClass =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

    const [register] = useRegisterMutation()
  const {data} = useMeQuery()
  const apollo = useApolloClient();
  // console.log('sdsds',data?.me?.username)
  return (
    <>
    <Navbar />
    <div className="flex h-screen">
      
    <div className=" mx-auto mt-36">
      <Formik
        initialValues={{ username: "",email:"", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values,{setErrors}) => {
            const response = await register({
              variables: { options:{email:values.email,username:values.username},password: values.password },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.persons,
                  },                  
                });
                // console.log('cache',cache)
                // cache.evict({ fieldName: "persons:{}" });
              }                         
            })
            // console.log(response);
        
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.persons) {
              router.push("/");
      
              // console.log("sasas",data?.me?.username)
            }
            
          }}
        
        >
        {()=>(<Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <InputField label="username" name="username"/>
            
          </div>
          <div className="mb-4">
            <InputField label="email" name="email"/>
            
          </div>
          <div className="mb-6">
            <InputField label="password" name="password" />
          </div>
          <div className="flex items-center justify-between">
            <button className={buttonClass} type="submit">
              Create Account
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Need help?
            </a>
          </div>
        </Form>)}
        
      </Formik>
    </div></div>
    </>);
};

export default createApollo()(register);
