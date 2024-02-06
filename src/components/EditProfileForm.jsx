import React, { useState, useEffect, useContext } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { Button, Input, Spinner } from '@material-tailwind/react';
import { useFirebase } from '../Context';
import { collection, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import Snackbar from './SnackBar';
import { FirebaseContext } from '../Context';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EditProfileForm = () => {
  const { auth } = useContext(FirebaseContext);
  // State variables to hold user profile data
  const [fullName, setFullName] = useState('');
  const defaultUserImage = "https://i.stack.imgur.com/l60Hf.png";
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [userImage, setUserImage] = useState('');
  const { user, firestore } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth.currentUser) return;
      const uid = auth.currentUser.uid;
      const userDocRef = doc(collection(getFirestore(), 'users'), uid);
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserProfile(userDocSnapshot.data());
        } else {
          console.log('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, [auth]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user profile data in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        fullName,
        email,
        bio,
        userImage,
      }, { merge: true });
      
      console.log('Profile updated successfully!');
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setMessage('Error updating profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    // You can use Firebase Storage to upload the image
    // Here, we'll just set the user image URL directly
    setUserImage(URL.createObjectURL(file));

    // Update user profile data in Firestore
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        userImage: URL.createObjectURL(file),
      });

      console.log('Profile image updated successfully!');
      setMessage('Profile image updated successfully!');
    } catch (error) {
      console.error('Error updating profile image:', error.message);
      setMessage('Error updating profile image. Please try again later.');
    }
  };

  return (
    <div className='flex justify-center'>
      {loading && <Spinner />}
    
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-5">Edit Profile</h1>

        { message && <div className="mb-6"><Snackbar message={message} /></div> }

        <div className='relative w-20 mb-4'>
          <img
              src={user?.photoURL ? user.photoURL : defaultUserImage}
              alt="User"
              className="w-20 h-20 object-cover rounded-full cursor-pointer"
            />

          <label htmlFor="profileImageInput" className='!absolute bottom-0 right-0 p-1 bg-indigo-500 rounded-full cursor-pointer'>
            <CameraIcon className='w-5 h-5 cursor-pointer right-0 text-white'/>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName || userProfile?.fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email || userProfile?.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio || userProfile?.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself"
            className="border border-gray-300 rounded-md py-2 px-3 w-full h-32 resize-none focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
  );
}

export default EditProfileForm;