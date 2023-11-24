import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import Order from "../../Order/Order/Order";

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
            {/* <Featured></Featured> */}
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;