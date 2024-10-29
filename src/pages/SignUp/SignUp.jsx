import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ValidationMessage from "../../components/Toasters & Alerts/ValidationMessage";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      async function handleSubmitForm(e) {
            e.preventDefault();
            if (!name) {
                  setError("Please enter your name");
                  return;
            }

            if (!validateEmail(email)) {
                  setError("Please enter a valid email address.");
                  return;
            }

            if (!password) {
                  setError("Please enter the password");
                  return;
            }

            setError("");

            //api call
            try {
                  const response = await axiosInstance.post("/create-account", {
                        fullName: name,
                        email: email,
                        password: password,
                  });
                  if (response.data && response.data.error) {
                        setError(response.data.message);
                        return;
                  }

                  if (response.data && response.data.accessToken) {
                        localStorage.setItem("token", response.data.accessToken);
                        navigate("/dashboard");
                  }
            } catch (error) {
                  if (error.response && error.response.data && error.response.data.message) {
                        setError(error.response.data.message);
                  } else {
                        setError("An unexpected error occurred. Please try again.");
                  }
            }
      }
      return (
            <>
                  <Navbar />
                  <div className="flex items-center justify-center mt-28">
                        <div className="w-96 border rounded bg-white px-7 py-10">
                              <form onSubmit={handleSubmitForm}>
                                    <h4 className="text-2xl mb-8 text-center text-gray-700  ">
                                          SignUp
                                    </h4>
                                    <input
                                          type="text"
                                          placeholder="Name"
                                          className="input-box"
                                          value={name}
                                          onChange={(e) => {
                                                setName(e.target.value);
                                          }}
                                    />
                                    <input
                                          type="email"
                                          placeholder="Email"
                                          className="input-box"
                                          value={email}
                                          onChange={(e) => {
                                                setEmail(e.target.value);
                                          }}
                                    />

                                    <PasswordInput
                                          placeholder={"password"}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {error && (
                                          <ValidationMessage
                                                className="text-red-500 text-sm mt-0 bg-red-50 px-3 py-1 rounded-lg mb-5"
                                                msg={error}
                                          />
                                    )}

                                    <button type="submit" className="btn-primary">
                                          Create Account
                                    </button>
                                    <p className="text-sm text-center mt-4">
                                          Already have an account?{" "}
                                          <Link
                                                to="/login"
                                                className="font-medium text-primary underline"
                                          >
                                                Login
                                          </Link>
                                    </p>
                              </form>
                        </div>
                  </div>
            </>
      );
};

export default SignUp;
