import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useLogging from "../hooks/useLogging";
import type { User, Post } from "./Posts";

type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

type LoaderData = {
  post: Post;
  comments: Comment[];
};

function Comment({ message, comment }: { message: string; comment: Comment }) {
  useLogging(message, "Comment");
  return (
    <div className="flex flex-col items-center">
      <p style={{ color: "#c4b5fd" }}>{comment.email}</p>
      <p style={{ color: "#72757e" }}>{comment.name}</p>
      <p style={{ color: "#fffffe" }}>{comment.body}</p>
      <hr />
    </div>
  );
}

function Post({ message }: { message: string }) {
  useLogging(message, "Post");
  const { post, comments } = useLoaderData() as LoaderData;
  const [postUser, setPostUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const userRes = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post?.userId}`
      );
      const user = await userRes.json();
      setPostUser(user);
    })();
  }, [post]);

  return (
    <div className="wrapper">
      <h1>{post?.title}</h1>
      <section className="content-wrapper">
        <h4
          style={{
            marginLeft: "1rem",
            marginBottom: "0.75rem",
            alignSelf: "flex-start",
            fontWeight: "600",
            fontStyle: "italic",
            color: "#7f5af0",
          }}
        >
          {postUser?.name}:
        </h4>
        <section className="body-wrapper">
          <h3 className="post-body">{post?.body}</h3>
        </section>
        <section className="comments-wrapper">
          {comments?.map((comment) => (
            <Comment message="Hello from:" comment={comment} key={comment.id} />
          ))}
        </section>
      </section>
    </div>
  );
}

export default Post;
