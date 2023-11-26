import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

import PopularMenu from "../PopularMenu/PopularMenu";

import Order from "../../Order/Order/Order";
import MembershipCard from "../../../components/FoodCard/MembershipCard";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            {/* <Category></Category> */}
            
            <PopularMenu></PopularMenu>
            <Order></Order>
            <MembershipCard></MembershipCard>
            {/* <Featured></Featured> */}
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;