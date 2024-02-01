import React, { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { FirebaseContext } from '../Context';
import Snackbar from '../components/SnackBar';
import Spinner from '../components/Spinner';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(FirebaseContext);

    const handleLogin = async (e) => {
      e.preventDefault();

      setLoading(true)

      try {
        await signInWithEmailAndPassword(auth, email, password);
        setData({ user: auth.currentUser });
        setMessage('User logged in successfully');

        navigate('/dashboard');
      } catch (error) {
        setMessage("No user with email found.");
        setError(`Error during login: ${error.message}`);
        console.error(error);
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          { message && <div className="mb-6"><Snackbar message={message} /></div> }
          { user ? (<div className="mb-6"><Snackbar message={`You are logged in as ${user.email}`} /></div>) : (null) }

          <form className="space-y-6" onSubmit={handleLogin}>
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
                <div className="text-sm">
                  <Link className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
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
                Sign in
              </button>
            </div>

            <div>
              <Link
                to="/register"
                className="text-sm font-semibold leading-6 text-indigo-600 hover:underline hover:text-gray-300 transition duration-300"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>          

      </div>
    );    
}

export default LoginPage;