import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {query,where,getDocs} from 'firebase/firestore';
import { dataRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import { Appstate } from '../App';

const Login = () => {
    const navigate = useNavigate();
    const useAppstate  = useContext(Appstate)
    const [form, setForm] = useState({
        mobile: "",
        password: "",

    });
    const [loading, setLoading] = useState(false);
    const login = async () => {
        setLoading(true);
        try {
            const quer = query(dataRef,where('mobile','==',form.mobile))
            const querySnapshot = await getDocs(quer);
            

            querySnapshot.forEach((doc)=>{
                const _data = doc.data(); 
                const isUser = bcrypt.compareSync(form.password,_data.password);
                
                if(isUser){
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000,
                      })
                      navigate('/')
                } else {
                    swal({
                        title: "Invalid Credentails",
                        icon: "error",
                        buttons: false,
                        timer: 3000,
                      })
                }
            })
           
          
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000,
              })
        }
        setLoading(false);
    }
    return (
        <div className='w-full flex flex-col mt-8 items-center'>
            <h1 className='text-xl font-bold'>Login</h1>
            <div className="p-2 w-full md:w-1/3">
                <div className="relative">
                    <label className="leading-7 text-sm text-gray-300">Mobile No</label>
                    <input type={"number"} id="message" name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                </div>
            </div>
            <div className="p-2 w-full md:w-1/3">
                <div className="relative">
                    <label className="leading-7 text-sm text-gray-300">Password</label>
                    <input id="message" name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                </div>
            </div>
            <div className="p-2 w-full md:w-full">
                <button onClick={login} className="flex mt-2 mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none  rounded text-lg">
                    {loading ? <TailSpin height={25} color='white' /> : 'Login'}</button>

            </div>
            <div>
                <p className='mt-3'>
                    Do not have a account? <Link to={'/signup'}><span className='text-blue-500'>Sign up</span></Link>
                </p>
            </div>


        </div>
    )
}

export default Login;
