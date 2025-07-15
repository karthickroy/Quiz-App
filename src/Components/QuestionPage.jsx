import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryContext from "./Category";
import Stepper from "./Stepper";

const QuestionPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds
  const [updatedQuestions, setUpdatedQuestions] = useState([]);
  const timerId = useRef(null);
  const { category, user } = useContext(categoryContext);
  const params = useParams();
  const questionNo = Number(params?.id) - 1;
  const questionLength = updatedQuestions?.length;
  const navigate = useNavigate();

  const shuffleOptions = (question) => {
    const options = [...question.incorrect_answers, question.correct_answer];
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (category) {
      const updatedQuestions = category?.results?.map((q) => ({
        ...q,
        shuffledOptions: shuffleOptions(q),
      }));
      setUpdatedQuestions(updatedQuestions);
    }
  }, [category]);

  useEffect(() => {
    if (timerId.current) clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId.current);
          // Optional: you can auto-submit or alert here on timeout
          document.getElementById("my_modal_1")?.showModal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  if (!category) {
    return <div>Loading context...</div>;
  }
  return (
    <div className="w-full mx-auto flex items-center  flex-col min-h-screen px-4 py-8 ">
      <div className=" flex justify-around items-center w-full  ">
        <img src="/Group 114.png" alt="efewf" />
        <div className="flex space-x-6">
          <a href="#" className="relative text-[#E0E0E0] group">
            How it works?
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#E0E0E0] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="relative text-[#E0E0E0] group">
            Features
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#E0E0E0] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="relative text-[#E0E0E0] group">
            About us
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#E0E0E0] transition-all duration-300 group-hover:w-full"></span>
          </a>
          {user ? (
            <div className="flex gap-2 justify-center items-center">
              <img src="/Group (1).svg" alt="" />
              <p className="text-sm text-gray-600">
                {user.displayName || user.email || "Anonymous"}
              </p>
            </div>
          ) : (
            <p className="text-red-500 font-semibold">User not available.</p>
          )}
        </div>
      </div>

      <Stepper stepsCount={questionLength} currentStep={questionNo} />

      <div className="w-full max-w-5xl mt-5">
        <AnimatePresence mode="wait">
          {updatedQuestions && (
            <motion.div
              key={params?.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-3"
            >
              <h3 className="text-xl md:text-2xl text-white bg-amber-400 p-4 mb-4 rounded">
                {questionNo + 1}. {updatedQuestions[questionNo]?.question}
              </h3>

              <div className="mt-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {updatedQuestions[questionNo]?.shuffledOptions?.map(
                    (option, i) => (
                      <li
                        key={i}
                        className={`p-4 md:p-6 text-black cursor-pointer text-center rounded ${
                          selectedOption === option
                            ? "bg-amber-400"
                            : "bg-gray-400"
                        } hover:bg-amber-400 transition-colors`}
                        onClick={() => {
                          setSelectedOption(option);
                          setAnswers((prev) => ({
                            ...prev,
                            [questionNo]: option,
                          }));
                        }}
                      >
                        {option}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex flex-col-reverse sm:flex-row ${
            params?.id > 1 ? "justify-between" : "justify-end"
          } mt-10 gap-4 items-center`}
        >
          {params?.id > 1 && (
            <button
              className="p-4 sm:px-8 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              onClick={() =>
                navigate(
                  `/question/${params?.category}/${Number(params?.id - 1)}`
                )
              }
            >
              Previous
            </button>
          )}

          {/* ✅ Time.svg Image */}
          <div className="w-14 h-14 mx-4 relative ">
            <img
              src="/Time (1).svg"
              alt="Timer Icon"
              className="w-full h-full object-contain "
            />
            <span className="absolute top-[15px] right-[1px] left-[15px]  text-black font-mono font-semibold">
              {timeLeft}
            </span>
          </div>
          <button
            className={`p-4 sm:px-8 rounded text-white transition ${
              Number(params?.id) === questionLength
                ? "bg-green-600 hover:bg-green-700"
                : "bg-amber-400 hover:bg-amber-500"
            }`}
            onClick={() => {
              if (Number(params?.id) === questionLength) {
                const totalScore = updatedQuestions.reduce((acc, q, idx) => {
                  return answers[idx] === q.correct_answer ? acc + 1 : acc;
                }, 0);
                setScore(totalScore);
                document.getElementById("my_modal_1")?.showModal();
                return;
              }

              navigate(
                `/question/${params?.category}/${Number(params?.id) + 1}`
              );
            }}
          >
            {Number(params?.id) === questionLength ? "Submit" : "Next"}
          </button>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-center max-w-lg">
          <div className="relative w-[400px] h-[400px] mx-auto mb-4">
            <img
              src="/Dayflow Abstract 1 (1).svg"
              alt="Success Illustration"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-white drop-shadow-md">
                {score}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-green-600">Your Score</h2>
          <p className="text-lg mb-6">
            You got <span className="font-bold">{score}</span> out of{" "}
            <span className="font-bold">{questionLength}</span> correct!
          </p>

          <div className="modal-action justify-center">
            <form method="dialog">
              <button
                className="bg-amber-300 text-white px-6 py-2 rounded hover:bg-amber-300 cursor-pointer"
                onClick={() => navigate("/landing")}
              >
                Go Home
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default QuestionPage;
