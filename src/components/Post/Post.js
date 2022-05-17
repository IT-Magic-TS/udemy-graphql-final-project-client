import { gql, useMutation } from '@apollo/client';
import React from "react";
import "./Post.css";

const PUBLISH_POST = gql`
  mutation PublishedPost($postId: ID!) {
    postPublish(postId: $postId) {
      post {
        published
      }
      userErrors {
        message
      }
    }
  }
`
const UNPUBLISH_POST = gql`
  mutation UnPublishedPost($postId: ID!) {
    postUnPublish(postId: $postId) {
      post {
        published
      }
      userErrors {
        message
      }
    }
  }
`

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, {data, loading}] = useMutation(PUBLISH_POST)
  const [unPublishPost, {data: unPublishData, loading: unPublishLoading}] = useMutation(UNPUBLISH_POST)
  const formatedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p className="Post__publish" onClick={() => {
          publishPost({
            variables: {
              postId: id
            }
          })
        }}>
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p className="Post__publish" onClick={() => {
          unPublishPost({
            variables: {
              postId: id
            }
          })
        }}>
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
