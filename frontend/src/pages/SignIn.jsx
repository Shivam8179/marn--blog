import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { signInFailure, signInSuccess} from "../features/userSlice.js"

function SignIn() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (!userName || !email) {
        dispatch(signInFailure("All details are required"));
        return;
      }

      if (password.length < 6) {
        dispatch(signInFailure("Password must be at least 6 characters long."));
        return;
      }

      const data = { userName, email, password };
      console.log("data ", data);

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        dispatch(signInFailure("Error while getting response"));
        return;
      }

      const result = await response.json();
      dispatch(signInSuccess(result?.data?.loggedInUser))


      alert("User login Successfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("User sign-in Failed !!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <form
        className="bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 rounded-2xl text-sm sm:text-base md:text-lg lg:text-3xl w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
        onSubmit={handleForm}
      >
        <h2 className="font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
          SignIn
        </h2>

        <input
          type="text"
          name="userName"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 sm:py-2 md:py-3 rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          SignIn
        </button>
      </form>
    </div>
  );
}

export default SignIn;
