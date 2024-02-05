import { Select, Option } from "@material-tailwind/react";
 
export function FilterItems({ onChange }) {
  const handleFilterItemsChange = (value) => {
    if (onChange) {
      onChange(value);  // Propagate the selected value to the parent component
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
        onChange={handleFilterItemsChange}
        value="All"
      >
          <Option>All</Option>
          <Option>Category: Electronics</Option>
          <Option>Category: Clothing</Option>
          <Option>Category: Accessories</Option>
          <Option>Status: In Stock</Option>
          <Option>Status: Out of Stock</Option>
          <Option>Status: Low Stock</Option>
          <Option>Location: Warehouse A</Option>
          <Option>Location: Warehouse B</Option>
          <Option>Date Added: Last 7 Days</Option>
          <Option>Date Added: Last 30 Days</Option>
          <Option>Supplier: Supplier A</Option>
          <Option>Supplier: Supplier B</Option>
          <Option>Price Range: Under $50</Option>
          <Option>Price Range: $50 - $100</Option>
          <Option>Price Range: Over $100</Option>
          <Option>Popular Items</Option>
          <Option>Featured Items</Option>
          <Option>Items on Sale</Option>
          <Option>Availability: Online Purchase</Option>
          <Option>Availability: In-Store</Option>
          <Option>Custom Tags: Tag1</Option>
          <Option>Custom Tags: Tag2</Option>
      </Select>
    </div>
  );
}


export function StatusOptions({ onChange }) {
  const handleStatusChange = (value) => {
    console.log(value)
    if (onChange) {
      onChange(value);  // Propagate the selected value to the parent component
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
        onChange={handleStatusChange}
        value="Available"
      >
        <Option>Available</Option>
        <Option>Out of Stock</Option>
        <Option>Low Stock</Option>
      </Select>
    </div>
  );
}