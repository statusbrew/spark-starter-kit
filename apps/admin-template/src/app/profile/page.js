// "use client";
// import { useState } from 'react';
// import Link from 'next/link';

// export default function Profile() {
//     const [mallFormData, setMallFormData] = useState({
//         complexName: '',
//         email: '',
//         mallLocation: '',
//         contactSupport: '',
//     });

//     const [parkingFormData, setParkingFormData] = useState({
//         noOfPillars: '',
//         rangeOfPillars: '',
//         minCarsPerPillar: '',
//         entryGates: '',
//         exitGates: '',
//         friendlyParking: {
//             disabilityEase: false,
//             pillarNumberDisability: '',
//             elderlyCare: false,
//             pillarNumberElderly: ''
//         }
//     });

//     const [paymentFormData, setPaymentFormData] = useState({
//         carPrice: '',
//         bikesFee: ''
//     });

//     const [successMessage, setSuccessMessage] = useState({
//         mall: '',
//         parking: '',
//         payment: ''
//     });

//     const [errorMessage, setErrorMessage] = useState("");

//     const changeHandler = (e) => {
//         const { name, value, type, checked } = e.target;

//         if (type === 'checkbox') {
//             const [section, key] = name.split('.');
//             setParkingFormData(prevState => ({
//                 ...prevState,
//                 friendlyParking: {
//                     ...prevState.friendlyParking,
//                     [key]: checked
//                 }
//             }));
//         } else {
//             if (mallFormData.hasOwnProperty(name)) {
//                 setMallFormData(prevState => ({
//                     ...prevState,
//                     [name]: value
//                 }));
//             } else if (parkingFormData.hasOwnProperty(name) || name.includes('friendlyParking')) {
//                 const [section, subKey] = name.split('.');
//                 if (section === 'friendlyParking') {
//                     setParkingFormData(prevState => ({
//                         ...prevState,
//                         friendlyParking: {
//                             ...prevState.friendlyParking,
//                             [subKey]: value
//                         }
//                     }));
//                 } else {
//                     setParkingFormData(prevState => ({
//                         ...prevState,
//                         [name]: value
//                     }));
//                 }
//             } else {
//                 setPaymentFormData(prevState => ({
//                     ...prevState,
//                     [name]: value
//                 }));
//             }
//         }
//     };

//     // Submit Parking Fee Form
//     const submitParkingFee = async (e) => {
//         e.preventDefault();
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//         const authToken = "Bearer yourTokenHere"; // Replace with actual token

//         try {
//             const response = await fetch(`${apiUrl}/admin/register/parkingFee`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: authToken,
//                 },
//                 body: JSON.stringify(paymentFormData),
//             });

//             if (!response.ok) throw new Error("Error submitting parking fee");

//             setSuccessMessage((prev) => ({
//                 ...prev,
//                 payment: 'Parking fee submitted successfully!'
//             }));
//             setErrorMessage("");
//         } catch (error) {
//             console.error("Error:", error);
//             setErrorMessage("Error submitting parking fee");
//         }
//     };

//     // Submit Parking Layout Form
//     const submitParkingLayout = async (e) => {
//         e.preventDefault();
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//         const authToken = "Bearer yourTokenHere";

//         try {
//             const response = await fetch(`${apiUrl}/admin/register/parkingLayout`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: authToken,
//                 },
//                 body: JSON.stringify(parkingFormData),
//             });

//             if (!response.ok) throw new Error("Error submitting parking layout");

//             setSuccessMessage((prev) => ({
//                 ...prev,
//                 parking: 'Parking layout submitted successfully!'
//             }));
//             setErrorMessage("");
//         } catch (error) {
//             console.error("Error:", error);
//             setErrorMessage("Error submitting parking layout");
//         }
//     };

//     // Submit Mall Details Form
//     const submitMallDetails = async (e) => {
//         e.preventDefault();
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//         const authToken = "Bearer yourTokenHere";

//         try {
//             const response = await fetch(`${apiUrl}/admin/register/mallDetails`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: authToken,
//                 },
//                 body: JSON.stringify(mallFormData),
//             });

//             if (!response.ok) throw new Error("Error submitting mall details");

//             setSuccessMessage((prev) => ({
//                 ...prev,
//                 mall: 'Mall details submitted successfully!'
//             }));
//             setErrorMessage("");
//         } catch (error) {
//             console.error("Error:", error);
//             setErrorMessage("Error submitting mall details");
//         }
//     };

//     return (
//         <section className="w-full p-[1rem] bg-gray-200 text-center gap-6 md:p-[3rem] overflow-hidden relative flex flex-col justify-center items-center">
//             <div className="w-[400px] h-[400px] absolute -top-[7rem] -left-[7rem] blur-3xl z-10 bg-[#7329a863]"></div>
//             <div className="w-[400px] h-[400px] absolute top-[50%] -right-[7rem] blur-3xl bg-[#7329a863]"></div>

//             {/* Mall Details Form */}
//             <div className="w-full md:w-11/12 flex flex-col md:flex-row">
//                 <div className="mb-2 w-[60%] text-left mt-10">
//                     <h2 className="text-xl font-semibold">Mall Details</h2>
//                     <p className="text-sm text-gray-600">Please provide basic mall data</p>
//                 </div>

//                 <form onSubmit={submitMallDetails} className="w-[40%] bg-white z-10 max-w-4xl rounded-xl mx-auto">
//                     <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
//                         {['complexName', 'email', 'mallLocation', 'contactSupport'].map((field) => (
//                             <label key={field} className="w-full">
//                                 <p className="my-2 text-start">
//                                     {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//                                     <sup className='text-red-400'>*</sup>
//                                 </p>
//                                 <input
//                                     required
//                                     className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
//                                     type={field === 'email' ? 'email' : field === 'contactSupport' ? 'tel' : 'text'}
//                                     name={field}
//                                     onChange={changeHandler}
//                                     value={mallFormData[field]}
//                                 />
//                             </label>
//                         ))}

//                         <button type="submit" className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer">
//                             Save Mall Details
//                         </button>
//                     </div>
//                     {successMessage.mall && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.mall}</div>}
//                 </form>
//             </div>

//             {/* Parking Layout Form */}
//             <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
//                 <div className="mb-2 w-[60%] text-left mt-10">
//                     <h2 className="text-xl font-semibold">Parking Layout</h2>
//                     <p className="text-sm text-gray-600">Please provide parking layout details</p>
//                 </div>

//                 <form onSubmit={submitParkingLayout} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
//                     <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
//                         {['noOfPillars', 'rangeOfPillars', 'minCarsPerPillar', 'entryGates', 'exitGates'].map((field) => (
//                             <label key={field} className="w-full">
//                                 <p className="my-2 text-start">{field.replace(/([A-Z])/g, ' $1').replace('No Of', 'Number of')}</p>
//                                 <input
//                                     className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
//                                     type={field === 'noOfPillars' || field.includes('Gates') ? 'number' : 'text'}
//                                     name={field}
//                                     onChange={changeHandler}
//                                     value={parkingFormData[field]}
//                                 />
//                             </label>
//                         ))}
//                         <Link href='/grid'>
//                             <button className='bg-black rounded-lg p-2 px-4 text-white' onClick={() => {
//                                 localStorage.setItem("parkingFormData", JSON.stringify(parkingFormData))
//                             }}>
//                                 Set Layout
//                             </button>
//                         </Link>

//                         {/* Friendly Parking Zones */}
//                         {/* {['disabilityEase', 'elderlyCare'].map((zone) => (
//                             <div key={zone} className="w-full mt-4">
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id={zone}
//                                         name={`friendlyParking.${zone}`}
//                                         checked={parkingFormData.friendlyParking[zone]}
//                                         onChange={changeHandler}
//                                         className="mr-2"
//                                     />
//                                     <label htmlFor={zone}>Friendly Parking Zone ({zone.replace(/([A-Z])/g, ' $1')})</label>
//                                 </div>
//                                 {parkingFormData.friendlyParking[zone] && (
//                                     <label className="w-full mt-2">
//                                         <p className="my-2 text-start">Pillar Number for {zone.replace(/([A-Z])/g, ' $1')}</p>
//                                         <input
//                                             className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
//                                             type="text"
//                                             name={`friendlyParking.pillarNumber${zone.charAt(0).toUpperCase() + zone.slice(1)}`}
//                                             onChange={changeHandler}
//                                             value={parkingFormData.friendlyParking[`pillarNumber${zone.charAt(0).toUpperCase() + zone.slice(1)}`]}
//                                         />
//                                     </label>
//                                 )}
//                             </div>
//                         ))} */}

//                         {/* <button type="submit" className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer">
//                             Save Parking Layout
//                         </button> */}
//                     </div>
//                     {successMessage.parking && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.parking}</div>}
//                 </form>
//             </div>

//             {/* Vehicle Payment Data */}
//             <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
//                 <div className="mb-2 w-[60%] text-left mt-10">
//                     <h2 className="text-xl font-semibold">Vehicle Payment Data</h2>
//                     <p className="text-sm text-gray-600">Please provide fee structure per vehicle</p>
//                 </div>

//                 <form onSubmit={submitParkingFee} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
//                     <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
//                         {['carPrice', 'bikesFee'].map((field) => (
//                             <label key={field} className="w-full">
//                                 <p className="my-2 text-start">{field.replace(/([A-Z])/g, ' $1').replace('Fee', ' Fee')}</p>
//                                 <input
//                                     className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
//                                     type="number"
//                                     name={field}
//                                     onChange={changeHandler}
//                                     value={paymentFormData[field]}
//                                 />
//                             </label>
//                         ))}

//                         <button type="submit" className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer">
//                             Save Payment Data
//                         </button>
//                     </div>
//                     {successMessage.payment && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.payment}</div>}
//                 </form>
//             </div>
//         </section>
//     );
// }


"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [mallFormData, setMallFormData] = useState({
    complexName: '',
    email: '',
    mallLocation: '',
    contactSupport: '',
  });

  const [parkingFormData, setParkingFormData] = useState({
    noOfPillars: '',
    rangeOfPillars: '',
    minCarsPerPillar: '',
    entryGates: '',
    exitGates: '',
    friendlyParking: {
      disabilityEase: false,
      pillarNumberDisability: '',
      elderlyCare: false,
      pillarNumberElderly: '',
    },
  });

  const [paymentFormData, setPaymentFormData] = useState({
    carPrice: '',
    bikesFee: '',
  });

  const [gridData, setGridData] = useState([]);
  const [successMessage, setSuccessMessage] = useState({
    mall: '',
    parking: '',
    payment: '',
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Get grid data from localStorage if available
  useEffect(() => {
    const savedGridData = localStorage.getItem("gridData");
    if (savedGridData) {
      setGridData(JSON.parse(savedGridData));
      localStorage.removeItem("gridData");
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const [section, key] = name.split('.');
      setParkingFormData((prevState) => ({
        ...prevState,
        friendlyParking: {
          ...prevState.friendlyParking,
          [key]: checked,
        },
      }));
    } else {
      if (mallFormData.hasOwnProperty(name)) {
        setMallFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (parkingFormData.hasOwnProperty(name) || name.includes('friendlyParking')) {
        const [section, subKey] = name.split('.');
        if (section === 'friendlyParking') {
          setParkingFormData((prevState) => ({
            ...prevState,
            friendlyParking: {
              ...prevState.friendlyParking,
              [subKey]: value,
            },
          }));
        } else {
          setParkingFormData((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      } else {
        setPaymentFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  // Submit Parking Fee Form
  const submitParkingFee = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const authToken = "Bearer yourTokenHere"; // Replace with actual token

    try {
      const response = await fetch(`${apiUrl}/admin/register/parkingFee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(paymentFormData),
      });

      if (!response.ok) throw new Error("Error submitting parking fee");

      setSuccessMessage((prev) => ({
        ...prev,
        payment: 'Parking fee submitted successfully!',
      }));
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting parking fee");
    }
  };

  // Submit Parking Layout Form
  const submitParkingLayout = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const authToken = "Bearer yourTokenHere"; // Replace with actual token

    try {
      const response = await fetch(`${apiUrl}/admin/register/parkingLayout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          ...parkingFormData,
          gridData, // Include grid data from localStorage in the request
        }),
      });

      if (!response.ok) throw new Error("Error submitting parking layout");

      setSuccessMessage((prev) => ({
        ...prev,
        parking: 'Parking layout submitted successfully!',
      }));
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting parking layout");
    }
  };

  // Submit Mall Details Form
  const submitMallDetails = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const authToken = "Bearer yourTokenHere"; // Replace with actual token

    try {
      const response = await fetch(`${apiUrl}/admin/register/mallDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(mallFormData),
      });

      if (!response.ok) throw new Error("Error submitting mall details");

      setSuccessMessage((prev) => ({
        ...prev,
        mall: 'Mall details submitted successfully!',
      }));
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error submitting mall details");
    }
  };

  return (
    <section className="w-full p-[1rem] bg-gray-200 text-center gap-6 md:p-[3rem] overflow-hidden relative flex flex-col justify-center items-center">
      <div className="w-[400px] h-[400px] absolute -top-[7rem] -left-[7rem] blur-3xl z-10 bg-[#7329a863]"></div>
      <div className="w-[400px] h-[400px] absolute top-[50%] -right-[7rem] blur-3xl bg-[#7329a863]"></div>

      {/* Mall Details Form */}
      <div className="w-full md:w-11/12 flex flex-col md:flex-row">
        <div className="mb-2 w-[60%] text-left mt-10">
          <h2 className="text-xl font-semibold">Mall Details</h2>
          <p className="text-sm text-gray-600">Please provide basic mall data</p>
        </div>

        <form onSubmit={submitMallDetails} className="w-[40%] bg-white z-10 max-w-4xl rounded-xl mx-auto">
          <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
            {['complexName', 'email', 'mallLocation', 'contactSupport'].map((field) => (
              <label key={field} className="w-full">
                <p className="my-2 text-start">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  <sup className="text-red-400">*</sup>
                </p>
                <input
                  required
                  className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                  type={field === 'email' ? 'email' : field === 'contactSupport' ? 'tel' : 'text'}
                  name={field}
                  onChange={changeHandler}
                  value={mallFormData[field]}
                />
              </label>
            ))}

            <button type="submit" className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer">
              Save Mall Details
            </button>
          </div>
          {successMessage.mall && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.mall}</div>}
        </form>
      </div>

      {/* Parking Layout Form */}
      <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
        <div className="mb-2 w-[60%] text-left mt-10">
          <h2 className="text-xl font-semibold">Parking Layout</h2>
          <p className="text-sm text-gray-600">Please provide parking layout details</p>
        </div>

        <form onSubmit={submitParkingLayout} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
          <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
            {['noOfPillars', 'rangeOfPillars', 'minCarsPerPillar', 'entryGates', 'exitGates'].map((field) => (
              <label key={field} className="w-full">
                <p className="my-2 text-start">{field.replace(/([A-Z])/g, ' $1').replace('No Of', 'Number of')}</p>
                <input
                  className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                  type={field === 'noOfPillars' || field.includes('Gates') ? 'number' : 'text'}
                  name={field}
                  onChange={changeHandler}
                  value={parkingFormData[field]}
                />
              </label>
            ))}

            <Link href="/grid">
              <button
                className="bg-black rounded-lg p-2 px-4 text-white"
                onClick={() => localStorage.setItem("parkingFormData", JSON.stringify(parkingFormData))}
              >
                Set Layout
              </button>
            </Link>
          </div>
          {successMessage.parking && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.parking}</div>}
        </form>
      </div>

      {/* Vehicle Payment Data */}
      <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
        <div className="mb-2 w-[60%] text-left mt-10">
          <h2 className="text-xl font-semibold">Vehicle Payment Data</h2>
          <p className="text-sm text-gray-600">Please provide fee structure per vehicle</p>
        </div>

        <form onSubmit={submitParkingFee} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
          <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
            {['carPrice', 'bikesFee'].map((field) => (
              <label key={field} className="w-full">
                <p className="my-2 text-start">{field.replace(/([A-Z])/g, ' $1').replace('Fee', ' Fee')}</p>
                <input
                  className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                  type="number"
                  name={field}
                  onChange={changeHandler}
                  value={paymentFormData[field]}
                />
              </label>
            ))}

            <button type="submit" className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer">
              Save Payment Data
            </button>
          </div>
          {successMessage.payment && <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">{successMessage.payment}</div>}
        </form>
      </div>
    </section>
  );
}
