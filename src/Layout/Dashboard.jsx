import { FaAd, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { ImSpoonKnife } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaPlateWheat } from "react-icons/fa6";
const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    console.log(isAdmin)
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-blue-500">
                <ul className="menu p-4 text-white font-bold">
                    {
                        isAdmin ? <>
                        <li>
                        <NavLink to="/dashboard/adminHome">
                            <FaUser></FaUser>
                            Admin Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                          Manage User</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/additems">
                            <FaCalendar></FaCalendar>
                            Add Meals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageitems">
                        <ImSpoonKnife />
                           All Meals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allreview">
                            <FaAd></FaAd>
                           All Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/requestedMeals">
                            <FaAd></FaAd>
                            Serve Meal</NavLink>
                    </li>
                   
                    <li>
                        <NavLink to="/dashboard/upcoming">
                            <FaUsers></FaUsers>
                          Upcoming Meals</NavLink>
                    </li>

                        </>: <>
                        <li className="text-bold">
                        <NavLink to="/dashboard/userHome">
                          <CgProfile />
                            My Profile</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                           Requested Meal ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                            <FaAd></FaAd>
                           My Reviews</NavLink>
                    </li>
                  

                        
                        
                        
                        </>
                    }
                    {/* all users and admin */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;