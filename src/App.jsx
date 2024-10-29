import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

const routes = (
      <Router>
            <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/dashboard" exact element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
            </Routes>
      </Router>
);

const App = () => {
      return <div>{routes}</div>;
};

export default App;
