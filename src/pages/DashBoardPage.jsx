import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import DashBoardContent from '../components/DashBoardContent';
import { AddInventoryPage } from '../components/AddInventoryOverlay';

function DashBoardPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return(
        <div className="w-full">
          <div className="flex relative w-full mx-auto bg-gray-100">
            <div className="lg:w-1/4">
                <SideBar />
            </div>
            
            <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center h-full">
                <DashBoardContent openModal={handleOpen}/>
            </div>
          </div>

          { open && 
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="rounded-md w-full h-full align-middle flex justify-center flex-row mb-10 my-auto mx-auto overflow-y-auto overflow-scroll bg-white p-10 border border-gray-300 border-0">
              <div className="flex justify-end">
                <button className="absolute top-0 right-0 p-3" onClick={handleOpen}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <AddInventoryPage closeModal={handleOpen}/>
            </div>
          </div> }
        </div>
    );
}

export default DashBoardPage;