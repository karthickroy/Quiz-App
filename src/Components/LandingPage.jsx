import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseconfigurations/config.js";
import categoryContext from "./Category";
import { toast } from "react-toastify";

const categoryData = [
  { id: "9", category: "GENERAL KNOWLEDGE" },
  { id: "21", category: "SPORTS" },
  { id: "23", category: "HISTORY" },
  { id: "28", category: "VEHICLES" },
  { id: "17", category: "SCIENCE & NATURE" },
  { id: "27", category: "ANIMALS" },
  { id: "15", category: "ENTERTAINMENT: VIDEO GAMES" },
  { id: "24", category: "POLITICS" },
];

const LandingPage = () => {
  const [categoryID, setCategoryID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");
  const { setCategory, category } = useContext(categoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    const LoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(LoggedIn);

    localStorage.removeItem("quizData");
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.info("Logged out Successfully !");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleOpen = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleQuiz = (categoryID) => {
    if (!categoryID || !difficulty || !type) {
      alert("Please select category, difficulty and type to start the quiz!");
      return;
    } else {
      localStorage.removeItem("quizData");
      setCategory(null);
      fetch(
        `https://opentdb.com/api.php?amount=${10}&category=${categoryID}&difficulty=${difficulty}&type=${type}`
      )
        .then((response) => response.json())
        .then((json) => {
          setCategory(json);
          localStorage.setItem("quizData", JSON.stringify(json));
        })
        .catch((err) => console.error("Error fetching quiz data:", err));
      console.log(category);
      navigate(`/question/${categoryID}/${1}`);
    }
  };

  return (
    <div className="container w-full min-h-screen mx-auto mt-5 relative px-4">
      {/* Header */}
      <div className="header flex flex-col sm:flex-row justify-between items-center px-2 sm:px-5 gap-4">
        <img src="quizlogo_1.png" alt="logo" className="w-32 sm:w-auto" />

        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
          <a href="#" className="text-sm text-[#E0E0E0]">
            How it works?
          </a>
          <a href="#" className="text-sm text-[#E0E0E0]">
            Features
          </a>
          <a href="#" className="text-sm text-[#E0E0E0]">
            About us
          </a>
        </div>

        <div>
          {!isLoggedIn && (
            <button className="p-2 border text-[#FCC822] hover:bg-[#FCC822] hover:text-white">
              Login
            </button>
          )}
          {isLoggedIn && (
            <button
              className="p-2 border text-[#FCC822] hover:bg-[#FCC822] hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-[#ECECE8] pt-2"></div>

      {/* Hero section */}
      <div className="flex flex-col-reverse lg:flex-row pt-10 lg:pt-16 justify-between items-center gap-10">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-snug">
            Learn <br /> new concepts <br /> for each question
          </h2>

          <p className="text-[#828282] text-sm py-4 pl-4 border-l-2 border-[#828282] mt-4 mx-auto lg:mx-0 max-w-xs">
            We help you prepare for exams and quizzes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
            <button
              className="p-2 border bg-amber-300 text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-amber-400 shadow-md hover:shadow-lg"
              onClick={() => handleOpen()}
            >
              Start Solving
            </button>

            <button className="text-amber-300">Know More</button>
          </div>
        </div>

        <img
          src="questions.png"
          className="w-64 sm:w-96 lg:w-[500px] h-auto"
          alt="illustration"
        />
      </div>
      <dialog
        id="my_modal_1"
        className="modal open:animate-fade-in open:backdrop-blur-sm"
      >
        <div className="modal-box w-full max-w-[95%] sm:max-w-[600px] lg:max-w-[800px] animate-scale-in">
          <div className="w-full flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
              Choose your favorite topic
            </h1>

            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {categoryData.map((data) => (
                <button
                  key={data.id}
                  onClick={() => setCategoryID(data.id)}
                  className={`border p-2 px-4 rounded font-medium cursor-pointer transition-all duration-200 ${
                    categoryID === data.id
                      ? "bg-amber-400 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {data.category}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-4">
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                <label className="text-gray-500">Select Difficulty:</label>
                <select
                  className="border p-2 rounded text-gray-600 cursor-pointer"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
              <div className="flex gap-4 items-center justify-center lg:justify-start">
                <label className="text-gray-500">Select Type:</label>
                <select
                  className="border p-2 rounded text-gray-600 cursor-pointer"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-center sm:justify-end gap-4">
              <form method="dialog">
                <button className="px-4 py-2 border text-gray-600 cursor-pointer hover:bg-gray-100 transition">
                  Cancel
                </button>
              </form>
              <button
                className="px-4 py-2 bg-amber-400 text-white font-bold cursor-pointer transition hover:bg-amber-500"
                onClick={() => handleQuiz(categoryID)}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LandingPage;
