import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import { useFirebase } from "../Context";
  import { getFirestore, collection, getDocs } from 'firebase/firestore';

   
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Available':
        return 'text-red-500';
      case 'Out of Stock':
        return 'text-indingo-500';
      case 'Low Stock':
        return 'text-green-500';
      default:
        return 'text-blue-gray-500';
    }
  };
  
   
  const TABLE_HEAD = ["Name", "Status", "Price", "Quantity", "Date of creation", "Operations"];
   
  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];
   
  export function SortableTable({ openModal }) {
    const { auth } = useFirebase();
    const [inventoryData, setInventoryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchInventoryData = async () => {
        try {
          const db = getFirestore();
          const inventoryCollection = collection(db, 'inventory');
          const inventorySnapshot = await getDocs(inventoryCollection);
          const data = inventorySnapshot.docs.map((doc) => doc.data());
          setInventoryData(data);
        } catch (error) {
          console.error('Error fetching inventory data:', error);
        }
      };
  
      fetchInventoryData();
    }, []);

    return (
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
          <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5 focus-visible:outline-indigo-500" />}
              />
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button className="flex items-center gap-3 bg-indigo-500" size="sm" onClick={openModal}>
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Inventory
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-indigo-500">
            <div className="w-full md:w-72">

            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(
                ({ imagePreview, itemName, itemStatus, price, quantity, dateOfAddition, addedBy }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                    const date = new Date(dateOfAddition);
                    const formattedDate = date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
   
                  return (
                    <tr key={itemName}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={imagePreview} alt={itemName} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {itemName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {addedBy}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`font-normal ${getStatusColorClass(itemStatus)}`}
                          >
                            {itemStatus}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {quantity}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {price}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {formattedDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }