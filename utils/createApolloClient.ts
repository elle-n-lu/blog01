// import { withApollo as createWithApollo } from "next-apollo";
import withApollo from "./withApollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { AllPosts } from "../generated/graphql";
import { createUploadLink } from "apollo-upload-client";
// import { PaginatdPosts } from "../generated/graphql";


const createClient = (ctx : NextPageContext | undefined) =>
  new ApolloClient({

    link:createHttpLink({

      credentials: "include",
      headers: {
        cookie:
          typeof window === "undefined" ? ctx?.req?.headers.cookie : undefined ,
      },
      uri: process.env.NEXT_PUBLIC_API_URL,
    }),
    
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
                    merge(existing: AllPosts , incoming: AllPosts): AllPosts{
                        console.log("existing, incoming-------",existing, incoming)
                        return {__typename:"allPosts", posts: [...existing.posts, ...incoming.posts]}
            },
          },
        },
      },
    }}),
  })
  
  export const createApollo = withApollo(createClient);
