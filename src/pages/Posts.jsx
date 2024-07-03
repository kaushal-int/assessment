import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const response = await fetch("https://codebuddy.review/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPosts(data?.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div className="rounded-lg bg-white p-7 shadow-lg" key={post.id}>
            <div>
              <h2 className="text-2xl font-bold">Post {index + 1}</h2>
              <div className="my-2 flex items-center gap-2">
                {" "}
                <img className="h-12 w-12 rounded-full object-cover" src={post.avatar} />
                <p className=" text-gray-500">
                  {post.firstName} {post.lastName}
                </p>
              </div>

              <p className="text-gray-700">{post.writeup}</p>
            </div>
            <div>
              <img className="w-auto rounded-lg  p-1 shadow-lg" src={post.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
