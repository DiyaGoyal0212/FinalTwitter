import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Explore = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/user/list");
            console.log("Full response:", response);
            console.log("length", users.length);

            if (response.data?.success) {
                setUsers(response.data.products); // Assuming the data is still named "products"
            } else {
                toast.error(response.data?.message || "Failed to fetch users.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || error.message || "An error occurred.");
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Explore Users</h1>
            <div className="max-w-4xl mx-auto space-y-6">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {user.name}
                            </h2>
                            <p className="text-gray-600">
                                <strong>Username:</strong> {user.username}
                            </p>
                            <p className="text-gray-600">
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p className="text-gray-600">
                                <strong>Followers:</strong> {user.followers?.length || 0}
                            </p>
                            <p className="text-gray-600">
                                <strong>Following:</strong> {user.following?.length || 0}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No users available.</p>
                )}
            </div>
        </div>
    );
};

export default Explore;
