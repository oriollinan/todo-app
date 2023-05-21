"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Data {
  msg?: string;
  token?: string;
}

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    try {
      const response: Response = await fetch("http://localhost:3000/login", options);
      const data: Data = await response.json();
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} ${data.msg}`);
      }
      setEmail("");
      setPassword("");
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-sm mx-auto pt-10">
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              className="form-input w-full text-gray-800"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-input w-full text-gray-800"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button
              type="submit"
              className="btn text-white bg-blue-600 hover:bg-blue-700 w-full rounded-md"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
      <div className="text-gray-600 text-center mt-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default page;
