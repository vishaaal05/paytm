import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const validateInputs = () => {
        if (!firstName.trim()) {
            toast.error("First name is required");
            return false;
        }
        if (!lastName.trim()) {
            toast.error("Last name is required");
            return false;
        }
        if (!username.trim() || !username.includes('@')) {
            toast.error("Please enter a valid email");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSignUp = async () => {
        if (!validateInputs()) return;
        setLoading(true);
        try {
            const response = await axios.post('https://simp-a-wallet.onrender.com/api/v1/user/signup', {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem('token', response.data.token);
            toast.success("Signup successful!");
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex justify-center items-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex flex-col justify-center w-full max-w-md">
            <div className="rounded-2xl bg-white shadow-xl p-8 space-y-6">
            
                <div className="text-center">
 <Heading label={"Sign up"} />
                </div>
               
                <SubHeading label={"Enter your information to create an account"} />
                <div className="space-y-4">
                    <InputBox 
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="John"
                        label={"First Name"}
                    />
                    <InputBox 
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Doe"
                        label={"Last Name"}
                    />
                    <InputBox 
                        onChange={e => setUsername(e.target.value)}
                        placeholder="rebuiltx@gmail.com"
                        label={"Email"}
                        type="email"
                    />
                    <InputBox 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="minimum 6 characters"
                        label={"Password"}
                        type="password"
                    />
                </div>
                <div className="pt-4">
                    <Button 
                        onClick={handleSignUp} 
                        label={loading ? "Signing up..." : "Sign up"}
                        className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-200 ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    />
                </div>
                <BottomWarning 
                    label={"Already have an account?"} 
                    buttonText={"Sign in"} 
                    to={"/signin"}
                />
            </div>
        </div>
    </div>
}