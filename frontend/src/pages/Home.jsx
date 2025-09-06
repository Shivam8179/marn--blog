import { useState, useEffect } from "react";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/get-posts");
        const result = await res.json();
        console.log("API Response:", result);
        setPost(result?.data?.allPosts || []); // <-- updated key
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, []);

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="container mx-auto px-4 py-6">
        {post.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {post.map((postItem, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
              >
                {postItem?.postImage && (
                  <img
                    src={postItem.postImage}
                    alt={postItem.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h1 className="text-2xl font-semibold text-gray-800 text-justify">
                    {postItem.title}
                  </h1>
                  <p className="text-gray-600 text-xl text-justify">
                    {postItem.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-xl font-semibold text-gray-500">
              No post available
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
