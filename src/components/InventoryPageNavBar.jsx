import React from 'react';
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
 
export function InventoryPageNavBar() {
  return (
    <Navbar
      variant="gradient"
      color="bg-light"
      className="w-full mx-auto from-blue-gray-900 to-blue-gray-800 radius-none border-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white radius-none">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Material Tailwind
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <IconButton variant="text" color="white">
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton variant="text" color="white">
            <BellIcon className="h-4 w-4" />
          </IconButton>
        </div>

      </div>
    </Navbar>
  );
}

export default InventoryPageNavBar;