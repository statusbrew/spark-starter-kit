"use client";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { PiStarFourThin } from "react-icons/pi";
import { useRouter } from "next/navigation"; // Next.js useRouter hook
import { useState } from "react";

import dotenv from "dotenv";
dotenv.config();

const team = [
  { name: "Simarpreet Singh", dp: "/simar.svg" },
  { name: "Vaibhav Chopra", dp: "/vaibhav.svg" },
  { name: "Tanveer Kaur", dp: "/tanveer.svg" },
  { name: "Paras Chawla", dp: "/paras.svg" },
  { name: "Bavneet Kaur", dp: "/bavneet.svg" },
];

export default function LandingPage() {
  const router = useRouter(); // Next.js router hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    complexName: "",
    city: "",
    address: "",
    frontEndClient: "parking",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const port = process.env.BACKEND_PORT; // Ensure your API URL is set in environment variables
    
  
    try {
      const response = await fetch(`http://localhost:8000/website/contactUs`, { // Adjust this path to your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use the formData state which holds the form input values
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      setSuccessMessage('Form submitted successfully');
  
      // Reset form data if needed
      setFormData({
        name: '',
        email: '',
        mobile: '',
        complexName: '',
        city: "",
        address: '',
        frontEndClient: 'parking',
      });
      
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('There was an error submitting the form');
    }
  };

  return (
    <>
      <div className="w-full text-center flex flex-col justify-center items-center bg-[url('/homeBg.png')] bg-cover relative">

        {/* nav */}
        <div className="flex flex-wrap justify-between items-center px-6 md:gap-24 md:w-11/12 my-8 bg-white rounded-2xl">
          <div className="px-9 flex h-full items-center">
            <img src="/parkLogo.svg" alt="logo" className="w-full" />
          </div>
          <div className="flex sm:gap-5 md:gap-8 md:pl-8 h-full w-auto py-auto items-center justify-center">
            <a href="/" className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer">HOME</a>
            <a href="#about" className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer">ABOUT US</a>
            <a href="#solution" className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer">SOLUTION</a>
            <a href="#contact" className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer">CONTACT US</a>
          </div>
          <div className="sm:pl-8 font-semibold flex self-center md:gap-3 sm:gap-2">
            <button
              onClick={() => router.push("/landingPage/login")} // Navigate to Login Page
              className="font-semibold bg-white text-black border border-black rounded-lg p-2 w-20 hover:bg-black duration-500 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/landingPage/signup")} // Navigate to Signup Page
              className="font-semibold bg-black text-white rounded-lg p-2 w-20 hover:bg-gray-800 hover:border hover:border-black"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="flex flex-col w-11/12">
          <div className="text-4xl font-semibold">
            Effortless Parking, Every Time.
          </div>
          <div className="pt-9 pl-10 px-8 self-center w-[57%]">
            Park-It-Easy streamlines and optimize the entire parking process - automating parking to save you
            time and eliminate hassle in malls and complexNamees.
          </div>
        </div>
        <div className="pt-8 flex justify-center items-center">
          <button className="bg-black flex justify-center items-center gap-2 text-white rounded-lg p-2 px-4  mr-5" ><PiStarFourThin /> Get Started</button>
          {/* <button className=" text-black border border-gray-600 font-semibold rounded-lg p-2 px-4">Free Demo Tutorial </button> */}
        </div>
        <img src="/image.png" alt="image" className="w-[400px] h-[600px] ml-16" />

        {/* team */}
        <h1 id="about" className="font-semibold text-3xl my-4" >Our Team</h1>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 w-8/12 my-10 mb-[15rem]">
          {
            team.map((item, index) => (
              <div key={index} className="flex w-[100px] flex-col justify-center items-center text-center">
                <img src={item.dp} alt="image" className="w-[100px] bg-black" />
                <p className="text-lg text-black">{item.name}</p>
              </div>
            ))
          }
        </div>

        <img src="./check.svg" alt="verifications" className="w-full absolute -bottom-4 right-0" />
      </div>

      <section id="solution" className="w-full flex flex-col lg:flex-row justify-between relative items-center">
        <div className="w-[85%] bg-white md:w-[40%] ml-[4rem] md:ml-0 h-[600px] lg:h-[900px] mt-7 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl flex justify-center items-center relative overflow-hidden">
          <img src="/image.png" alt="mobile" loading="lazy" className="absolute inset-0 w-[100%] h-[100%]" />
        </div>

        <div className="w-full md:w-[60%] flex flex-col justify-center items-center gap-[2rem] p-6">
          <h1 className="text-4xl md:text-7xl font-markazi">Why Choose Us Over Traditional Parking</h1>
          <ul className="text-base md:text-xl list-disc flex flex-col justify-start items-center gap-4 ml-4">
            <li >No more endless circling for a parking spot. Our system <span className="bg-[#d9f812a5]">automatically assigns</span> you a parking space upon your arrival.</li>
            <li>Get instant guidance to your assigned parking spot with <span className="bg-[#d9f812a5]">real-time navigation,</span> eliminating confusion and saving time.</li>
            <li>Enjoy a hassle-free parking experience with <span className="bg-[#d9f812a5]">upfront payment</span> options, ensuring a smooth entry and exit process.</li>
            <li>If assigned spot is occupied, don't worry. Our system will immediately <span className="bg-[#d9f812a5]">reassign</span> you the nearest available spot.</li>
            <li>Gain <span className="bg-[#d9f812a5]">valuable analytics</span> on parking usage and patterns, allowing for informed decision-making and optimized space management.</li>
          </ul>
        </div>
        <img src="/bannar.svg" alt="bannar" loading="lazy" className="absolute w-[100vw] z-10 -bottom-[2rem] lg:-bottom-[5rem] left-0" />
      </section>

      <section id="contact" className="w-full bg-black p-[1rem] text-center gap-6 md:p-[3rem] overflow-hidden relative flex flex-col justify-center items-center">
        <div className="w-[400px] h-[400px] absolute -top-[7rem] -left-[7rem] blur-3xl bg-[#7329a8a5]"></div>
        <h1 className="text-3xl text-white font-semibold mt-10">Contact Us</h1>
        <p className="text-sm text-white mb-8 md:mb-[4rem]">Got a question, Want to learn more about us? Get in touch.</p>

        <div className="w-full md:w-11/12 lg:w-8/12 flex flex-col lg:flex-row">
          {/* <div className="w-full bg-white md:w-[45%] h-full min-h-[500px] rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl flex justify-center items-center relative overflow-hidden"> */}
            <img src="/parking.svg" alt="Laptop" loading="lazy" className="w-full lg:w-[50%] rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl" />
          {/* </div> */}

          <form onSubmit={submitHandler} className="w-full bg-white max-w-4xl rounded-bl-xl rounded-br-xl md:rounded-bl-none md:rounded-tr-xl mx-auto p-1">
            <div className="flex flex-wrap gap-6 p-2 lg:gap-8 mb-4 lg:p-[2rem] justify-between item-start">

              {/* Email and mobile Number Fields */}
              <div className="flex flex-wrap justify-between gap-4 w-full">

                {/* Full Name Field */}
                <label className="w-full sm:w-[45%]">
                  <p className="my-2 text-start">Full Name <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="text"
                    name="name"
                    // placeholder="Enter your full name"
                    onChange={changeHandler}
                    value={formData.name}
                  />
                </label>


                <label className="w-full sm:w-[45%]">
                  <p className="my-2 text-start">Mobile Number <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="text"
                    name="mobile"
                    // placeholder="Enter mobile number"
                    onChange={changeHandler}
                    value={formData.mobile}
                  />
                </label>

                <label className="w-full sm:w-[45%]">
                  <p className="my-2 text-start">Email Id <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="email"
                    name="email"
                    // placeholder="Enter email id"
                    onChange={changeHandler}
                    value={formData.email}
                  />
                </label>

                <label className="w-full sm:w-[45%]">
                  <p className="my-2 text-start">complexName Name <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="text"
                    name="complexName"
                    // placeholder="Enter complexName name"
                    onChange={changeHandler}
                    value={formData.complexNameName}
                  />
                </label>

                <label className="w-full">
                  <p className="my-2 text-start">City <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="text"
                    name="city"
                    // placeholder="Enter your full address"
                    onChange={changeHandler}
                    value={formData.city}
                  />
                </label>

                <label className="w-full">
                  <p className="my-2 text-start">Address <sup className='text-red-400'>*</sup></p>
                  <input
                    required
                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                    type="text"
                    name="address"
                    // placeholder="Enter your full address"
                    onChange={changeHandler}
                    value={formData.address}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer"
              >
                Register Now
              </button>
            </div>


          </form>
        </div>

      </section>

      <footer className="w-full flex flex-col bg-black text-white py-[2rem] px-[4rem]">
        <img src="parkLogoFooter.svg" alt="logo" />
        <div className="flex justify-between items-start border-b-[1px] pb-12 pt-3 border-gray-400">
          <div className="flex flex-col text-lg justify-start items-start w-[15%] gap-2">
            <h1 className="text-3xl w-full mb-2 py-2 border-b-2 border-white">Product</h1>
            <h2>Scan</h2>
            <h2>Pay</h2>
            <h2>Park</h2>
          </div>
          <div className="flex flex-col text-lg justify-start items-start w-[15%] gap-2">
            <h1 className="text-3xl w-full mb-2 py-2 border-b-2 border-white">Solution</h1>
            <h2>For Shopping Mails</h2>
            <h2>For Parking complexName</h2>
          </div>
          <div className="flex flex-col text-lg justify-start items-start w-[15%] gap-2">
            <h1 className="text-3xl w-full mb-2 py-2 border-b-2 border-white">Support</h1>
            <h2>Contact Us</h2>
            <h2>Privacy & Security</h2>
          </div>
          <div className="w-[30%] flex flex-col gap-4 px-[2rem]">
            <h1 className="text-5xl font-semibold">Ready to get started?</h1>
            <button className="w-fit border rounded-lg text-2xl p-3">Let's Connect</button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center text-gray-400 items-center gap-5">
            <h1 className="hover:text-white">Terms Of Services</h1>
            <h1 className="hover:text-white">Privacy Policy</h1>
          </div>
          <div className="flex justify-center text-lg items-center gap-2 p-4">
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </footer>
    </>
  );
}




