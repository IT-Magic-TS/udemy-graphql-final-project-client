import { gql, useQuery } from '@apollo/client';
import React from "react";
import Post from "../../components/Post/Post";

const GET_POSTS = gql `
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`

export default function Posts() {

  const { data, error, loading } = useQuery(GET_POSTS)

  console.log({data, error, loading})

  if (error) return <div><h1>ERROR</h1></div>

  if (loading) return <div>spinner............</div>

  const { posts } = data

  return (
    <div>
      {
        posts.map(post => (
          <Post key={post.id} title={post.title} content={post.content} date={post.createdAt} id={post.id} user={post.user.name} />
        ))
      }
    </div>
  )
}
