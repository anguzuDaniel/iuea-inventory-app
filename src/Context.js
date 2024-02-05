import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.error('Login failed:', error.message);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  }

  const contextValue = {
    user,
    auth,
    login,
    logout
  };

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
