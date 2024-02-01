import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const InventoryItem = ({ itemName, quantity, price, dateOfAddition, imagePreview, itemStatus, category, addedBy }) => {
  const date = new Date(dateOfAddition);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="w-full">
      <CardHeader shadow={false} floated={false} className="h-40">
        <img
          src={imagePreview}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {itemName}
          </Typography>
          <Typography color="indigo" className="font-medium">
            {quantity} units
          </Typography>
        </div>

          <Typography color="blue-gray" className="font-medium">
            Added: {formattedDate}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            Status: {itemStatus}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            Category: {category}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            Price: {price}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            Added by: {addedBy}
          </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-indigo-500 shadow-none hover:scale-105 hover:shadow-none hover:bg-indigo-500 hover:text-white focus:scale-105 focus:shadow-none active:scale-100"
        >
        View information
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InventoryItem;
