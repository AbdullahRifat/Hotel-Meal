import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";


const AdminHome = () => {

    const {user} = useAuth()
    return (
        <div>
           <Helmet>
                <title>Hotel Meal | Admin Home</title>
            </Helmet>
          <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold"> 
                <span>Hi, Welcome {user?.displayName ? user.displayName : 'Back'}</span>
            </h1>
            
          </div>
          <div className="font-bold">
          <img className=" border-solid border-2 border-sky-500 w-24 h-24 " src={user?.photoURL} alt="" />
             <p>Name: {user?.displayName}</p>
             <p>Email: {user?.email}</p>
             
          </div>
        </div>
    );
};

export default AdminHome;