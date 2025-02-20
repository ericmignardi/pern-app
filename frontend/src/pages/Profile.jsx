import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image);
      await updateProfile({ profile_pic: base64image });
    };
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-8 py-8">
      <h1 className="text-2xl text-indigo-500">My Profile</h1>

      <label htmlFor="profile_pic">
        <img
          className="w-64 aspect-square border-indigo-500 border-2 rounded-full"
          src={selectedImage || authUser.profile_pic || "/profilePic.jpg"}
          alt="Profile Picture"
        />
        <input
          type="file"
          accept="image/*"
          name="profile_pic"
          className="hidden"
          id="profile_pic"
          onChange={handleImageUpload}
          disabled={isUpdatingProfile}
        />
      </label>

      <p className="text-xs text-indigo-950">
        {isUpdatingProfile
          ? "Uploading..."
          : "Click On The Image To Update Profile"}
      </p>
      <h2>
        <span>Full Name: </span>
        {authUser.first_name} {authUser.last_name}
      </h2>
      <p>
        <span>Username: </span>
        {authUser.username}
      </p>
      <p>
        <span>Created At: </span>
        {new Date(authUser.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default Profile;
