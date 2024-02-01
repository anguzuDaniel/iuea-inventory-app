import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Context';
import { BsFillCollectionFill, BsBarChartLine } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { SortableTable } from './Table';
import { getFirestore, collection, getCountFromServer, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function DashboardContent({ openModal }) {
    const userImage = "https://i.stack.imgur.com/l60Hf.png";
    const { auth } = useContext(FirebaseContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [totalInventory, setTotalInventory] = useState(0);

    useEffect(() => {
      const inventoryCollection = collection(firestore, 'inventory');
    
      const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
        const totalItems = snapshot.docs.length;
        setTotalInventory(totalItems);
      });
    
      return () => unsubscribe();
    }, [firestore]);


    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log('User logged out successfully!');
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    };

  return (
    <div className="flex flex-col">
      {/* Navigation Bar */}
      <nav className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="relative">
          <img
            src={userImage}
            alt="User"
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />

        {dropdownOpen && (
          <div className="absolute top-10 right-0 bg-gradient-to-r from-indigo-500 to-pink-500 border rounded shadow-md p-2 w-48">
            {/* Add your dropdown menu items here */}
            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              Edit Profile
            </div>
            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              Inventory Details
            </div>
            <div className="cursor-pointer py-2 px-4 text-white hover:bg-purple-500 transition duration-300">
              Settings
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
      </nav>


      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Total Inventory</h2>
            <BsFillCollectionFill className="w-10 h-10 mt-2 bg-gradient-to-r from-indigo-500 to-pink-500" />
            <p className="text-3xl font-bold">{totalInventory}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Avialable Inventory</h2>
            <MdOutlineInventory2 className="w-10 h-10 mt-2 text-gradient-to-r from-indigo-500 to-pink-500" />
            <p className="text-3xl font-bold text-red-500">10</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Requests</h2>
            <BsBarChartLine className="w-10 h-10 mt-2 bg-gradient-to-r from-indigo-500 to-pink-500" />
            <p className="text-3xl font-bold">25</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <SortableTable openModal={openModal} />
      </div>
    </div>
  );
}

export default DashboardContent;
