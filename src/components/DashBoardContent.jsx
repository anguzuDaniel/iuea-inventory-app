import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../Context';
import { BsFillCollectionFill, BsBarChartLine } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineInventory2 } from "react-icons/md";
import { SortableTable } from './Table';
import { getFirestore, collection, getCountFromServer, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import NavigationBar from './NavigationBar';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function DashboardContent({ openModal }) {
    const { auth } = useContext(FirebaseContext);
    const [totalInventory, setTotalInventory] = useState(0);

    useEffect(() => {
      const inventoryCollection = collection(firestore, 'inventory');
    
      const unsubscribe = onSnapshot(inventoryCollection, (snapshot) => {
        const totalItems = snapshot.docs.length;
        setTotalInventory(totalItems);
      });
    
      return () => unsubscribe();
    }, [firestore]);



  return (
    <div className="flex flex-col">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Total Inventory</h2>
            <BsFillCollectionFill className="w-10 h-10 mt-2 text-indigo-500" />
            <p className="text-3xl font-bold">{totalInventory}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Avialable Inventory</h2>
            <MdOutlineInventory2 className="w-10 h-10 mt-2 text-indigo-500" />
            <p className="text-3xl font-bold text-red-500">10</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Requests</h2>
            <BsBarChartLine className="w-10 h-10 mt-2 text-indigo-500" />
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
