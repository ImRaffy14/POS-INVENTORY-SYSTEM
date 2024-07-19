import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StaffsData from '../components/StaffsData';
import { toast } from 'react-toastify';
import Dashboard from '../components/Dashboard';
import { UseOnlineStaffContext } from '../hooks/useStaffOnline';
import Products from '../components/Products';
import AuditTrails from '../components/AuditTrails';
import InventoryTracker from '../components/InventoryTracker';
import SalesReport from '../components/SalesReport';
import TrendAnalysis from '../components/TrendAnalysis';
import Settings from '../components/Settings';


function AdminPage({ url }) {

    const {staffOnline, dispatch} = UseOnlineStaffContext()
    const [isToggled, setIsToggled] = useState(true);

    const handleSideNav = () => {
        setIsToggled(!isToggled);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('UiD_01');
        window.location.href = "/";
    };



    //GET STAFF ONLINE DETAILS

    const UiD = localStorage.getItem('UiD_01');
    
    useEffect(() => {
        const getStaffOnline = async () => {
            const response = await fetch('http://localhost:3000/api/staffOnline/' + UiD)

            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_STAFF', payload: json})
            }
   
        }

        getStaffOnline()

    }, [])


    //Checks expiration of JWT

    const token = localStorage.getItem('accessToken');

    useEffect(() => {

        let timeout1
        const checkTokenExpiration = () => {

            if (token) {
                const decodedToken = parseJwt(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    // Token has expired, clear it from localStorage
                    localStorage.removeItem('accessToken');
                    // Redirect user to login page
                    toast.error("Session Expired! Please Login Again.", {
                        position: "top-right"
                      });
                    
                    timeout1 = setTimeout(() => {
                        window.location.href="/"
                    }, 6000)
                }
            }
        };

        checkTokenExpiration();

        return () => {
            clearTimeout(timeout1)
        };

    }, []);



    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };


    return (
        <>
            <div className="h-screen flex">
                {/* Sidebar */}
                <div className={`sidebar transition-all duration-300 ${isToggled ? 'w-6/12 lg:w-2/12 md:w-4/12 sm:w-4/12' : 'w-0'} overflow-auto`}>
                    <div className="flex flex-col justify-center my-4">
                        <ul className="menu menu-vertical px-1">
                            <li><Link to="">DASHBOARD</Link></li>
                            <li>
                                <details>
                                <summary>INVENTORY MANAGEMENT</summary>
                                <ul className="p-2">
                                    <li><Link to="Products">PRODUCTS</Link></li>
                                    <li><Link to="InventoryTracker">INVENTORY TRACKER</Link></li>
                                </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                <summary>SALES ANALYTICS</summary>
                                <ul className="p-2">
                                    <li><Link to="SalesReport">SALES REPORT</Link></li>
                                    <li><Link to="TrendAnalysis">TREND ANALYSIS</Link></li>
                                </ul>
                                </details>
                            </li>
                            <li>
                                <details>
                                <summary>STAFF MANAGEMENT</summary>
                                <ul className="p-2">
                                    <li><Link to="Staffs">STAFF ROLES AND PERMISSION</Link></li>
                                    <li><Link to="AuditTrails">AUDIT TRAILS</Link></li>
                                </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main content */}
                <div className={`flex-grow transition-all duration-300 bg-gray-200 ${isToggled ? 'w-6/12 lg:w-2/12 md:w-8/12 sm:w-8/12' : 'w-full'} overflow-auto`}>
                    <div className="mx-2 my-1">
                        {/* NAVBAR */}
                        <div className="navbar bg-base-100 rounded-xl">
                            <div className="navbar-start">
                                <button className="btn btn-ghost btn-circle" onClick={handleSideNav}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                </button>
                            </div>
                            <div className="navbar-center">
                                <a className="btn btn-ghost text-xl">POS INVENTORY</a>
                            </div>
                            <div className="navbar-end">
                                <div className={`dropdown dropdown-end `}>
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {staffOnline && <img className="w-full h-full object-cover" alt="Tailwind CSS Navbar component" src={`${url}images/${staffOnline.avatar}`} />}
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <h1 className="ml-3 mb-1">{staffOnline && staffOnline.username}<span className="badge text-teal-500 ml-2">online</span></h1>
                                        <li><Link to="Settings">Settings</Link></li>
                                        <li onClick={handleLogout}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* DATA */}
                        <Routes>
                            <Route path='' element={<Dashboard/>}/>
                            <Route path='Staffs' element={<StaffsData url={url}/>}/>
                            <Route path='Products' element={<Products/>}/>
                            <Route path='InventoryTracker' element={<InventoryTracker/>}/>
                            <Route path='SalesReport' element={<SalesReport/>}/>
                            <Route path='TrendAnalysis' element={<TrendAnalysis/>}/>
                            <Route path='AuditTrails' element={<AuditTrails/>}/>
                            <Route path="Settings" element={<Settings/>} data={staffOnline}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;
