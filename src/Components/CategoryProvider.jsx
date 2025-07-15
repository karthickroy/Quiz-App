import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfigurations/config";
import categoryContext from "./Category";

const CategoryProvider = ({ children }) => {
  const savedQuiz = JSON.parse(localStorage.getItem("quizData")) || {};
  const [category, setCategory] = useState(savedQuiz);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
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
