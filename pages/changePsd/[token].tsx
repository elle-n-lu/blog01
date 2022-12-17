import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../../components/InputField";
import Navbar from "../../components/Navbar";
import { MeDocument, MeQuery, useChangePAsswordMutation } from "../../generated/graphql";
import { createApollo } from "../../utils/createApolloClient";
import { toErrorMap } from "../../utils/toErrorMap";


const ChangePassword: NextPage<{},{ token: string }> = (_,{ token }) => {
  const [ChangePassword] = useChangePAsswordMutation()
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  const buttonClass =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  console.log(router);
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen">
        <div className=" mx-auto mt-36">
          <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={async (value, { setErrors }) => {
              const response = await ChangePassword({
                variables: {
                  newPassword: value.newPassword,
                  token,
                  // token:typeof router.query.token==="string"? router.query.token : "",
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.changePAssword.persons,
                    },
                  });
                },
              });

              if (response.data?.changePAssword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePAssword.errors
                );
                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else {
                router.push("/");
              }
            }}
          >
            {() => (
              <Form>
                <InputField
                  label="new Password"
                  name="newPassword"
                />
                {tokenError ? <p className=" text-red-600">{tokenError}</p> : null}
                <button type="submit" className={`${buttonClass} mt-4`}>
                  Reset PAssword
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default createApollo()(ChangePassword);
