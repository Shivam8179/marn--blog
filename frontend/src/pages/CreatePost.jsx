import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleForm = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      let data = new FormData(); // Create a FormData object to hold form data
      data.append("title", title);
      data.append("content", content);
      data.append("postImage", postImage);

      // Password length validation
      if (!title || !content) {
        alert("title or content required");
        return;
      }

      // Send a POST request to the registration endpoint
      const res = await fetch("/api/post/create-post", {
        method: "POST",
        body: data,
      });

      // Check response status
      if (!res.ok) {
        console.log("Error while getting response");
        return;
      }

      // Parse JSON response
      const result = await res.json();
      alert("blog created Successfully!");
      navigate("/")
    } catch (error) {
      console.log(error);
      alert("blog creation Failed !!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <form
        className="bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 rounded-2xl text-sm sm:text-base md:text-lg lg:text-3xl w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
        onSubmit={handleForm}
      >
        <h2 className="font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
         Create a blog  
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <input
          type="text"
          name="content"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <input
          type="file"
          name="postImage"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
          className="w-full border rounded p-2 sm:p-3 md:p-4 text-sm sm:text-base lg:text-xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-1 sm:py-2 md:py-3 rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
        >
         Create 
        </button>

    
      </form>
    </div>
  );
}

export default CreatePost;
                                     