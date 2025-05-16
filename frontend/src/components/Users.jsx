import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])

    return <>

        <div className="my-4">
            <input 
                onChange={(e) => {
                    setFilter(e.target.value)
                }} 
                type="text" 
                placeholder="Search users..." 
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
        </div>
        <div className="space-y-4">
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center gap-3">
            <div className="rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center text-white shadow-sm">
                <div className="text-xl font-medium">
                    {user.firstName[0]}
                </div>
            </div>
            <div>
                <div className="text-lg font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div>
            <Button 
                onClick={(e) => {
                    navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} 
                label={"Send Money"}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            />
        </div>
    </div>
}