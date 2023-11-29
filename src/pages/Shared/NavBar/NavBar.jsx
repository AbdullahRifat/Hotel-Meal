import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
// import { FaShoppingCart } from 'react-icons/fa';
import { IoMdNotifications } from "react-icons/io";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

import logo from '../../../assets/logo.jpg'
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }


   

    

 
    //testing  nav links
    const navLinks = (
        <>
            <li>
                <NavLink
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "text-primary font-extrabold bg-info"
                            : isActive
                                ? "font-extrabold bg-primary text-white mr-1"
                                : "mr-1"
                    }
                    to={"/"}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive, isPending }) =>
                        isPending
                            ? "text-primary font-extrabold bg-info"
                            : isActive
                                ? "font-extrabold bg-primary text-white mr-1"
                                : "mr-1"
                    }
                    to={"/meals"}
                >
                     Meals
                </NavLink>
            </li>

            <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "text-primary font-extrabold bg-info"
                                : isActive
                                    ? "font-extrabold bg-primary text-white mr-1"
                                    : "mr-1"
                        }
                        to={"/upcoming"}
                    >
                        Up-Comming Meals
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "text-primary font-extrabold bg-info"
                                : isActive
                                    ? "font-extrabold bg-primary text-white mr-1"
                                    : "mr-1"
                        }
                        to={"/notifications"}
                    >
                        <span className="font-bold text-2xl"><IoMdNotifications /></span>
                    </NavLink>
                </li>
               
            {
                !user ? <li>
                    <NavLink
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "text-primary font-extrabold bg-info"
                                : isActive
                                    ? "font-extrabold bg-primary text-white mr-1"
                                    : "mr-1"
                        }
                        to={"/login"}
                    >
                        Join Us
                    </NavLink>
                </li> : ""
            }
          
          
          
        </>
    );

    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
    useEffect(() => {
      document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);


    //testing ending

    // const navOptions = <>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/menu">Our Menu</Link></li>
    //     <li><Link to="/order/salad">Order Food</Link></li>
    //     <li><Link to="/secret">Secret</Link></li>
    //     {
    //         user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
    //     }
    //     {
    //         user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
    //     }
    //     <li>
    //         <Link to="/dashboard/cart">
    //             <button className="btn">
    //                 <FaShoppingCart className="mr-2"></FaShoppingCart>
    //                 <div className="badge badge-secondary">+{cart.length}</div>
    //             </button>
    //         </Link>
    //     </li>
    //     {
    //         user ? <>
    //             {/* <span>{user?.displayName}</span> */}
    //             <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
    //         </> : <>
    //             <li><Link to="/login">Login</Link></li>
    //         </>
    //     }
    // </>

    // return (
    //     <>
    //         <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
    //             <div className="navbar-start">
    //                 <div className="dropdown">
    //                     <label tabIndex={0} className="btn btn-ghost lg:hidden">
    //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
    //                     </label>
    //                     <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
    //                         {navOptions}
    //                     </ul>
    //                 </div>
    //                 <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
    //             </div>
    //             <div className="navbar-center hidden lg:flex">
    //                 <ul className="menu menu-horizontal px-1">
    //                     {navOptions}
    //                 </ul>
    //             </div>
    //             <div className="navbar-end">
    //                 <a className="btn">Get started</a>
    //             </div>
    //         </div>
    //     </>
    // );

    return (
        <div className="bg-info text-white">
            <div className="navbar max-w-screen-xl mx-auto p-4">
                <div className="navbar-start">
                    
                    <div className="dropdown b">
                        <label tabIndex={0} className="btn  btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                           
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52"
                        >
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        Hotel Meal <img className="w-8 h-8 rounded-full" src={logo} alt="" />
                    </div>
                    <Link to={"/"}>
                        <div title={user?.displayName} className="flex items-center ">
                            <img className="" alt="" />

                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navLinks}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-bottom dropdown-end flex items-center">
                           
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div title={user?.displayName} className={`w-10 rounded-full hover:[${user?.displayName}]`}>
                                                   
                                    {user?.photoURL ? (
                                        <img src={user?.photoURL} />
                                    ) : (
                                        <img src="/src/assets/profile.svg" />
                                    )}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 text-info z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
                            >
                                <li>
                                    <p className="text-xl">{user?.displayName}</p>
                                </li>
                                <li>
                                    <a className="text-xl" onClick={handleLogOut}>
                                        Logout
                                    </a>

                                </li>
                                {
                                    user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                                }
                                {
                                    user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
                                }


                            </ul>
                        </div>
                    ) : (
                        <Link to={"/login"}>
                            <button className="btn bg-primary text-white">Login</button>
                        </Link>
                    )}
                    <div className="ml-2 flex items-center justify-center">
                        <label className="swap swap-rotate">
                            <input onClick={toggleTheme} type="checkbox" />
                            <div className="swap-on">
                                {" "}
                                <MdDarkMode className="md:text-3xl"></MdDarkMode>{" "}
                            </div>
                            <div className="swap-off">
                                {" "}
                                <MdOutlineDarkMode className="md:text-3xl"></MdOutlineDarkMode>{" "}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default NavBar;