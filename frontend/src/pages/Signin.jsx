import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignIn = async () => {
      try {
        // Make an API call to your backend
        const response = await axios.post('https://simp-a-wallet.onrender.com/api/v1/user/signin', {
          username,
          password,
        });
             // Assuming the response contains a token upon successful login
      localStorage.setItem('token', response.data.token);

      // Navigate to the dashboard
      // You'll need to import the 'navigate' function from your router library
      navigate('/dashboard');
    } catch (error) {
      // Handle authentication error (e.g., display an alert)
      console.error('Authentication failed:', error.message);
      alert("Please fill valid username and password")
    }
  };

    return <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex justify-center items-center p-4">
        <div className="animate-fade-in">
            <div className="bg-white w-96 rounded-2xl shadow-xl p-8 space-y-6">
                <img src="wallet.png" alt="Logo" className="h-12 w-12 mx-auto mb-2" />
                <Heading label={"Welcome Back"} />
                <SubHeading label={"Sign in to continue to your account"} />
                <div className="space-y-4">
                    <InputBox 
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your email"
                        label={"Email"}
                        type="email"
                    />
                    <InputBox 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        label={"Password"}
                        type="password"
                    />
                </div>
                <div className="pt-2">
                    <Button onClick={handleSignIn} label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </div>
    </div>
}