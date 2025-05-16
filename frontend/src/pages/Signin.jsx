import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signin = () => {
  const [username, setUsername] = useState("vishal@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username.trim() || !username.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://simp-a-wallet.onrender.com/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setUsername("vishal@gmail.com");
    setPassword("123456");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://simp-a-wallet.onrender.com/api/v1/user/signin",
        {
          username: "vishal@gmail.com",
          password: "123456",
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Demo Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex justify-center items-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="animate-fade-in">
        <div className="bg-white w-96 rounded-2xl shadow-xl p-8 space-y-6">
          <img src="wallet.png" alt="Logo" className="h-12 w-12 mx-auto mb-2" />
          <div className="text-center">
            <Heading label={"Welcome Back"} />
          </div>

          <SubHeading label={"Sign in to continue to your account"} />
          <div className="space-y-4">
            <InputBox
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              label={"Email"}
              type="email"
            />
            <InputBox
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              label={"Password"}
              type="password"
            />
          </div>
          <div className="space-y-3">
            <Button
              onClick={handleSignIn}
              label={loading ? "Signing in..." : "Sign In"}
              disabled={loading}
              className={loading ? "opacity-70 cursor-not-allowed" : ""}
            />
            <button
              onClick={handleDemoLogin}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Use Demo Account
            </button>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
