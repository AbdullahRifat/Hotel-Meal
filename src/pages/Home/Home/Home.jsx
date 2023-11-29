import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";



import Order from "../../Order/Order/Order";
import MembershipCard from "../../../components/FoodCard/MembershipCard";
import TopReviewed from "../../../components/FoodCard/TopReviewed";
import TopRated from "../../../components/FoodCard/Toprated";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hotel Meal | Home</title>
            </Helmet>
            <Banner></Banner>
            {/* <Category></Category> */}
            
            
            <Order></Order>
            <MembershipCard></MembershipCard>
            <TopReviewed></TopReviewed>
            <TopRated/>
            {/* <Featured></Featured> */}
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;