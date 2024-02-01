import React, { useState, useContext } from "react";
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
<>
  <Card color="white" shadow={false} className="p-10 lg:w-3/4">
    <Typography variant="h4" color="blue-gray">
      Add Inventory Item
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Enter the details of the inventory item.
    </Typography>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg w-100">
      <div className="mb-1 flex flex-col gap-6">

      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-full">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Item Name
        </Typography>
        <Input
          size="lg"
          placeholder="Item name"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none w-full",
          }}
          onChange={(e) => setItemName(e.target.value)}
        />
        </div>

        <div className="w-full">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Category
        </Typography>
        <FilterItems onChange={(value) => setCategory(value)} />
        </div>
        </div>

        <div className="flex items-center justify-between gap-2 w-full">
          <div>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
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

          <div className="w-full">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
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

      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-full">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Status
        </Typography>
        <StatusOptions onChange={(value) => setItemStatus(value)} />
        </div>

        <div className="w-full">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Add Image
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        />
        </div>

        </div>

        {/* Display a preview of the uploaded image if needed */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 max-w-full h-auto"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="text"
          color="red"
          onClick={closeModal}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" onClick={handleAddInventory} className="bg-indigo-500">
          <span>Add Inventory Item</span>
        </Button>
      </div>

      <Typography color="gray" className="mt-4 text-center font-normal">
        {/* You can add a link to view all inventory items here */}
      </Typography>
    </form>
  </Card>
</>

  );
}