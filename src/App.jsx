import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import QuestionPage from "./Components/QuestionPage";
import Stepper from "./Components/Stepper";

function App() {
  return (
    <Router>
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />

          <Route path="/stepper" element={<Stepper stepsCount={10} />} />

          <Route path="/question" element={<QuestionPage />} />
          <Route path="/question/:category/:id" element={<QuestionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
