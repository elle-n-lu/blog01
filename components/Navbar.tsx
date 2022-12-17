import { useApolloClient } from "@apollo/client";
import NextLink from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import Modals from "./Modal";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [showModal, setShowModal] = React.useState(false);
  const apollo = useApolloClient();
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const buttonClass =
    "bg-pink-500 text-white active:bg-pink-600 uppercase p-1 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150";

  let body = null;
  if (loading) {
    return null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <button className="mr-2">Login</button>
        </NextLink>
        <NextLink href="/register">
          <button> Register</button>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/myPosts">
          <button className={`mr-2 ${buttonClass}`} type="button">
            my posts
          </button>
        </NextLink>
        hi
        <NextLink href="/userProfile">
          <p className=" text-red-900 ml-2"> {data?.me.username}</p>
        </NextLink>
        <NextLink href="/">
          <button
            className=" ml-2"
            onClick={async () => {
              logout();
              await apollo.resetStore();
            }}
          >
            logout
          </button>
        </NextLink>
      </>
    );
  }

  // console.log('showmodal',showModal)
  const changeModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  // const showModal = false
  return (
    <div className="flex justify-between p-4 sticky top-0 z-50 bg-gray-400">
      <Modals showModal={showModal} changeModal={changeModal} />
      <div className="flex justify-start ml-4">
        <NextLink href="/">
          <button type="button">
            <AiFillHome />
          </button>
        </NextLink>

        <button
          className=" ml-4 bg-pink-500 text-white active:bg-pink-600 uppercase p-1 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={changeModal}
          // setShowModal(true)
        >
          Create Post
        </button>
      </div>

      <div className="flex relative mr-4">{body}</div>
    </div>
  );
};

export default Navbar;
