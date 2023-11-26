import FoodCard from "../../../components/FoodCard/FoodCard";
import useMenu from "../../../hooks/useMenu";
import LoaderAnimations from "../../Shared/Loader/LoaderAnmations";


const UpComming = () => {
   const [menu, loading,refetch] = useMenu();
   const upcommings =menu.filter((item) => {
    
    return item.upcoming === true; 
});
    return (
        <div>
            {loading?<LoaderAnimations></LoaderAnimations>:upcommings?.map((upcoming,idx) =><FoodCard item={upcoming} key={idx}></FoodCard>)}
        </div>
    );
};

export default UpComming;