import useAuth from "../../../hooks/useAuth";
import gold from "../../../assets/home/gold.jpg";
import silver from "../../../assets/home/silver.jpg";
import plutinum from "../../../assets/home/plutinum.jpg";
import bronze from "../../../assets/home/bronze.jpg"


import LoaderAnimations from "../../Shared/Loader/LoaderAnmations";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: allUsers = [] ,isPending,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    let badge = null;
    if (isPending|| !allUsers || !user || !user.email) {
        return <LoaderAnimations />;
    }
    // Find the current user's data from allUsers based on email
    const currentUserData = allUsers.find(userData => userData.email.toLowerCase() === user?.email?.toLowerCase());


        if (currentUserData) {
            const userSubscription = currentUserData.subscription;
            // Determine badge based on subscription level
            if (userSubscription === 'gold') {
                badge = gold
            } else if (userSubscription === 'silver') {
                badge=silver;
            } else if (userSubscription === 'platinum') {
                badge=plutinum;
            }else{
                badge=bronze
            }
        }
  

    return (
        <div>
          <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold"> 
                <span>Hi, Welcome {user?.displayName ? user.displayName : 'Back'}</span>
            </h1>
            {badge && <img className="w-20 " src={badge} alt="User Badge" />} {/* Display badge if available */}
          </div>
          <div className="font-bold">
          <img className=" border-solid border-2 border-sky-500 w-24 h-24 " src={user?.displayURL} alt="" />
             <p>Name: {user?.displayName}</p>
             <p>Email: {user?.email}</p>
             
          </div>
        </div>
    );
};

export default UserHome;
