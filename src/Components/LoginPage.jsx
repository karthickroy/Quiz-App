import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebaseconfigurations/config";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

  // Email/Password validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/landing");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSignIn = () => {
    if (validateForm()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/landing");
          toast.success("Logged in successfully");
        })
        .catch((error) => {
          console.log("error :", errorMessage);
          const errorMessage = error.message;
          setSubmitError("email already in use");
        });
    }
  };

  const handleLogin = () => {
    if (validateForm()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/landing");
          toast.success("Logged in successfully");
        })
        .catch((error) => {
          console.error("Firebase login error:", error);
          toast.error("Invalid credentials");
          setSubmitError("Invalid credentials");
        });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full lg:h-screen justify-around items-center px-4 py-10">
      {/* Left Section */}
      <div className="w-full max-w-[400px]">
        <div className="text-center">
          <img src="quizlogo.png" className="w-[200px] mx-auto" alt="logo" />
          <p className="pt-5 text-gray-400 text-sm sm:text-base">
            Welcome back! <br />
            Please login/Signup to your account.
          </p>
        </div>

        {/* Email */}
        <div className="pt-6">
          <label htmlFor="email" className="text-gray-500 text-sm">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 w-full p-2 mt-1 text-amber-400 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="pt-4">
          <label htmlFor="password" className="text-gray-500 text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 w-full p-2 mt-1 text-amber-400 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {submitError && (
          <p className="text-red-500 text-xs mt-1">{submitError}</p>
        )}

        {/* Remember & Forgot */}
        <div className="flex justify-between items-center pt-3 text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-gray-500">Remember</label>
          </div>
          <p className="text-amber-500 cursor-pointer">Forgot Password?</p>
        </div>

        {/* Buttons */}
        <div className="pt-6 flex gap-4">
          <button
            onClick={handleLogin}
            className="flex-1 bg-amber-400 text-white py-2 rounded cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignIn}
            className="flex-1 border border-amber-400 text-amber-400 py-2 rounded cursor-pointer hover:bg-white"
          >
            Signup
          </button>
        </div>

        {/* Social */}
        <div className="flex flex-wrap items-center gap-4 pt-5 text-sm justify-center sm:justify-start">
          <span>or login with</span>
          <button onClick={signIn} className="text-amber-500 font-bold">
            Google
          </button>
        </div>
      </div>

      {/* Right Image */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="Hands Graduate.svg"
          alt="login-illustration"
          className="w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </div>
  );
}
