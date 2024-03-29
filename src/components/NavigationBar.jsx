import React, { useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { getFirestore, collection, getCountFromServer, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../Context';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const NavigationBar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const { auth } = useContext(FirebaseContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      const userDocRef = doc(collection(getFirestore(), 'users'), uid);
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserProfile(userDocSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [auth]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully!');

      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

    return (
      <nav className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className='flex flex-row items-center gap-3'>
          <p className="text-lg font-semibold">
            {userProfile?.fullName || 'Guest'}
          </p>

          {/* User profile dropdown */}
          <div className="relative">
            {userProfile && (
              <img
                src={userProfile.photoURL || "https://i.stack.imgur.com/l60Hf.png"}
                alt="User"
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
            )}

        {dropdownOpen && (
          <div className="absolute top-10 right-0 bg-gradient-to-r from-indigo-500 to-pink-500 border rounded shadow-md p-2 w-48 z-50">
            {/* Add your dropdown menu items here */}
            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              <Link to="/edit-profile" className="text-white hover:bg-purple-500 transition duration-300">
                Edit Profile
              </Link>
            </div>

            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              <Link to="/inventory-details" className="text-white hover:bg-purple-500 transition duration-300">
              Inventory Details
              </Link>
            </div>

            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              <Link to="/settings" className="text-white hover:bg-purple-500 transition duration-300">
              Settings
              </Link>
            </div>

            <div
              className="cursor-pointer py-2 px-4 text-red-500 hover:bg-red-100 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
    );
}

export default NavigationBar;