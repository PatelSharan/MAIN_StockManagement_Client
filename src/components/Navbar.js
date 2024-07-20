'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import LoginContext from '@/contexts/login/logincontext'


const Navbar = () => {

    const loginContext = useContext(LoginContext)

    const [showNavbar, setShowNavbar] = useState(false)


    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <nav className='bg-black text-gray-300 h-16 sticky w-full z-10 top-0 flex items-center'>
            <ul className='flex'>

                {/* To open Navbar */}
                <div className={`ml-3 cursor-pointer hover:text-white`} onClick={toggleNavbar}>
                    {/* Menu Svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" className={`z-20 relative h-16 `}>
                        <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>

                {/*<---- Responsive Navbar */}
                <div className={`fixed top-0 left-0 z-10 w-64 h-full bg-black shadow-md flex flex-col items-center p-2 transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-x-0' : '-translate-x-full'}`} onClick={toggleNavbar}>
                    <div className='mt-10 w-[100%] space-y-2 text-gray-400' >
                        <div className='px-1 pt-2'>
                            <li>
                                <Link href={'/'}>
                                    <button className={`w-[100%] py-1 mb-2 px-3 text-left text-sm flex hover:text-white `}
                                    >
                                        <span className='ml-4'>Vehical Entry</span>
                                    </button>
                                </Link>
                            </li>
                            {/* If user is not logged in then show this */}
                            {!loginContext.isLoggedIn ?
                                <div className='px-4'>
                                    <li>
                                        <Link href={'/login'}>
                                            <button className={`MainBtnWhite w-full mt-1`}>
                                                Login
                                            </button>
                                        </Link>
                                    </li>
                                </div> :
                                // If user is logged in then show this
                                <>
                                    <li>
                                        <Link href={'/entry'}>
                                            <button className={`w-[100%] py-1 mb-2 px-3 text-left text-sm flex hover:text-white`}
                                            >
                                                <span className='ml-4'>Entry</span>
                                            </button>
                                        </Link>
                                    </li>
                                    <div className='px-4'>
                                        <li>
                                            <button className={`MainBtnWhite w-full mt-1`}
                                                onClick={() => { loginContext.logout() }}>
                                                Logout
                                            </button>
                                        </li>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </ul >
        </nav >
    )
}

export default Navbar