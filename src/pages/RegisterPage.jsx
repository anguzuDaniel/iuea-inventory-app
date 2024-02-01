import React, { useState, useContext } from 'react';
import './RegisterPage.css';
import firebaseConfig from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../Context';
import Snackbar from '../components/SnackBar';
import Spinner from '../components/Spinner';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const { user, auth } = useContext(FirebaseContext);
  
    const handleSignUp = async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        setMessage('User created Successfully!');

        navigate('/');
      } catch (error) {
        console.error('Error creating user:', error.message);
        
        if (error.code === 'auth/weak-password') {
          setMessage('The password is too weak. Please choose a stronger password.');
        } else if (error.code === 'auth/email-already-in-use') {
          setMessage('The email address is already in use by another account.');
        } else if (error.code === 'auth/invalid-email') {
          setMessage('Invalid email address. Please enter a valid email.');
        } else {
          setMessage('Error creating user. Please try again later.');
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        {loading && <Spinner />}
      
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          
  
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            { message && <div className="mb-6"><Snackbar message={message} /></div> }

            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 w-full">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
      
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
      
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>

              <div>
                <Link
                  to="/"
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:underline hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
  );  
}

export default RegisterPage;