"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import Cookies from "js-cookie";
import Link from "next/link";

function Page() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { login } = useAuthContext();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/v1/auth/login/${username}/${password}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return console.log("Error");
    }
    
    const tokens = await response.json();
    login(tokens.data);

    router.push("/admin");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="username">
            <p>Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
