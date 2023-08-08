import React, { useState } from 'react'
import Header from './Component/Header'
import Cards from './Component/Cards';
import { Route, Routes } from 'react-router-dom';
import AddMovie from './Component/AddMovie';
import Detail from './Component/Detail';
import { createContext } from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';


const Appstate = createContext();

const App = () => {
  const [login,setLogin] = useState(false);
  const [userName,setUserName] = useState("");
  return (
   
    <Appstate.Provider value={{login,userName,setLogin,setUserName}}>
    <div className='App relative'>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
      </Routes>

    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
