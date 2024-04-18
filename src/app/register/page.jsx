"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toggleStatus } from "../../utils/loginSlice";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    country: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!formData.name || !formData.email || !formData.password || !formData.contact || !formData.country) {
      toast.error("All fields are Mandatory !")
      return;
    }

    try {
      const response = await fetch("/api/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res=await response.json();
      console.log(res);

      if (response.status === 200) {
        console.log("User registered:");
        dispatch(toggleStatus(true))
        router.push('/')
      } else {
        console.error("Failed to register user");
        dispatch(toggleStatus(false))
      }
    } catch (error) {
      console.error("Failed to register user:", error);
      dispatch(toggleStatus(false))
    }

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="my-[5%]">
      <div className="container h-[full] w-[50%] m-auto p-3 bg-white border border-t-2 border-primary rounded-md">
        <h1 className="font-bold text-2xl text-gray-600 my-4 text-center uppercase">
          Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                placeholder="XYZ"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-4 bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>


          <div className="mb-4 px-2">
            <label htmlFor="email" className="text-sm text-second">
              Email
            </label>
            <input
              placeholder="xyz@abc.com"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-[90%] border-b-4 bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          
          <div className="px-2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="****"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b-4 bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="px-2">
            <div className="mb-4">
              <label htmlFor="contact" className="leading-7 text-sm text-gray-600">
                Contact
              </label>
              <input
                placeholder="1234567890"
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-[90%] border-b-4 bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2">
            <div className="mb-4">
              <label htmlFor="country" className="leading-7 text-sm text-gray-600">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Bharat"
                value={formData.country}
                onChange={handleChange}
                className="w-full border-b-4 bg-white rounded border border-third focus:border-second focus:ring-2 focus:ring-third text-base outline-none text-second py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className=" flex justify-center">
              <button type="submit" className="text-center p-3 rounded font-bold bg-primary text-white">Submit</button>
            </div>
          </div>
        </form>
        <div className="flex gap-3 justify-center m-5">
          <p className="text-gray-600">Already have an account ?</p>
          <Link href="/login">
            <span className="font-bold cursor-pointer text-gray-600">LogIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
