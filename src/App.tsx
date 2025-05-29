import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { logIn, logOut } from './features/authSlice';
import NeonLoader from './components/loader/NeonLoader';
import { Outlet } from 'react-router-dom';



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn(userData));
        } else {
          dispatch(logOut());
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        dispatch(logOut());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className=" bg-black w-full h-[100vh]">
        <div className=' max-w-[1600px] flex justify-center items-center mx-auto min-h-[80%]'>
          <div className=''>
            <NeonLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full min-h-screen">
      <div className=" bg-gray-50 min-h-screen">

        <Outlet />

      </div>
    </div>
  );

}

export default App;
