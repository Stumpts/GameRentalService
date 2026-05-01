import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/get-account-information?accountID=${sessionStorage.getItem("accountID")}`,
          );
          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8000/update-user-info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "accountID": profileData.accountID,
                "username": profileData.username,
                "password": profileData.password,
                "name": profileData.name,
                "email": profileData.email,
                "phoneNumber": profileData.phoneNumber
            })
        });
        const data = await response.json();
        setIsEditing(false);
        
    } catch (error) {
        console.error("Error updating profile data:", error);
    }
    
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <>
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl mt-4">
        My Profile
      </h1>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Card
          </h2>

          <div className="flex gap-4">
            <button>Profile</button>
            <button>Reviews</button>
          </div>
          <div className="mt-4">
            <form key={profileData.accountID} onSubmit={handleSubmit}>
              {isEditing ? (
                <form>
                  <p className="mb-4">Account ID: {profileData.accountID}</p>
                  <label>Username:</label>
                  <input
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                  />
                  <label>password:</label>
                  <input
                    name="password"
                    value={profileData.password}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                  />
                  <label>email:</label>
                  <input
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                  />
                  <label>phoneNumber:</label>
                  <input
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                  />
                  <label>name:</label>
                  <input
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                  />
                </form>
              ) : (
                <>
                  <p>Account ID: {profileData.accountID}</p>
                  <p>Username: {profileData.username}</p>
                  <p>Email: {profileData.email}</p>
                  <p>Phone Number: {profileData.phoneNumber}</p>
                  <p>Name: {profileData.name}</p>
                </>
              )}

                {!isEditing && (
                  <button onClick={() => setIsEditing(!isEditing)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                    Edit Profile
                  </button>
                )}

                {isEditing && (
                  <button type="submit" className="mt-4 bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-md">
                    Save Changes
                  </button>
                )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
