"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
    const [mallFormData, setMallFormData] = useState({
        complex: '',
        email: '',
        mallLocation: '',
        contactSupport: '',
        operatingHours: ''
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
            pillarNumberElderly: ''
        }
    });

    const [paymentFormData, setPaymentFormData] = useState({
        carsFee: '',
        bikesFee: ''
    });

    const [successMessage, setSuccessMessage] = useState({
        mall: '',
        parking: '',
        payment: ''
    });

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            const [section, key] = name.split('.');
            setParkingFormData(prevState => ({
                ...prevState,
                friendlyParking: {
                    ...prevState.friendlyParking,
                    [key]: checked
                }
            }));
        } else {
            if (mallFormData.hasOwnProperty(name)) {
                setMallFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            } else if (parkingFormData.hasOwnProperty(name) || name.includes('friendlyParking')) {
                const [section, subKey] = name.split('.');
                if (section === 'friendlyParking') {
                    setParkingFormData(prevState => ({
                        ...prevState,
                        friendlyParking: {
                            ...prevState.friendlyParking,
                            [subKey]: value
                        }
                    }));
                } else {
                    setParkingFormData(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
            } else {
                setPaymentFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const submitHandler = async (e, formType) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const data = formType === 'mall' ? mallFormData : 
                     formType === 'parking' ? parkingFormData : 
                     paymentFormData;

        try {
            const response = await fetch(`${apiUrl}/${formType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setSuccessMessage(prevState => ({
                ...prevState,
                [formType]: 'Form submitted successfully'
            }));

            if (formType === 'mall') {
                setMallFormData({
                    complex: '',
                    email: '',
                    mallLocation: '',
                    contactSupport: '',
                    operatingHours: ''
                });
            } else if (formType === 'parking') {
                setParkingFormData({
                    noOfPillars: '',
                    rangeOfPillars: '',
                    minCarsPerPillar: '',
                    entryGates: '',
                    exitGates: '',
                    friendlyParking: {
                        disabilityEase: false,
                        pillarNumberDisability: '',
                        elderlyCare: false,
                        pillarNumberElderly: ''
                    }
                });
            } else {
                setPaymentFormData({
                    carsFee: '',
                    bikesFee: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage(prevState => ({
                ...prevState,
                [formType]: 'There was an error submitting the form'
            }));
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

                <form onSubmit={(e) => submitHandler(e, 'mall')} className="w-[40%] bg-white z-10 max-w-4xl rounded-xl mx-auto">
                    <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
                        {/* Input Fields */}
                        {['complex', 'email', 'mallLocation', 'contactSupport', 'operatingHours'].map((field) => (
                            <label key={field} className="w-full">
                                <p className="my-2 text-start">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                    <sup className='text-red-400'>*</sup>
                                </p>
                                <input
                                    required
                                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                                    type={
                                        field === 'email' ? 'email' : 
                                        field === 'contactSupport' ? 'tel' : 
                                        'text'
                                    }
                                    name={field}
                                    onChange={changeHandler}
                                    value={mallFormData[field]}
                                    // placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').replace('Support', 'Support Phone')}`}
                                />
                            </label>
                        ))}

                        <button
                            type="submit"
                            className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Save Mall Details
                        </button>
                    </div>
                    {successMessage.mall && (
                        <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">
                            {successMessage.mall}
                        </div>
                    )}
                </form>
            </div>

            {/* Parking Layout Form */}
            <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
                <div className="mb-2 w-[60%] text-left mt-10">
                    <h2 className="text-xl font-semibold">Parking Layout</h2>
                    <p className="text-sm text-gray-600">Please provide parking layout details</p>
                </div>

                <form onSubmit={(e) => submitHandler(e, 'parking')} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
                    <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
                        {/* Parking Layout Input Fields */}
                        {['noOfPillars', 'rangeOfPillars', 'minCarsPerPillar', 'entryGates', 'exitGates'].map((field) => (
                            <label key={field} className="w-full">
                                <p className="my-2 text-start">
                                    {field.replace(/([A-Z])/g, ' $1').replace('No Of', 'Number of')}
                                </p>
                                <input
                                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                                    type={
                                        field === 'noOfPillars' || field.includes('Gates') ? 'number' : 
                                        'text'
                                    }
                                    name={field}
                                    onChange={changeHandler}
                                    value={parkingFormData[field]}
                                    // placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').replace('No Of', 'Number of')}`}
                                />
                            </label>
                        ))}
                        <Link href='/grid'>
                        <button className='bg-black rounded-lg p-2 px-4 text-white' onClick={()=>{
                            localStorage.setItem("parkingFormData",JSON.stringify(parkingFormData))
                        }}>
                            Set Layout
                        </button>
                        </Link>
                        

                        {/* Friendly Parking Zones */}
                        {['disabilityEase', 'elderlyCare'].map((zone) => (
                            <div key={zone} className="w-full mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={zone}
                                        name={`friendlyParking.${zone}`}
                                        checked={parkingFormData.friendlyParking[zone]}
                                        onChange={changeHandler}
                                        className="mr-2"
                                    />
                                    <label htmlFor={zone}>
                                        Friendly Parking Zone ({zone.replace(/([A-Z])/g, ' $1')})
                                    </label>
                                </div>
                                {parkingFormData.friendlyParking[zone] && (
                                    <label className="w-full mt-2">
                                        <p className="my-2 text-start">
                                            Pillar Number for {zone.replace(/([A-Z])/g, ' $1')}
                                        </p>
                                        <input
                                            className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                                            style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                                            type="text"
                                            name={`friendlyParking.pillarNumber${zone.charAt(0).toUpperCase() + zone.slice(1)}`}
                                            onChange={changeHandler}
                                            value={parkingFormData.friendlyParking[`pillarNumber${zone.charAt(0).toUpperCase() + zone.slice(1)}`]}
                                            // placeholder={`Enter pillar number for ${zone.replace(/([A-Z])/g, ' $1')}`}
                                        />
                                    </label>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Save Parking Layout
                        </button>
                    </div>
                    {successMessage.parking && (
                        <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">
                            {successMessage.parking}
                        </div>
                    )}
                </form>
            </div>

            {/* Vehicle Payment Data */}
            <div className="w-full md:w-11/12 flex flex-col md:flex-row mt-10">
                <div className="mb-2 w-[60%] text-left mt-10">
                    <h2 className="text-xl font-semibold">Vehicle Payment Data</h2>
                    <p className="text-sm text-gray-600">Please provide fee structure per vehicle</p>
                </div>

                <form onSubmit={(e) => submitHandler(e, 'payment')} className="w-[40%] z-10 bg-white max-w-4xl rounded-xl mx-auto">
                    <div className="flex flex-wrap gap-6 p-2 lg:gap-4 mb-4 lg:p-[2rem] justify-between item-start">
                        {/* Payment Input Fields */}
                        {['carsFee', 'bikesFee'].map((field) => (
                            <label key={field} className="w-full">
                                <p className="my-2 text-start">
                                    {field.replace(/([A-Z])/g, ' $1').replace('Fee', ' Fee')}
                                </p>
                                <input
                                    className="text-[0.9rem] border-2 rounded-lg p-2 w-full py-2 outline-none"
                                    style={{ boxShadow: 'inset 0 -1px 0px rgba(255, 255, 255, 0.18)' }}
                                    type="number"
                                    name={field}
                                    onChange={changeHandler}
                                    value={paymentFormData[field]}
                                    // placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').replace('Fee', ' Fee')}`}
                                />
                            </label>
                        ))}

                        <button
                            type="submit"
                            className="bg-[#252630] w-full text-white px-6 py-2 rounded-lg cursor-pointer"
                        >
                            Save Payment Data
                        </button>
                    </div>
                    {successMessage.payment && (
                        <div className="mt-4 p-2 text-green-600 bg-green-200 rounded-lg">
                            {successMessage.payment}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
