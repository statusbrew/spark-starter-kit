"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // Ensure your API URL is set correctly

    try {
      const response = await fetch(`${apiUrl}/admin/login/postLoginDetails`, { // Assuming `/auth/login` is your login endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, 
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials"); // Handle login error
      }

      const responseData = await response.json();
      const preHead = responseData["org"];
      console.log(responseData); 
      // router.push(`http://${org}.parkiteasy.tech`);
      router.push(`http://${preHead}.localhost:3001`);


    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        {errorMessage && (
          <p className="text-red-600 mb-4">{errorMessage}</p>
        )}

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
