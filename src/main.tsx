import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./routes/Posts.tsx";
import Post from "./routes/Post.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts`),
        fetch(`https://jsonplaceholder.typicode.com/users`),
      ]);
      const [posts, users] = await Promise.all([
        postsResponse.json(),
        usersResponse.json(),
      ]);
      return { posts, users };
    },
    element: <Posts />,
  },
  {
    path: "/post/:id",
    loader: async ({ params }) => {
      const [postResponse, commentsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
        fetch(
          `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`,
        ),
      ]);
      const [post, comments] = await Promise.all([
        postResponse.json(),
        commentsResponse.json(),
      ]);
      return { post, comments };
    },
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
