import { useState } from "react";

export default function Login() {
  const [state, setState] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // login and register logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (state === 'login') {
      const response = await fetch('http://127.0.0.1:8000/verify-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": userName, "password": password })
      });
      const data = await response.json();
      if (!data.valid) {
        setError(true);
      } else {
        setError(false);
      }
    }
    else if (state === 'register') {
      const response = await fetch('http://127.0.0.1:8000/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": userName, "password": password })
      });
      const data = await response.json();
      if (!data.valid) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };


  return (
    <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white mt-16" onSubmit={handleSubmit}>
      <p className="text-2xl font-medium m-auto">
        <span className="">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>
      <div className="w-full ">
        <p>Username</p>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1"
          type="text"
          required
        />
      </div>
      <div className="w-full ">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1"
          type="password"
          required
        />
      </div>
      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-indigo-500 cursor-pointer"
          >
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-teal-500 cursor-pointer"
          >
            click here
          </span>
        </p>
      )}
      <button className="bg-black hover:bg-gray-700 transition-all text-white w-full py-2 rounded-md cursor-pointer">
        {state === "register" ? "Create Account" : "Login"}
      </button>

      {error && (
        <p className="text-red-500 text-sm m-auto">
          Invalid username or password!
        </p>
      )}
    </form>
  );
}
