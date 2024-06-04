// LoginState Has to be import in Layout.js file

'use client'
import React, { useState, useEffect } from 'react';
import LoginContext from './logincontext';
import { Router, useRouter } from 'next/navigation';


const LoginState = (props) => {

    //Hosted backend api 
    const backEndurl = 'http://localhost:1000'

    //local backend api
    // const backEndurl = 'http://localhost:7000'

    const router = useRouter();

    //show Profile section
    const [showProfile, setShowProfile] = useState(false)

    // Set the active link state
    const [activeLink, setActiveLink] = useState('/');

    // checking user is loggedIn or Not
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // setting data for userProfile
    const [userDetails, setUserDetails] = useState({ name: '', email: '' })


    // fetching user Details when user login
    const fetchUser = async (url) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'jwt-token': localStorage.getItem('token')
                }
            })
            const data = await res.json()
            setUserDetails({ name: data.name, email: data.email })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser(`${backEndurl}/api/v1/users/getUsers`)
    }, [])

    const login = () => {
        setIsLoggedIn(true);
        //fetching user Details when user login
        fetchUser(`${backEndurl}/api/v1/users/getUsers`)
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
        setShowProfile(false)
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout, setShowProfile, showProfile, setUserDetails, userDetails, activeLink, setActiveLink }}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginState;