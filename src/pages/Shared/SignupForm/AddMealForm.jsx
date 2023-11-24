import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMealForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        title: data.title,
        category: data.category.toLowerCase(),
        image: res.data.data.display_url,
        ingredients: data.ingredients,
        description: data.description,
        price: parseFloat(data.price),
        rating: 0,
        dateTime: new Date().toISOString(),
        likes: 0,
        reviews: 0,
        distributorName: data.distributorName,
        distributorEmail: data.distributorEmail,
      };
      const menuRes = await axiosSecure.post("menu", menuItem);
      console.log(menuRes);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="">
          <label className="label">
            <span className="label-text">Meal Title*</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Meal Title"
            className="input input-bordered w-full "
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select
            defaultValue="null"
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option disabled value="null">
              Select a Category
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div className="">
          <label className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <input
            {...register("ingredients")}
            type="text"
            placeholder="Ingredients"
            className="textarea textarea-bordered textarea-lg w-full h-24"
          />
        </div>

        <div className="">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
            className="textarea textarea-bordered textarea-lg w-full h-24"
          />
        </div>

        <div className="">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Price"
            className="input input-bordered w-full "
          />
        </div>

        <div className="">
          <label className="label">
            <span className="label-text">Admin/Distributor Name*</span>
          </label>
          <input
            {...register("distributorName", { required: true })}
            type="text"
            placeholder="Admin/Distributor Name"
            className="input input-bordered w-full "
          />
        </div>

        <div className="">
          <label className="label">
            <span className="label-text">Admin/Distributor Email*</span>
          </label>
          <input
            {...register("distributorEmail", { required: true })}
            type="email"
            placeholder="Admin/Distributor Email"
            className="input input-bordered w-full "
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Meal Image*</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>


      </div>

      <button type="submit" className="btn">
        Add Meal
      </button>

      <button type="button" className="btn">
        Add to Upcoming
      </button>
    </form>
  );
};

export default AddMealForm;
