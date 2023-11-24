import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { useEffect } from "react";


const PopularMenu = () => {
   
   


    const [menu, loading, refetch] = useMenu(); // Assuming useMenu returns a refetch function
    console.log(menu)
    useEffect(() => {
      if (!loading && menu.length === 0) {
        // If data isn't loading and menu is empty, refetch the menu data
        refetch();
      }
      // Add any necessary dependencies to the dependency array
    }, [loading, menu, refetch]);
   
    
    if (loading) {
        return <div>Loading...</div>;
    }
    const popular = menu.filter(item => item.category === 'popular');
    
  
    return (
        <section className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular?.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;