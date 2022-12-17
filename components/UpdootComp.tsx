import { ApolloCache, gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import {
  HelloQuery,
  useMeQuery,
  useVoteMutation,
  VoteMutation
} from "../generated/graphql";

interface UpdootCompProps {
  post: HelloQuery["hello"]["posts"][0];
}

const updateVoteCache = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "posts:" + postId,
    fragment: gql`
      fragment _ on Posts {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints = data.points + (data.voteStatus as number) * value;
    cache.writeFragment({
      id: "posts:" + postId,
      fragment: gql`
        fragment _ on Posts {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootComp: React.FC<UpdootCompProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  const apollo = useApolloClient();
  const { data, loading } = useMeQuery();
  const router = useRouter();
  
  if (!post) {
    return null;
  }
  return (
    <div className=" flex flex-col  items-center text-xl">
      <button
        className={
          post.voteStatus === 1
            ? `bg-green-600 p-1 rounded-md text-white`
            : `p-1`
        }
        onClick={() => {
          if (!loading && !data?.me) {
            {
              router.replace("/login?next=" + router.pathname);
              apollo.resetStore();
            }
          }else{
            
            if (post.voteStatus === 1) {
              return;
            }
            vote({
              variables: { postId: post.id, value: 1 },
              update: (cache) => updateVoteCache(1, post.id, cache),
            });
            apollo.resetStore();
          }
        }}
      >
        <BsChevronUp />
      </button>
      <p>{post?.points}</p>
      <button
        className={
          post.voteStatus === -1
            ? `bg-red-600 p-1 rounded-md text-white`
            : `p-1`
        }
        onClick={() => {
          if (!loading && !data?.me) {
            {
              router.replace("/login?next=" + router.pathname);
              apollo.resetStore();
            }
          }else{

            if (post?.voteStatus === -1) {
              return;
            }
            vote({
              variables: { postId: post?.id as number, value: -1 },
              update: (cache) => updateVoteCache(-1, post.id, cache),
            });
            apollo.resetStore();
          }
        }}
      >
        <BsChevronDown />
      </button>
    </div>
  );
};
