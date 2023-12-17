import { useLoaderData } from "react-router-dom";

type LoaderData = {
  post: { body: string; id: number; title: string; userId: number };
  comments: {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
  }[];
};

function Post() {
  const { post, comments } = useLoaderData() as LoaderData;

  console.log("post", post, "comments", comments);
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-class my-10 font-bold text-white">Post </h1>
      <div className="flex flex-col items-center">
        <p>{post?.title}</p>
        <h3>{post?.body}</h3>
        {comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col items-center">
            <p>{comment.id}</p>
            <p>{comment.name}</p>
            <h3>{comment.body}</h3>
          </div>
        ))}
        <p>
          Edit <code>src/Posts.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Post;
