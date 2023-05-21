"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Data {
  msg?: string;
  token?: string;
}

const page = () => {
  const [fullName, setFullName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options: RequestInit = {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify({ email: email, name: fullName, firstname: firstName, password: password }),
    };
    try {
      const response: Response = await fetch("http://localhost:3000/register", options);
      const data: Data = await response.json();
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} ${data.msg}`);
      }
      setFullName("");
      setFirstName("");
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
            <label htmlFor="full-name" className="block text-gray-800 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              placeholder="Enter your email address"
              onChange={(e) => setFullName(e.target.value)}
              className="form-input w-full text-gray-800"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label htmlFor="first-name" className="block text-gray-800 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              placeholder="Enter your email address"
              onChange={(e) => setFirstName(e.target.value)}
              className="form-input w-full text-gray-800"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label htmlFor="email" className="block text-gray-800 text-sm font-medium mb-1">
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
            <label htmlFor="password" className="block text-gray-800 text-sm font-medium mb-1">
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
            <button type="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full rounded-md">Sign Up</button>
          </div>
        </div>
      </form>
      <div className="text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default page;
