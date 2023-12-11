"use client";
import { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    const data = await login(username, password);
    if (data.access_token) {
      const res = await getProfile(data.access_token);
      if (res.username) {
        Toastify({
          text: `User ${res.username} logged in successfully!`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "#fff",
          },
        }).showToast();

        localStorage.setItem('username', username);
        localStorage.setItem('userId', res.userId);

        router.push("/", { scroll: false });
      }
    }
  };

  async function login(username: string, password: string) {
    const res = await fetch(`http://localhost:3000/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({ username, password }),
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  async function getProfile(access_token: string) {
    const res = await fetch("http://localhost:3000/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  return (
    <div className="flex text-black min-h-max h-screen justify-center items-center">
      <div className="flex flex-col w-1/3 border rounded-md p-4 shadow-lg">
        <h2 className="self-center text-2xl font-bold mb-4 ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-2 items-center justify-between">
              <label className="whitespace-nowrap" htmlFor="username">
                Username:
              </label>
              <input
                className="rounded-md p-2 border border-slate-300 w-3/4"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-x-2 items-center justify-between">
              <label className="whitespace-nowrap" htmlFor="username">
                Password:
              </label>
              <input
                className="rounded-md p-2 border border-slate-300 w-3/4"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#48ac98] hover:bg-[#398979] transition ease-in-out duration-300 text-white rounded-lg w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
