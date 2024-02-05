import React, { useState, useContext } from 'react';
import firebaseConfig from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../Context';
import Snackbar from '../components/SnackBar';
import Spinner from '../components/Spinner';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { user, auth } = useContext(FirebaseContext);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      
      if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email address. Please enter a valid email.');
      } else if (error.code === 'auth/user-not-found') {
        setMessage('No user found with this email address.');
      } else {
        setMessage('Error sending password reset email. Please try again later.');
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
            Forgot your password?
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>

              <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}