import React, { useContext } from 'react';
import {GoogleAuthProvider} from "firebase/auth"
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import './Home.css'
import {Link, useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";

const Home = () => {
    const {googleSignIn, user} = useContext(AuthContext)
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const googleHandler = () => {
        googleSignIn(provider)
        .then((result) => {
            // const user = result.user;
            toast.success("Login successfully");
            navigate("/workspace")
        })
        .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        })
    }

    return (
        <div className='background-img'>
            <div className='overlay'>
                <div className=' absolute top-[40%] left-[35%] 2xl:left-[40%]'>
                    <h2 className='text-4xl font-bold text-gray-200 mb-4 text-center'>QR Code Generator</h2>
                    <p className='text-lg mb-6 text-center'>Only Admin Login</p>
                    {/* Open the modal using ID.showModal() method */}
                    <div className='flex flex-col justify-center items-center'>
                        {
                            user?.email ? (<> <Link to="/workspace">
                                <button className="font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-blue-400 bg-blue-200 text-black px-4 shadow-lg shadow-cyan-500/50" onClick={()=>window.my_modal_1.showModal()}>Combine your Audio</button>
                            </Link></>) : (<button className="font-semibold border-solid border-2 border-blue-400 p-2 rounded-lg hover:border-red-200 hover:bg-[#1C1E25] hover:text-blue-400 bg-blue-200 text-black px-4 shadow-lg shadow-cyan-500/50" onClick={()=>window.my_modal_1.showModal()}>Log In</button>)                        }
                    </div>
                    <dialog id="my_modal_1" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg text-center">Welcome back !!!</h3>
                            <p className="py-4 text-center">Log in to your account and start creating</p>
                            <div className='w-3/5 mx-auto '>
                                <button onClick={googleHandler} className="w-full flex justify-center items-center border-solid border-2 border-gray-400 p-2 rounded-lg"><FcGoogle className='mr-3 text-2xl'></FcGoogle> <span>Sign In With Googel</span></button>
                                <button  className="mt-5 w-full flex justify-center items-center border-solid border-2 border-gray-400 p-2 rounded-lg"><svg className='w-6 mr-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"/></svg> <span>Sign In With Googel</span></button>
                            </div>
                            <div className="modal-action">
                                <button className="btn">Close</button>
                            </div>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Home;