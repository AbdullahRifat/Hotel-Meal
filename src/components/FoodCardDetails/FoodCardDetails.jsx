import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoaderAnimations from '../../pages/Shared/Loader/LoaderAnmations';
import FoodCard2 from '../FoodCard/FoodCard2';
import { Rating } from '@smastrom/react-rating'
import { FaHeart } from "react-icons/fa";
import '@smastrom/react-rating/style.css'
import SectionTitle from '../SectionTitle/SectionTitle';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useReviews from '../../hooks/useReviews';
import { FaRegHeart } from "react-icons/fa6";
import useUsers from '../../hooks/useUsers';
import useCart from '../../hooks/useCart';
import { useQuery } from '@tanstack/react-query';
const FoodCardDetails = () => {
  const params = useParams();
  const { id } = params;

  const [foodDetails, setFoodDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()
  const [allUsers, userLoading = loading, userRefetch = refetch] = useUsers()
  const [cart, cartrefetch = refetch] = useCart()
  const [isLiked, setLike] = useState(false);
  
  const [isReviewLoading,setReviewLoading] = useState(true)
  const [allReviews, setAllReviews] = useState([]);

console.log("first")


useEffect(() => {
  axiosPublic.get('/reviews')
    .then(response => {
      const reviewsData = response.data;
      setAllReviews(reviewsData);
      setReviewLoading(true)
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
    });
}, [allReviews])

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/menu/${id}`); // Adjust the URL as per your server endpoint
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
  }, [id, user?.email]);

  if (isLoading) {
    return <LoaderAnimations></LoaderAnimations>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const {
    title,
    category,
    image,
    ingredients,
    description,
    price,
    rating,
    dateTime,
    likes,
    reviews,
    distributorName,
    distributorEmail
  } = foodDetails;

  // const allReviews = axiosPublic.get(`/menu/${id}/reviews`);
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const reviewText = event.target.elements.reviewText.value;

    try {
      const response = await axiosPublic.post(`/reviews`, {
        menuId: id,
        name: user?.displayName, // Replace with actual user data
        email: user?.email,
        mealImage: user?.photoURL, // Replace with actual user data
        rating: 5, // Replace with actual rating
        details: reviewText,
       
      });

      if (response.data.insertedId) {
        const updatedReviews = foodDetails.reviews + 1;
        
      const menuUpdateResponse = await axiosPublic.put(`/menu/reviews/${id}`, {
        reviews: updatedReviews,
      });
      if(menuUpdateResponse.status===200)
       {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Review Submited",
          showConfirmButton: false,
          timer: 1500
        });
       }
      
        console.log('Review posted successfully!');
        // Perform further actions upon successful review submission if needed
      } else {
        console.error('Failed to post review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleLikeSubmit = async (event) => {
    event.preventDefault();

    const userContainsInLikes = foodDetails.likesBy && foodDetails.likesBy.includes(user?.email);

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
      const response = await axiosPublic.put(`/menu/likes/${id}`, {
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




  const handleRequestMeal = async () => {

    const userType = allUsers.find(currentUser => currentUser.email === user?.email);
    console.log(userType.subscription)

    if (userType?.subscription !== 'gold' && userType?.subscription !== 'silver' &&
      userType?.subscription !== 'plutinum') {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'You dont hold any packages yet',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // If user doesn't exist in cart, allow them to request the meal
    const response = await axiosPublic.post('/carts', {
      title:title,
      menuId: id,
      name: user?.displayName,
      email: user?.email,
      image: user?.displayURL,
      price: price,
      likes: likes,
      reviews: reviews,
      subscription: userType?.subscription,
      distributorEmail: distributorEmail,
      distributorName : distributorName,
      mealStatus: 'pending',
    });

    if (response.data.insertedId) {
      cartrefetch()
      console.log('inseted',)
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Meal Requested',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };




  return (
    <div className="max-w-full mx-auto rounded overflow-hidden shadow-lg bg-gradient-to-b from-sky-blue-200 to-sky-blue-500">
      {
        userLoading ? <LoaderAnimations></LoaderAnimations> : <div>

          <div className="px-6 py-4">
            <div className='max-w-full'><img src={image} alt="not found" /></div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">
              <span className='font-bold'> Category:</span> {category} <br />
              <span className='font-bold'> Price:</span> ${price} <br />
              {<Rating style={{ maxWidth: 250 }} value={parseInt(rating ? rating : 0)} />} <br />
              <span className='font-bold'> Ingredients: </span>{ingredients} <br />
              <span className='font-bold'> Description:</span> {description} <br />
              <span className='font-bold'> Date:</span> {dateTime} <br />
              <span className='font-bold'> Likes:</span> {likes} <br />
              <span className='font-bold'> Reviews:</span> {reviews} <br />
              <span className='font-bold'> Distributor/Admin:</span>{distributorName} <br />
              <span className='font-bold'> Email:</span> {distributorEmail}<br />
              {user ? <span className='font-bold text-3xl'><form onSubmit={handleLikeSubmit}>
                <button type='submit'>{isLiked ? <FaHeart></FaHeart> : <FaRegHeart></FaRegHeart>}</button>
              </form></span> : ""}
              {user ? <span className='font-bold text-3xl'>

                <button onClick={handleRequestMeal} className='btn btn-primary'> Request Meal</button>

              </span> : ""}
            </p>
            {
              user ? <div>
                <form onSubmit={handleReviewSubmit}>
                  <label htmlFor="">Write Reviews</label>
                  <div className='border-solid border-black border-2'>
                    <input type="text-area" name="reviewText" className='h-24 w-full border-solid border-black ' />
                  </div>
                  <button className='btn btn-primary my-8'>Post Review</button>
                </form>
              </div> : ""
            }
          </div>
        


        </div>
      }
        <div>
            <SectionTitle heading={"All Reviews"}></SectionTitle>
            {!isReviewLoading?<LoaderAnimations></LoaderAnimations>:allReviews.map((review, index) => (
              <div className='text-start font-bold gap-y-3' key={index}>
               
                <p><span>{review.name} </span>

                  <br />
                </p>
                {<img className='rounded-full w-12' src={review.mealImage} alt="" />}
                <p>
                  {review.details}
                </p>
                {}
              </div>
            )) }
          </div>

    </div>
  );
};

export default FoodCardDetails;
