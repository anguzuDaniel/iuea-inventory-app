import React, { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";
 
export function FilterItems({ onChange }) {
  const [selectedValue, setSelectedValue] = useState('All');

  const handleFilterItemsChange = (value) => {
    setSelectedValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      <Select
        label="Category"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={(value) => handleFilterItemsChange(value)}
        value={selectedValue}
      >
          <Option value='All' >All</Option>
          <Option value="Electronics">Electronics</Option>
          <Option value="Clothing">Clothing</Option>
          <Option value="Accessories">Accessories</Option>
          <Option value="In Stock">In Stock</Option>
          <Option value="Out of Stock">Out of Stock</Option>
          <Option value="Low Stock">Low Stock</Option>
          <Option value="Warehouse A">Warehouse A</Option>
          <Option value="Warehouse B">Warehouse B</Option>
          <Option value="Last 7 Days">Last 7 Days</Option>
          <Option value="Last 30 Days">Last 30 Days</Option>
          <Option value="Supplier A">Supplier A</Option>
          <Option value="Supplier B">Supplier B</Option>
          <Option value="Under $50">Under $50</Option>
          <Option value="Under $100">$50 - $100</Option>
          <Option value="Over $100">Over $100</Option>
          <Option value="Popular Items">Popular Items</Option>
          <Option value="Featured Items">Featured Items</Option>
          <Option value="Items on Sale">Items on Sale</Option>
          <Option value="Online Purchase">Online Purchase</Option>
          <Option value="In-Store">In-Store</Option>
      </Select>
    </div>
  );
}


export function StatusOptions({ onChange }) {
  const [selectedValue, setSelectedValue] = useState('Available');

  const handleStatusChange = (value) => {
    setSelectedValue(value);

    console.log(value)
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      <Select
        label="Filter"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={(value) => handleStatusChange(value)}
        value={selectedValue}
      >
        <Option value="Available">Available</Option>
        <Option value="Out of Stock">Out of Stock</Option>
        <Option value="Low Stock">Low Stock</Option>
      </Select>
    </div>
  );
}