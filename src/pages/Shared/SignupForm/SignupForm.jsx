import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignupForm = () => {
    const { register, handleSubmit,reset } = useForm()

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data)=>{
        const imageFile = {image: data.image[0]}
        const res= await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        if(res.data.success){
            //send items
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image : res.data.data.display_url,
                category: data.category.toLowerCase(),
                price : parseFloat(data.price),

            }
            const menuRes = await axiosSecure.post('menu',menuItem)
            console.log(menuRes)
            if(menuRes.data.insertedId){
                reset()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
               <div className="">
               <label className="label">
                    <span className="label-text">Recipe Name*</span>
                   
                </label>
                <input {...register("name",{required:true})} type="text" placeholder="Recipe Name" className="input input-bordered w-full " />
               </div>

               <div className="">
               <label className="label">
                    <span className="label-text">Recipe Details</span>
                   
                </label>
              
                <input {...register("recipe",{required:true})} type="text" placeholder="Recipe Details" className=" textarea textarea-bordered textarea-lg w-full h-24" />
               </div>
               <div>
            <input {...register("image",{required:true})}  type="file" className="file-input file-input-bordered w-full max-w-xs" />
            </div>
              <div>
              <label className="label">
                    <span className="label-text">Category</span>
                   
                </label>
              <select  defaultValue="null" {...register("category",{required:true})} className="select select-bordered w-full ">
                    <option disabled value="null">Select a Category</option>
                    <option>Salad</option>
                    <option>Pizza</option>
                    <option>Suop</option>
                    <option>Dessert</option>
                    <option>Drinks</option>

                </select>

                <div className="">
               <label className="label">
                    <span className="label-text">Price</span>
                   
                </label>
                <input {...register("price",{required:true})} type="number"  placeholder="Price" className="input input-bordered w-full " />
               </div>
              </div>
              
             

            </div>
           

            <button type="submit" className="btn">
                Add Item 
            </button>
        </form>
    )
};

export default SignupForm;