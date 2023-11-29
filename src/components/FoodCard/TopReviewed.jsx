import { useState, useEffect } from "react";
import useMenu from "../../hooks/useMenu";
import FoodCard from "./FoodCard";
import LoaderAnimations from "../../pages/Shared/Loader/LoaderAnmations";
import SectionTitle from "../SectionTitle/SectionTitle";

const TopReviewed = () => {
  const [menu, loading] = useMenu();
  const [topThreeMenu, setTopThreeMenu] = useState([]);

  useEffect(() => {
    if (!loading && menu.length > 0) {
      // Sort menu items based on likes in descending order
      const sortedMenu = [...menu].sort((a, b) => b.likes - a.likes);
      
      // Get the top 3 menu items
      const topThree = sortedMenu.slice(0, 3);
      setTopThreeMenu(topThree);
    }
  }, [menu, loading]);

  return (
    <div className="my-28">
         <SectionTitle heading={"Top Liked"}></SectionTitle>
      {loading ? <LoaderAnimations></LoaderAnimations> : (
        <div>

          
          <ul className="grid md:grid-cols-2  items-center lg:grid-cols-3">
            {topThreeMenu.map((item) => (
              <FoodCard key={item._id } item={item}></FoodCard>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopReviewed;
