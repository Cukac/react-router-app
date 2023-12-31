import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import useLogging from "../hooks/useLogging";

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};
type LoaderData = {
  posts: Post[];
  users: User[];
};

export type User = {
  id: number;
  email: string;
  username: string;
  address: object;
  company: object;
  phone: string;
  website: string;
  name: string;
};

function Post({
  message,
  post,
  user,
}: {
  message: string;
  post: Post;
  user: User;
}) {
  useLogging(message, "Post");
  return (
    <Link className="post-wrapper" to={`/post/${post.id}`}>
      <div className="post gloweffect">
        <h4
          style={{
            marginBottom: "0.75rem",
            alignSelf: "flex-start",
            fontWeight: "600",
            fontStyle: "italic",
            color: "#7f5af0",
          }}
        >
          {user.name}
        </h4>
        <h3
          style={{
            marginBottom: "0.75rem",
            alignSelf: "flex-start",
            fontWeight: "600",
            fontStyle: "italic",
            color: "white",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            wordWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#64748b",
          }}
        >
          {post.body}
        </p>
      </div>
    </Link>
  );
}

function Posts({ message }: { message: string }) {
  useLogging(message, "Posts");
  const { posts: initialPosts, users } = useLoaderData() as LoaderData;
  const [posts, setPosts] = useState(initialPosts);
  const [userId, setUserId] = useState<number>();
  const usersById = users.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<number, User>
  );

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  useEffect(() => {
    if (userId) {
      (async (userId: number) => {
        const filteredPostsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const filteredPosts = await filteredPostsRes.json();
        setPosts(filteredPosts);
      })(userId);
    } else {
      setPosts(initialPosts);
    }
  }, [userId, initialPosts]);

  return (
    <div className="wrapper">
      <h1 className="main-heading">POSTS</h1>
      <select className="select-input" onChange={handleUserChange}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <section className="posts-wrapper">
        {posts?.map((post) => (
          <Post
            key={post.id}
            message="Hello from:"
            post={post}
            user={usersById[post.userId]}
          />
        ))}
      </section>
    </div>
  );
}

export default Posts;
