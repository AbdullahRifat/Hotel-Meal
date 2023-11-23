import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import SignupForm from "../../Shared/SignupForm/SignupForm";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    return (
        <div>
            <SectionTitle heading="ADD AN ITEM" subHeading="What a new??"></SectionTitle>
            <SignupForm></SignupForm>
            
        </div>
    );
};

export default AddItems;