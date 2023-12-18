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
  const [userId, setUserId] = useState<number>();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("event.target.value", event.target.value);
  };

  console.log("initialPosts", initialPosts, "users", users, "user", userId);
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-class text-highlight my-10 font-bold">POSTS</h1>
      <select
        className="block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={handleUserChange}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <div className="flex flex-col items-center">
        {posts?.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div className="bg-secondary gloweffect m-5 flex flex-col items-center rounded-xl p-3">
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
