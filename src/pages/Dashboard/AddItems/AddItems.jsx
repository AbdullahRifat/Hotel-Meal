import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import AddMealForm from "../../Shared/SignupForm/addMealForm";


// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    return (
        <div className="border-double border-4 border-sky-500 p-4">
            <SectionTitle heading="ADD AN ITEM" subHeading="What a new??"></SectionTitle>
            <AddMealForm></AddMealForm>
            
        </div>
    );
};

export default AddItems;