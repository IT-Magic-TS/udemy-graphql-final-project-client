import { gql, useQuery } from '@apollo/client';
import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";


const GET_PROFILE = gql `
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      id
      bio
      isMyProfile
      user {
        id
        email
        name
        posts {
          id
          title
          createdAt
          content
          published
        }
      }
    }
  }
`

export default function Profile() {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id
    }
  })

  if (error) return <div><h1>ERROR</h1></div>

  if (loading) return <div>spinner............</div>

  console.log({id, data})

  const { profile } = data

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div> 
      </div>
      <div>
        {
          profile.user.posts.map(post => (
            <Post 
              key={post.id} 
              title={post.title} 
              content={post.content} 
              date={post.createdAt} 
              id={post.id} 
              user={profile.user.name} 
              published={post.published}
              isMyProfile={profile.isMyProfile}
            />
          ))
        }
      </div>
    </div>
  );
}
