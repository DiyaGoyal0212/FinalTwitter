import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-10">
            Explore Users
          </h1>
    
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {/* User Profile */}
                  <div className="flex items-center space-x-4 p-6">
                    <div className="flex-shrink-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.name}`}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
    
                  {/* User Details */}
                  <div className="px-6 py-4 space-y-2">
                    <p className="text-gray-600">
                      <strong className="font-medium">Email:</strong> {user.email}
                    </p>
                    <p className="text-gray-600">
                      <strong className="font-medium">Followers:</strong> {user.followers?.length || 0}
                    </p>
                    <p className="text-gray-600">
                      <strong className="font-medium">Following:</strong> {user.following?.length || 0}
                    </p>
                  </div>
    
                  {/* Action Buttons */}
                  <Link to="/profile/:id">
                  <div className="px-6 pb-4">
                    <button className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      View Profile
                    </button>
                  </div>
                  </Link>
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
