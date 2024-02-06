import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Typography,
  Input,
  Checkbox
} from "@material-tailwind/react";
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { FirebaseContext } from '../Context';
import { initializeApp } from "firebase/app";
import { FilterItems, StatusOptions } from "./FilterItems";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

AddInventoryPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export function AddInventoryPage({ closeModal }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState(''); 
  const [price, setPrice] = useState(0);
  const [itemStatus, setItemStatus] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useContext(FirebaseContext);

  const handleImageUpload = (file) => {
    // Handle the file and set the imagePreview state
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();

    setIsloading(true);

    const inventoryItem = {
      itemName,
      quantity,
      price,
      category,
      dateOfAddition: new Date().toISOString(),
      imagePreview,
      itemStatus,
      addedBy: user.email
    };

    try {
      // Add the inventory item to Firestore
      const docRef = await addDoc(collection(db, 'inventory'), inventoryItem);

      console.log('Document written with ID: ', docRef.id);
      setMessage('Inventory item added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Someting went wrong, Please try again later.');
    } finally {
      closeModal();
      setIsloading(false);
    }
  };
 
  return (
    <Card color="white" shadow={false} className="p-10 lg:w-3/4 bg-white max-w-screen-lg h-full sm:w-full mx-auto">
      <Typography variant="h4" color="blue-gray">
        Add Inventory Item
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter the details of the inventory item.
      </Typography>

      <form className="mt-8 mb-2 max-w-screen-lg w-100">
        <div className="flex flex-col gap-6 border border-blue-gray-200 rounded-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="">
                Item Name
              </Typography>
              <Input
                size="lg"
                placeholder="Item name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                labelProps={{
                  className: "before:content-none after:content-none w-full",
                }}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="">
                Category
              </Typography>
              <FilterItems onChange={(value) => setCategory(value)} />
            </div>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="">
                Price
              </Typography>
              <Input
                size="lg"
                placeholder="Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="">
                Quantity
              </Typography>
              <Input
                size="lg"
                placeholder="Quantity"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" className="">
                Status
              </Typography>
              <StatusOptions onChange={(value) => setItemStatus(value)} />
            </div>
          </div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 hidden"
                    />
                </label>
            </div> 


          {/* Display a preview of the uploaded image if needed */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-w-full h-auto"
            />
          )}

          <div className="flex flex-row gap-2 mt-6 end">
            <Button
              variant="text"
              color="white"
              onClick={closeModal}
              className="mr-1 bg-red-500"
            >
              <span>Cancel</span>
            </Button>
            <Button className="flex items-center gap-3 bg-indigo-500" onClick={handleAddInventory}>
              Add Inventory Item
            </Button>
          </div>

          {/* <Typography color="gray" className="mt-4 text-center font-normal"> */}
            {/* You can add a link to view all inventory items here */}
          {/* </Typography> */}
        </div>
      </form>
      <Typography color="gray" className="mt-1 font-normal text-white">
          Enter the details of the inventory item.
      </Typography>
    </Card>
  );
}