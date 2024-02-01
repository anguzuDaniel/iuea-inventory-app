import React, { useState, useEffect, useContext } from 'react';
import InventoryItem from '../components/InventoryItem';
import SideBar from '../components/SideBar';
import { InventoryPageNavBar } from '../components/InventoryPageNavBar';
import { FilterItems } from '../components/FilterItems';
import { Typography } from '@material-tailwind/react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../Context';
import { Shimmer } from "react-shimmer";

const InventoryPage = () => {
  const [items, setInevntoryItems] = useState([]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      const db = getFirestore();
      const inventoryCollection = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryList = inventorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInevntoryItems(inventoryList);
    };
    fetchInventoryItems();
  }, []);

  return (
    <div className='w-full'>
        <div className="flex relative w-full mx-auto bg-gray-200">
          <div className="lg:w-1/4 w-full">
            <SideBar />
          </div>

          <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center">
            <InventoryPageNavBar />

            <div className='p-6 flex justify-center flex-col'>
              <div className='flex justify-between py-6'>
                <Typography variant="h5" color="blue-gray">
                Filter Inventory
                </Typography>

                <FilterItems  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {items.map((item) => (
                  
                    <InventoryItem key={item.id} {...item} />
                 
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default InventoryPage;
