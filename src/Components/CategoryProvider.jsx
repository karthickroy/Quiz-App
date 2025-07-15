import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfigurations/config";
import categoryContext from "./Category";

const CategoryProvider = ({ children }) => {
  const savedQuiz = JSON.parse(localStorage.getItem("quizData")) || {};
  const [category, setCategory] = useState(savedQuiz);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This listener watches for login/logout
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // ✅ sets user on both email and Google login
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <>
      <categoryContext.Provider
        value={{ setCategory, category, user, setUser }}
      >
        {children}
      </categoryContext.Provider>
    </>
  );
};

export default CategoryProvider;
