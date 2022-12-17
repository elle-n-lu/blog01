import { useRouter } from "next/router";
import {  useSinglePostQuery } from "../generated/graphql";


export const UsePostFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
// console.log('router',router)
  return useSinglePostQuery({ variables:{id: intId} });
};