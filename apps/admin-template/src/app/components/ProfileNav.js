import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

export default function ProfileNav() {
    return (
        <section className="rounded-xl bg-white w-11/12 shadow-xl pb-9 self-center flex flex-col justify-center items-start -mt-[2rem] p-5">
            <nav className="w-full flex justify-between items-center mb-5">
                <div className="flex gap-2 justify-center items-center">
                    <img src='/mallLogo.svg' alt="mall" className="h-12 w-auto" />
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-xl">Mall of Amritsar</h1>
                        <p className="opacity-70 text-sm">mallofamritsar@parkiteasy.com</p>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <Link href='/generateLink'>
                        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Generate Link</button>
                    </Link>
                    <Link href='/profile'>
                        <button className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800">Profile</button>
                    </Link>
                </div>
            </nav>

            <h1 className="text-2xl font-bold mb-2">Let's get started</h1>
            <p className="text-lg mb-4">Take a few minutes to setup your mall parking</p>
            <div className="w-full flex justify-between items-center">
                <Link href='/profile' className="w-[30%]">
                    <div className="p-4 border flex justify-between items-center border-gray-200 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                        <div className="mb-2">
                            <h2 className="text-xl font-semibold">Mall Details</h2>
                            <p className="text-sm text-gray-600">Please provide basic mall data</p>
                        </div>
                        <FaAngleRight/>
                    </div>
                </Link>
                <Link href='/profile' className="w-[30%]">
                    <div className="p-4 border flex justify-between items-center border-gray-200 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                        <div className="mb-2">
                            <h2 className="text-xl font-semibold">Mall Details</h2>
                            <p className="text-sm text-gray-600">Please provide basic mall data</p>
                        </div>
                        <FaAngleRight/>
                    </div>
                </Link>
                <Link href='/profile' className="w-[30%]">
                    <div className="p-4 border flex justify-between items-center border-gray-200 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer">
                        <div className="mb-2">
                            <h2 className="text-xl font-semibold">Mall Details</h2>
                            <p className="text-sm text-gray-600">Please provide basic mall data</p>
                        </div>
                        <FaAngleRight/>
                    </div>
                </Link>
            </div>
        </section>
    );
}
