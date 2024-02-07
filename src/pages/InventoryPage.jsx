import React, { useState, useEffect, useContext } from 'react';
import InventoryItem from '../components/InventoryItem';
import SideBar from '../components/SideBar';
import { FilterItems } from '../components/FilterItems';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { FirebaseContext } from '../Context';
import { Shimmer } from "react-shimmer";
import NavigationBar from '../components/NavigationBar';

const InventoryPage = () => {
  const [items, setInevntoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
      setFilteredItems(inventoryList);
    };
    fetchInventoryItems();
  }, []);

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

    // Filter items based on search query
    useEffect(() => {
      const filtered = items.filter(item => {
        // Filter logic: check if item name contains search query
        return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    }, [searchQuery, items]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '' || category === 'All') {
      // If category is empty, show all items
      setFilteredItems(items);
    } else {
      // Filter items based on selected category
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <Card className='w-full bg-gray-200 h-screen overflow-scroll'>
        <div className="flex relative w-full mx-auto bg-gray-200 h-full">
          <div className="lg:w-1/4">
            <SideBar />
          </div>

          <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center bg-gray-200 overflow-y-auto">
            {/* Navigation Bar */}
            <NavigationBar />

            <div className='p-6 flex justify-center flex-col m-6 border'>
              <div className='flex justify-between sm:flex-col lg:flex-row gap-4 mb-10'>
                <div className="relative flex w-full gap-2">
                  <Input
                    type="search"
                    label="Type here..."
                    className="pr-20 focus-visible:outline-indigo-500 outline outline-indigo-500"
                    containerProps={{
                      className: "min-w-[288px] outline-indigo-500",
                    }}
                    value={searchQuery}
                    onChange={handleSearchInputChange}
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
                  <FilterItems onChange={handleCategoryChange}  />
                </div>               
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {filteredItems.map((item) => (
                    <InventoryItem key={item.id} {...item} />   
                ))}
              </div>
            </div>
          </div>
      </div>
    </Card>
  );
};

export default InventoryPage;