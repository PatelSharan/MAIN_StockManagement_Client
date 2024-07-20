"use client"
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Router, useRouter } from 'next/navigation';
import LoginContext from '@/contexts/login/logincontext';
import LoadingContext from '@/contexts/loading/LoadingContext';
import Loading from '@/components/Loading';


const Page = () => {

    const loginContext = useContext(LoginContext)
    const loadingcontext = useContext(LoadingContext)

    //Hosted backend api 
    const backEndurl = 'http://localhost:1000'

    //local backend api
    // const backEndurl = 'http://192.168.43.120:1000'

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

    // const [isLoading, setIsLoading] = useState(false)

    const [passValue, setPassValue] = useState('')

    const passInput = (e) => {
        setPassValue(e.target.value)
    }

    //Set input values in user
    const [user, setUser] = useState({
        un: '', pwd: ''
    })

    //Get User Input 
    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    //Handle Muliple Events
    const mulEvents = (e) => {
        e.preventDefault()
        passInput(e)
        handleInputs(e)
    }

    //handle Event PreventDefault (auto Refresh)
    const handleEventPreventDefaulf = (e) => {
        e.preventDefault()
    }


    const loginUser = async (e) => {
        e.preventDefault()
        const { un, pwd } = user

        loadingcontext.setIsLoading(true);

        const res = await fetch(`${backEndurl}/api/v1/auth/admin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                un, pwd
            })
        });
        const data = await res.json()
        loadingcontext.setIsLoading(false);
        if (data.success === true) {
            toast.success(data.message, {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    router.push('/');
                }
            });
            localStorage.setItem('token', data.authToken)
            setUser({ un: '', pwd: '' });
            loginContext.login();
        } else {
            toast.error(data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <>
            <section className="text-gray-600 body-font px-5 py-12">
                <form action="" method='POST'>
                    {/* {loadingcontext.isLoading ? (
                        <Loading message={'Verifying A User...'} />
                    ) :  */}
                    <div className="rounded-lg p-4 flex flex-col m-auto mt-10 md:mt-0 sm:w-[80vw]">
                        <h2 className="text-gray-900 text-2xl font-medium title-font mb-5">Login</h2>
                        <div className="relative mb-4">
                            <label htmlFor="un" className="leading-7 text-xs text-gray-600">UserName</label>
                            <input type="un" id="un" value={user.un} name="un" className="w-full bg-transparent border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" onChange={handleInputs} />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="pwd" className="leading-7 text-xs text-gray-600">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="pwd" value={user.pwd} name="pwd" className="w-full bg-transparent border-b-2 border-black focus:border-b-blue-700  text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out mb-3" onChange={mulEvents} />
                            {/* If password has Value then Login */}
                            {passValue ? <button onClick={handleEventPreventDefaulf}>
                                {/* If ShowPassword the Login */}
                                {!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill cursor-pointer absolute right-3 bottom-5" viewBox="0 0 16 16" onClick={() => { { !showPassword ? setShowPassword(true) : setShowPassword(false) } }}>
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                </svg>}
                            </button> : <button></button>}
                        </div>
                        <button className="text-white bg-black  py-2 px-8 text-sm w-28  hover:bg-white hover:text-black border-2 border-black hover:-translate-y-2 duration-200 ease-in-out" onClick={loginUser}>Login</button>
                    </div>
                    {/* } */}
                </form >
                <ToastContainer />
            </section >
        </>
    )
}

export default Page