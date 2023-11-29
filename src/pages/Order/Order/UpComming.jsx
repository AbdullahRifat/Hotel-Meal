import { Helmet } from "react-helmet-async";
import FoodCard from "../../../components/FoodCard/FoodCard";
import FoodCard2 from "../../../components/FoodCard/FoodCard2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import LoaderAnimations from "../../Shared/Loader/LoaderAnmations";


const UpComming = () => {
   const [menu, loading,refetch] = useMenu();
   const upcommings =menu.filter((item) => {
    
    return item.upcoming === true; 
});



    return (
        <div>
             <Helmet>
                <title>Hotel Meal | Upcoming</title>
            </Helmet>
            {
                <div>
                    <SectionTitle heading={"Upcomming Meals"}></SectionTitle>
                {loading?<LoaderAnimations></LoaderAnimations>:upcommings.length?<div className="grid lg:grid-cols-3 md:grid-cols-2 ">
                    {
                        upcommings?.map((upcoming,idx) =><div key={idx}>
                        <FoodCard2 item={upcoming} key={idx}></FoodCard2>
                        </div>)
                    }
                </div>:<div className="min-h-screen flex justify-center items-center text-centertext-3xl font-bold">No Upcomming Meals</div>}
            </div>
            }
        </div>
    );
};

export default UpComming;