import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import swal from 'sweetalert';
import app, { dataRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';


const auth = getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: "",

    });

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }, auth);
      }

      const requestOtp = () => {
        setLoading(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
              text: "OTP Sent",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setOtpSent(true);
            setLoading(false);
          }).catch((error) => {
            console.log(error);
          });
          
    }
    const verifyOTP = () =>{
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
              uploadData();
              swal({
                text: "Sucessfully Registered",
                icon: "success",
                buttons: false,
                timer: 3000,
              });
              navigate('/login')
              setLoading(false); 
            })
          } catch (error) {
            console.log(error);
          }
          const uploadData = async () =>{
            try {
                const salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(form.password, salt);
                await addDoc(dataRef, {
                  
                  name: form.name,
                  password: hash,
                  mobile: form.mobile,
                });
                console.log(dataRef);

              } catch(err) {
                console.log(err);
              }
            }
    }
    return (
        <div className='w-full flex flex-col mt-8 items-center'>
            <h1 className='text-xl font-bold'>Signup</h1>
            {otpSent ?
                <>
                    
                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-300">OTP</label>
                            <input  name="message" value={OTP} onChange={(e) => setOTP(e.target.value)} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-full">
                        <button onClick={verifyOTP} className="flex mt-2 mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none  rounded text-lg">
                            {loading ? <TailSpin height={25} color='white' /> : 'Confirm OTP'}</button>

                    </div>
                </>

                :
                <>
                    
                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-300">Name</label>
                            <input  name="message" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-300">Mobile No</label>
                            <input type={"number"}  name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-1/3">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-300">Password</label>
                            <input  type={'password'} name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                        </div>
                    </div>
                    <div className="p-2 w-full md:w-full">
                        <button onClick={requestOtp} className="flex mt-2 mx-auto text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none  rounded text-lg">
                            {loading ? <TailSpin height={25} color='white' /> : 'Request OTP'}</button>

                    </div>
                </>
            }
            <div>
                <p className='mt-3'>
                    Already have an account? <Link to={'/Signup'}><span className='text-blue-500'>Login</span></Link>
                </p>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
}

export default Signup;
