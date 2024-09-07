"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData); // For now, just log the data
    // Simulate successful signup and redirect to login page
    router.push("/landingPage/login");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            required
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            required
            className="border p-2 rounded w-full"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

