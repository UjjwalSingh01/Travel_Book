"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import QuoteCarousel from "./components/QuoteCarousel";
import { quotes } from "./constants/constants";
import Alert from "../../common_components/Alert";
import Loading from "../../common_components/Loading";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.gender || !formData.dateOfBirth || !formData.password || !formData.confirmPassword) {
      setError(true);
      setMessage('All Fields Are Required');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setMessage('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formData);

      if (response.data.success) {
        localStorage.setItem("userName", response.data.user.name);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
        });

        setSuccess(true);
        setMessage("Register Successfully");
      } else {
        setError(true);
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error('Backend error:', error.response?.data);
        setMessage(error.response?.data?.message || 'Failed to subscribe. Please try again later.');
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      {(error || success) && (
        <Alert
          message={message} 
          success={success} 
          onClose={() => {
            setError(false);
            setSuccess(false);
          }}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
      <>
      {/* Left Section */}
      <div className="hidden md:flex w-2/5 xl:w-1/2 bg-gray-800 p-8 lg:p-12 relative">
        <Link 
          to={'/'} 
          className="absolute top-8 left-8 text-white text-3xl md:text-4xl xl:text-5xl font-montserrat font-bold z-10"
        >
          Travel Book
        </Link>
        <QuoteCarousel quotes={quotes} />
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-3/5 xl:w-1/2 justify-center items-center bg-gray-100">
        <form className="w-[90%] p-8" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Register</h1>

          {/* First Name and Surname */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Type your first name"
                className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Type your Lastname"
                className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
                type="email"
                placeholder="Type your email"
                className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender and DOB */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-1/2">
                <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="w-full  text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password"
                className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 bottom-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-type your password"
                className="w-full text-xs bg-transparent p-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 bottom-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-[30px] text-lg font-semibold hover:bg-gray-700"
            >
              Register
            </button>
          </form>
        </div>
        </>
      )}
    </div>
  );
};

export default Register;