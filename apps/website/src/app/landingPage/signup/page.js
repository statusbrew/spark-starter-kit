"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationUniqueDomainID: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [orgExistsError, setOrgExistsError] = useState(""); // New state for organization existence error

  const changeHandler = async (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Fetch organization data only when 'organizationUniqueDomainID' changes
    if (name === "organizationUniqueDomainID") {
      try {
        const response = await fetch(
          `http://localhost:8000/register/organizationExists?organizationUniqueDomainID=${value}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        // If organization exists, show error, otherwise clear the error
        if (responseData.exists) {
          setOrgExistsError("Organization ID already exists. Please choose a different one.");
        } else {
          setOrgExistsError(""); // Clear error if the organization doesn't exist
        }

      } catch (error) {
        console.error("Error:", error);
        setOrgExistsError("The organization already exists.");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // Ensure your API URL is set correctly

    try {
      const response = await fetch(`${apiUrl}/register/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organizationUniqueDomainID: formData.organizationUniqueDomainID, // Include organization ID in the request
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setSuccessMessage("Form submitted successfully");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        password: "",
        organizationUniqueDomainID: "",
      });

      // Redirect to login page
      router.push("/landingPage/login");

    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("There was an error submitting the form");
    }
  };

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

        <label className="block mb-2">
          Organization Unique Domain ID:
          <input
            type="text"
            name="organizationUniqueDomainID"
            value={formData.organizationUniqueDomainID}
            onChange={changeHandler} // Corrected to handle the correct field
            required
            className="border p-2 rounded w-full"
          />
        </label>

        {/* Display error message if the organization ID already exists */}
        {orgExistsError && (
          <p className="text-red-600 mb-4">{orgExistsError}</p>
        )}

        {!orgExistsError && <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800"
          disabled={!!orgExistsError} // Disable submit if organization exists
        >
          Sign Up
        </button>
}

        {successMessage && <p className="mt-4">{successMessage}</p>}
      </form>
    </div>
  );
}
