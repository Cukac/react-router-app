import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

interface LoaderData {
  posts: { body: string; id: number; title: string; userId: number }[];
  users: User[];
}

interface User {
  id: number;
  email: string;
  username: string;
  address: object;
  company: object;
  phone: string;
  website: string;
}

function Posts() {
  const { posts: initialPosts, users } = useLoaderData() as LoaderData;
  const [posts, setPosts] = useState(initialPosts);

  console.log("initialPosts", initialPosts, "users", users);
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-class my-10 font-bold text-white">Vite + React</h1>
      <div className="flex flex-col items-center">
        {posts?.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div className="border-stroke m-5 flex flex-col items-center rounded border p-3">
              <p>{post.id}</p>
              <p>{post.title}</p>
              <h3>{post.body}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;
