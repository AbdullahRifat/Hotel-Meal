import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoaderAnimations from '../../pages/Shared/Loader/LoaderAnmations';
import FoodCard2 from '../FoodCard/FoodCard2';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const FoodCardDetails = () => {
  const params = useParams();
  const { id } = params;

  const [foodDetails, setFoodDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()

  useEffect(() => {

  
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/menu/${id}`); // Adjust the URL as per your server endpoint
        setFoodDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  
  

  return (
    <div className="max-w-full mx-auto rounded overflow-hidden shadow-lg bg-gradient-to-b from-sky-blue-200 to-sky-blue-500">
      <div className="px-6 py-4">
        <div className='max-w-full'><img src={image} alt="" /></div>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          <span className='font-bold'> Category:</span> {category} <br />
          <span className='font-bold'> Price:</span> ${price} <br />
        {<Rating style={{ maxWidth: 250 }} value={parseInt(rating?rating:0)}  />} <br />
          <span className='font-bold'> Ingredients:</span> {ingredients?.map((ingredient,idx)=> <span key={idx}>{ingredient} ,</span>)} <br />
          <span className='font-bold'> Description:</span> {description} <br />
          <span className='font-bold'> Date:</span> {dateTime} <br />
          <span className='font-bold'> Likes:</span> {likes} <br />
          <span className='font-bold'> Reviews:</span> {reviews} <br />
          <span className='font-bold'> Distributor/Admin:</span>{distributorName} <br />
          <span className='font-bold'> Email:</span> {distributorEmail}<br />
        </p>
      </div>
    </div>
  );
};

export default FoodCardDetails;
