import React from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
interface AvatarProps {}

const Avatar: React.FC<AvatarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  if (loading) {
    return <div>...</div>;
  }
  if (data?.me?.avatarUrl?.includes("undefined") || !data?.me?.avatarUrl?.includes('.jpg') ) {
    return (
      <Image
        src="/Cat03.jpg"
        className=" rounded-full mx-auto"
        alt="me"
        width='256'
        height="256"
      />
    );
  } else {
    return (
      <img
        className=" rounded-full"
        alt="me"
        style={{ width: "256px", height: "256px" }}
        src={data?.me?.avatarUrl as string}
      />
    );
  }
};

export default Avatar;
