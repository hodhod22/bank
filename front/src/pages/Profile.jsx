import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    // Call API to save profile changes
    dispatch(setUser({ ...user, name, email }));
  };

  return (
    <div className="container mx-auto mt-8 ">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="bg-white shadow-md p-6 rounded">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
