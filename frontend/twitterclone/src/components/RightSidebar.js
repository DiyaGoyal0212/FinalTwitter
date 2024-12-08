import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the users based on the search term
  const filteredUsers = otherUsers?.filter((user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) // Optional: Search by username as well
  );

  // Handle change in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='w-[25%]'>
      {/* Search Bar */}
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
        <CiSearch size="20px" />
        <input
          type="text"
          className='bg-transparent outline-none px-2'
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Who to Follow Section */}
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>

        {/* Check if filteredUsers has results */}
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user?._id} className='flex items-center justify-between my-3'>
              <div className='flex'>
                <div>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                    size="40"
                    round={true}
                  />
                </div>
                <div className='ml-2'>
                  <h1 className='font-bold'>{user?.name}</h1>
                  <p className='text-sm'>{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className='text-gray-500'>No users found</div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
