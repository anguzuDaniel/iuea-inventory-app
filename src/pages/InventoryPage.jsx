import React, { useState, useEffect, useContext } from 'react';
import InventoryItem from '../components/InventoryItem';
import SideBar from '../components/SideBar';
import { InventoryPageNavBar } from '../components/InventoryPageNavBar';
import { FilterItems } from '../components/FilterItems';
import { Button, Input, Typography } from '@material-tailwind/react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../Context';
import { Shimmer } from "react-shimmer";
import NavigationBar from '../components/NavigationBar';

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
          <div className="lg:w-1/4">
            <SideBar />
          </div>

          <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center h-full">
            {/* Navigation Bar */}
            <NavigationBar />

            <div className='p-6 flex justify-center flex-col bg-white m-6 border'>
              <div className='flex justify-between sm:flex-col lg:flex-row gap-4 mb-10'>
                <div className="relative flex w-full gap-2">
                  <Input
                    type="search"
                    color="white"
                    label="Type here..."
                    className="pr-20"
                    containerProps={{
                      className: "min-w-[288px] outline-indigo-500",
                    }}
                  />
                  <Button
                    size="sm"
                    color="bg-indigo-500"
                    className="!absolute right-1 top-1 rounded bg-indigo-500"
                  >
                    Search
                  </Button>
                </div>

                <div>
                  <FilterItems  />
                </div>               
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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