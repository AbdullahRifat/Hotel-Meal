import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoaderAnimations from "../../pages/Shared/Loader/LoaderAnmations";


const FoodCard2 = ({ item }) => {
    const { title, image, price, ingredients, _id } = item;
    const { user } = useAuth();
 
    const [foodDetails, setFoodDetails] = useState({});
    const[isLiked,setLike] =useState(true);
    const axiosPublic = useAxiosPublic();

    const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {


        const fetchData = async () => {
          try {
            const response = await axiosPublic.get(`/menu/${_id}`); // Adjust the URL as per your server endpoint
            setFoodDetails(response.data);
    
            const userContainsInLikes = await foodDetails.likesBy && foodDetails.likesBy.includes(user?.email);
            setLike(userContainsInLikes);
            setIsLoading(false);
          } catch (error) {
            setError(error);
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [_id, user?.email]);

      



      if (isLoading) {
        return <LoaderAnimations></LoaderAnimations>
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
        
      

      const handleLikeSubmit = async (event) => {
        event.preventDefault();
    
        const userContainsInLikes =  foodDetails.likesBy && foodDetails.likesBy.includes(user?.email);
        
        
        if (userContainsInLikes) {
          
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Already Liked!',
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
    
        const updatedLikesBy = foodDetails.likesBy ? [...foodDetails.likesBy, user?.email] : [user?.email];
       
    
        try {
          const response = await axiosPublic.put(`/menu/likes/${_id}`, {
            likes: foodDetails.likes + 1,
            email: user?.email,
            likesBy: updatedLikesBy,
          });
    
          if (response.data.modifiedCount) {
            setFoodDetails((prevFoodDetails) => ({
              ...prevFoodDetails,
              likes: prevFoodDetails.likes + 1,
              likesBy: updatedLikesBy,
            }));
            setLike(true);
    
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Liked!',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.error('Failed to update likes');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };




    return (
        <div className="card w-[300px] bg-base-100 shadow-xl">
            <figure><img className="w-full h-36" src={image} alt="missing photo" /></figure>
            
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title flex-grow">{title}</h2>
                <p className=""><span className="font-bold">Price : </span>${price}</p>
                <p ><span className="font-bold">Ingredients : </span>{ ingredients}</p>
                <div className="card-actions items-center">
                    <Link to={{
                        pathname: `mealdetails/${_id}`,
                        state: { item }, // Pass the meal object as state
                    }}


                    >
                        <button
                            // onClick={handleAddToCart}
                            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-primary-400 mt-4"
                        >Details</button>
                        
                    </Link>
                    {user ? <span className='font-bold text-3xl'><form onSubmit={handleLikeSubmit}>
                <button type='submit'><FaHeart></FaHeart> </button>
              </form></span> : ""}
                </div>
            </div>
        </div>
    );
};

export default FoodCard2;


// const [foodDetails, setFoodDetails] = useState({});
// const handleLikeSubmit = async (event) => {
//     event.preventDefault();

//     const userContainsInLikes = foodDetails.likesBy && foodDetails.likesBy.includes(user?.email);

//     if (userContainsInLikes) {

//       Swal.fire({
//         position: 'top-center',
//         icon: 'success',
//         title: 'Already Liked!',
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     const updatedLikesBy = foodDetails.likesBy ? [...foodDetails.likesBy, user?.email] : [user?.email];

//     try {
//       const response = await axiosPublic.put(`/menu/likes/${id}`, {
//         likes: foodDetails.likes + 1,
//         email: user?.email,
//         likesBy: updatedLikesBy,
//       });

//       if (response.data.modifiedCount) {
//         setFoodDetails((prevFoodDetails) => ({
//           ...prevFoodDetails,
//           likes: prevFoodDetails.likes + 1,
//           likesBy: updatedLikesBy,
//         }));
//         setLike(true);

//         Swal.fire({
//           position: 'top-center',
//           icon: 'success',
//           title: 'Liked!',
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       } else {
//         console.error('Failed to update likes');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };