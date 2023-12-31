import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/Allusers/Allusers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PayementHistory from "../pages/Dashboard/PaymentHistory/PayementHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import FoodCardDetails from "../components/FoodCardDetails/FoodCardDetails";
import AllMeals from "../pages/Order/Order/AllMeals";
import UpComming from "../pages/Order/Order/UpComming";
import MyReviews from "../pages/Dashboard/UserHome/MyReviews";
import AllReviewsPagination from "../pages/Order/Order/AllReviewsPagination";
import AllServeMealsPagination from "../pages/Order/Order/AllServeMealsPagination";
import UpcomingMeals from "../pages/Order/Order/UpcomingMeals";
import Review from "../components/FoodCard/Review";
import Error from "../pages/Error/Error";


//https://hotel-meal.vercel.app

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'meals',
          element: <AllMeals></AllMeals>
        },
        {
          path: 'meals',  // The '/meals' path should display AllMeals
          element: <AllMeals></AllMeals>,
          
           
          
        },
        {
          path: 'meals/mealdetails/:id', // Define the nested route for meal details under 'meals'
          element: <FoodCardDetails></FoodCardDetails>
        }
        ,
        {
          path: 'mealdetails/:id',
          element: <FoodCardDetails></FoodCardDetails>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
        {
          path: 'upcoming',
          element: <UpComming></UpComming>
        },
        {
          path: 'upcoming/mealdetails/:id', // Define the nested route for meal details under 'meals'
          element: <FoodCardDetails></FoodCardDetails>
        },
        {
          path: 'checkout/:type',
          // element : <AddItems></AddItems>
          element :  <Payment></Payment>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path:'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        // admin routes
        {
          path : 'users',
          element : <AdminRoute><Allusers></Allusers></AdminRoute>
        }
        ,
        {
          path: 'addItems',
          // element : <AddItems></AddItems>
          element : <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'manageItems',
          // element : <AddItems></AddItems>
          element :  <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:'updateItem/:id',
          element :  <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader : ({params}) => fetch(`https://hotel-meal.vercel.app/menu/${params.id}`)
        },
        {
          path: 'payment',
          // element : <AddItems></AddItems>
          element :  <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          // element : <AddItems></AddItems>
          element :  <PayementHistory></PayementHistory>
        },{
          path: 'review',
          element: <MyReviews></MyReviews>
        },
        {
          path:'allreview',
          element: <AdminRoute><AllReviewsPagination></AllReviewsPagination></AdminRoute>
        },{
          path:'allreview/mealDetails/:id',
          element: <FoodCardDetails></FoodCardDetails>
        },
        {
          path:'requestedMeals',
          element: <AllServeMealsPagination></AllServeMealsPagination>
        },
        {
          path:'upcoming',
          element:<UpcomingMeals></UpcomingMeals>
        },{
          path:'review/mealDetails/:id',
          element: <FoodCardDetails></FoodCardDetails>

        },
        {
          path:'review/mealDetails/edit/:id',
          element: <Review/>

        }

      ]
    }
  ]);