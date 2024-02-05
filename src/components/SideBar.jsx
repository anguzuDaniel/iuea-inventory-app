import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FirebaseContext } from '../Context';

export function SideBar() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(0);
    const { auth } = useContext(FirebaseContext);
 
    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };

    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log('User logged out successfully!');

        navigate("/");
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    };
   
    return (
      <Card className="flex fixed hidden h-screen border-0 overflow-hidden bottom-0 left-0 right z-40 h-[calc(100vh-2rem)] lg:w-1/4 h-full  p-4 shadow-xl shadow-blue-gray-900/5 sm:hidden lg:block flex-0 start ml-auto">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Inventory
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    <Link to="/dashboard">
                    Dashboard
                    </Link>
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/dashboard" className="transition duration-300">
                  Main
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/analytics" className="transition duration-300">
                  Analytics
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/reports" className="transition duration-300">
                  Reports
                  </Link>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
          >
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/inbox" className="transition duration-300">
            Inbox
            </Link>
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/inventory" className="transition duration-300">
            Inventory
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/profile" className="transition duration-300">
            Profile
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/settings" className="transition duration-300">
            Settings
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <div
              className="cursor-pointer py-2 px-4 text-red-500 hover:bg-red-100 transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </div>
          </ListItem>
        </List>
      </Card>
    );
}

export default SideBar;