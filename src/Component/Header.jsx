import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import '../index.css';
import { Appstate } from '../App';
const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}><span>Movie<span className='text-white'>World</span></span></Link>
      {useAppstate.login ?
        <Link to={'/addmovie'}><h1 className='text-lg text-white cursor-pointer flex items-center'>
          <button> <AddIcon className='mr-1' color='secondary' /><span className='text-white'>Add New</span></button>
        </h1>
        </Link>
        :
        <Link to={'/login'}><h1 className='login  text-lg text-white bg-green-500 cursor-pointer flex items-center'>
          <button className=' mx-auto py-1 px-5'><span className='text-white font-medium capitalize'>Login</span></button>
          
        </h1>
        </Link>
      }
    </div>
  )
}

export default Header;