import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSignUp = async () => {
        try {
          // Make an API call to your backend
          const response = await axios.post('https://simp-a-wallet.onrender.com/api/v1/user/signup', {
            username,
            firstName,
            lastName,
            password

          });
               // Assuming the response contains a token upon successful login
        localStorage.setItem('token', response.data.token);
  
        // Navigate to the dashboard
        // You'll need to import the 'navigate' function from your router library
        navigate('/dashboard');
      } catch (error) {
        // Handle authentication error (e.g., display an alert)
        console.error('Authentication failed:', error.message);
        alert("Please enter valid details")
      }
    };


    return <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex justify-center items-center p-4">
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
                        label={"Sign up"} 
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-200"
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