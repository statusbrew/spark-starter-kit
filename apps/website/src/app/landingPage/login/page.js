"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

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
    // Simulate login success and redirect to /dashboard
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
}
