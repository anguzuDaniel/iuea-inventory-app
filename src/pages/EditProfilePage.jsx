import React, { useState } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import SideBar from '../components/SideBar';
import NavigationBar from '../components/NavigationBar';


export function EditProfilePage() {
  return(
    <div className="w-full">
      <div className="flex relative w-full mx-auto bg-gray-100">
        <div className="lg:w-1/4">
            <SideBar />
        </div>
        
        <div className="flex-1 mx-auto m-0 p-0 overflow-hidden visible w-auto float-right justify-center h-full h-screen">
            {/* Navigation Bar */}
            <NavigationBar />

            <EditProfileForm/>
        </div>
      </div>
    </div>
  );
}