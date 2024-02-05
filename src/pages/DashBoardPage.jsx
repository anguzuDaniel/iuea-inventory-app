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
            
            <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center">
                <DashBoardContent openModal={handleOpen}/>
            </div>
          </div>

          { open && <div className="w-full h-full fixed top-0 left-0  z-50 bg-gray-600 bg-opacity-50 p-6 p-8 flex justify-center items-center"><AddInventoryPage closeModal={handleOpen}/></div> }
        </div>
    );
}

export default DashBoardPage;